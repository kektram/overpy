/* 
 * This file is part of OverPy (https://github.com/Zezombye/overpy).
 * Copyright (c) 2019 Zezombye.
 * 
 * This program is free software: you can redistribute it and/or modify  
 * it under the terms of the GNU General Public License as published by  
 * the Free Software Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful, but 
 * WITHOUT ANY WARRANTY; without even the implied warranty of 
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU 
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License 
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

"use strict";

function astRulesToWs(rules) {

    var result = "";

    for (var rule of rules) {
        if (rule.ruleAttributes.isDisabled) {
            result += tows("__disabled__", ruleKw)+" ";
        }

        result += tows("__rule__", ruleKw)+" ("+escapeString(rule.ruleAttributes.name)+") {\n";

        //Rule event
        result += tabLevel(1)+tows("__event__", ruleKw)+" {\n";
        result += tabLevel(2)+tows(rule.ruleAttributes.event, eventKw)+";\n";
        if (rule.ruleAttributes.eventTeam) {
            result += tabLevel(2)+tows(rule.ruleAttributes.eventTeam, eventTeamKw)+";\n";
        }
        if (rule.ruleAttributes.eventPlayer) {
            result += tabLevel(2)+tows(rule.ruleAttributes.eventPlayer, eventPlayerKw)+";\n";
        }
        if (rule.ruleAttributes.subroutineName) {
            result += tabLevel(2)+translateSubroutineToWs(rule.ruleAttributes.subroutineName)+";\n";
        }
        result += tabLevel(1)+"}\n";

        //Rule conditions
        if (rule.ruleAttributes.conditions !== undefined && rule.ruleAttributes.conditions.length > 0) {
            result += tabLevel(1)+tows("__conditions__", ruleKw)+" {\n";
            for (var condition of rule.ruleAttributes.conditions) {
                result += tabLevel(2)+astRuleConditionToWs(condition)+";\n"
            }
            result += tabLevel(1)+"}\n";
        }

        //Rule actions
        if (rule.children.length > 0) {
            result += tabLevel(1)+tows("__actions__", ruleKw)+" {\n";
            for (var child of rule.children) {
                result += astActionToWs(child, 2);
            }
            result += tabLevel(1)+"}\n";
        }

        result += "}\n\n";
    }

    
    return result;

}

function astRuleConditionToWs(condition) {

    var funcToOpMapping = {
        "__equals__": "==",
        "__inequals__": "!=",
        "__lessThanOrEquals__": "<=",
        "__greaterThanOrEquals__": ">=",
        "__lessThan__": "<",
        "__greaterThan__": ">",
    }

    if (condition.name in funcToOpMapping) {
        return astToWs(condition.args[0])+" "+funcToOpMapping[condition.name]+" "+astToWs(condition.args[1]);

    } else {
        if (condition.type === "bool") {
            return astToWs(condition)+" == "+tows("true", valueFuncKw);

        } else {
            return astToWs(condition)+" != "+tows("false", valueFuncKw);
        }
    }

}

function astActionToWs(action, nbTabs) {

    var result = tabLevel(nbTabs)+astToWs(action)+";\n"
    for (var child of action.children) {
        result += astActionToWs(child, nbTabs+1);
    }
    return result;
}

function astToWs(content) {

    var equalityFuncToOpMapping = {
        "__equals__": "==",
        "__inequals__": "!=",
        "__lessThanOrEquals__": "<=",
        "__greaterThanOrEquals__": ">=",
        "__lessThan__": "<",
        "__greaterThan__": ">",
    }

    if (content.type === "GlobalVariable") {
        return translateVarToWs(content.name, true);

    } else if (content.type === "PlayerVariable") {
        return translateVarToWs(content.name, false);

    } else if (content.type === "Subroutine") {
        return translateSubroutineToWs(content.name);

    } else if (["StringLiteral", "LocalizedStringLiteral", "FullwidthStringLiteral", "BigLettersStringLiteral"].includes(content.type)) {
        return escapeString(content.name);
    }
    
    if (content.name in equalityFuncToOpMapping) {
        //Convert functions such as __equals__(1,2) to __compare__(1, ==, 2).
        content.args.splice(1, 0, new Ast(equalityFuncToOpMapping[content.name], [], [], "__Operator__"));
        content.name = "__compare__";

    } else if (content.name === "__assignTo__" || content.name === "__modifyVar__") {
        var newName = content.name === "__assignTo__" ? "__set" : "__modify";
        if (content.args[0].name === "__globalVar__") {
            //A = 3 -> __setGlobalVariable__(A, 3)
            newName += "GlobalVar__";
            content.args = [content.args[0].args[0]].concat(content.args.slice(1));

        } else if (content.args[0].name === "__playerVar__") {
            //eventPlayer.A = 3 -> __setPlayerVariable__(eventPlayer, A, 3)
            newName += "PlayerVar__";
            content.args = [content.args[0].args[0], content.args[0].args[1]].concat(content.args.slice(1));

        } else if (content.args[0].name === "__valueInArray__") {
            if (content.args[0].args[0].name === "__globalVar__") {
                //A[0] = 3 -> __setGlobalVariableAtIndex__(A, 0, 3)
                newName += "GlobalVarAtIndex__";
                content.args = [content.args[0].args[0].args[0], content.args[0].args[1]].concat(content.args.slice(1));

            } else if (content.args[0].args[0].name === "__playerVar__") {
                //eventPlayer.A[0] = 3 -> __setPlayerVariableAtIndex__(eventPlayer, A, 0, 3)
                newName += "PlayerVarAtIndex__";
                content.args = [content.args[0].args[0].args[0], content.args[0].args[0].args[1], content.args[0].args[1]].concat(content.args.slice(1));

            } else {
                error("Cannot assign to "+functionNameToString(content.args[0].args[0].name))
            }
        } else {
            error("Cannot assign to "+functionNameToString(content.args[0].name))
        }
        content.name = newName;

    } else if (content.name === "__chaseAtRate__" || content.name === "__chaseOverTime__") {
        var newName = content.name === "__chaseAtRate__" ? "AtRate__" : "OverTime__";
        if (content.args[0].name === "__globalVar__") {
            newName = "GlobalVariable"+newName;
            content.args = [content.args[0].args[0]].concat(content.args.slice(1));

        } else if (content.args[0].name === "__playerVar__") {
            newName = "PlayerVariable"+newName;
            content.args = [content.args[0].args[0], content.args[0].args[1]].concat(content.args.slice(1));

        } else {
            error("Expected a variable for 1st argument of "+functionNameToString(content)+", but got "+functionNameToString(content.args[0]));
        }
        newName = "__chase"+newName;
        content.name = newName;

    } else if (content.name === "__negate__") {
        content.name = "__multiply__";
        content.args = [getAstForMinus1(), content.args[0]];

    } else if (content.name === "__number__") {
        return trimNb(content.args[0].name);

    } else if (content.name === "__team__") {
        content.name = content.args[0].name;
        content.type = "TeamLiteral";

    } else if (content.name === "getAllPlayers") {
        content.name = "getPlayers";
        content.args = [getAstForTeamAll()];

    } else if (["hudHeader", "hudSubheader", "hudSubtext"].includes(content.name)) {
      
		if (content.name === "hudHeader") {
			content.args.splice(2, 0, getAstForNull());
			content.args.splice(3, 0, getAstForNull());
			content.args.splice(7, 0, getAstForColorWhite());
			content.args.splice(8, 0, getAstForColorWhite());
		} else if (content.name === "hudSubheader") {
			content.args.splice(1, 0, getAstForNull());
			content.args.splice(3, 0, getAstForNull());
			content.args.splice(6, 0, getAstForColorWhite());
			content.args.splice(8, 0, getAstForColorWhite());
		} else {
			content.args.splice(1, 0, getAstForNull());
			content.args.splice(2, 0, getAstForNull());
			content.args.splice(6, 0, getAstForColorWhite());
			content.args.splice(7, 0, getAstForColorWhite());
		}
        content.name = "__hudText__";
        
    } else if (content.name === "hudText") {
        content.name = "__hudText__";

    } else if (content.name === "pass") {
        content.name = "return";
        content.isDisabled = true;

    } else if (content.name === "stopChasingVariable") {
        var newName = "";
        if (content.args[0].name === "__globalVar__") {
            newName = "GlobalVariable";
            content.args = [content.args[0].args[0]].concat(content.args.slice(1));

        } else if (content.args[0].name === "__playerVar__") {
            newName = "PlayerVariable";
            content.args = [content.args[0].args[0], content.args[0].args[1]].concat(content.args.slice(1));

        } else {
            error("Expected a variable for 1st argument of "+functionNameToString(content.name)+", but got "+functionNameToString(content.args[0].name));
        }
        newName = "__stopChasing"+newName+"__";
        content.name = newName;

    } 

    var result = "";
    if (content.isDisabled === true) {
        result += tows("__disabled__", ruleKw)+" ";
    }
    if (content.type === undefined) {
        error("Type of '"+content.name+"' is undefined");
    }
    if (content.type === "void") {
        result += tows(content.name, actionKw);
    } else if (isTypeSuitable(["Object", "Array"], content.type)){
        result += tows(content.name, valueKw);
    } else if (content.type in constantValues) {
        result += tows(content.name, constantValues[content.type]);
    } else if (content.type === "HeroLiteral") {
        result += tows(content.name, constantValues["Hero"]);
    } else if (content.type === "MapLiteral") {
        result += tows(content.name, constantValues["Map"]);
    } else if (content.type === "TeamLiteral") {
        result += tows(content.name, constantValues["Team"]);
    } else if (content.type === "GamemodeLiteral") {
        result += tows(content.name, constantValues["Gamemode"]);
    } else {
        error("Unknown type '"+content.type+"' of '"+content.name+"'");
    }
    if (content.args.length > 0) {
        result += "(" + content.args.map(x => astToWs(x)).join(", ")+")";
    }
    return result;
}
