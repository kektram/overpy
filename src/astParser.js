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

function parseAstRules(rules) {
    for (var rule of rules) {

        fileStack = rule.fileStack;

        if (rule.name === "__rule__") {
            if (rule.ruleAttributes.event === undefined) {
                rule.ruleAttributes.event = "global";
            }
            if (rule.ruleAttributes.event === "global") {
                if (rule.ruleAttributes.eventTeam !== undefined || rule.ruleAttributes.eventPlayer !== undefined) {
                    error("Cannot declare event team or event player with event type '"+rule.ruleAttributes.event+"'");
                }
            } else {
                if (rule.ruleAttributes.eventTeam === undefined) {
                    rule.ruleAttributes.eventTeam = "all";
                }
                if (rule.ruleAttributes.eventPlayer === undefined) {
                    rule.ruleAttributes.eventPlayer = "all";
                }
            }
            
        } else if (rule.name === "__def__") {
            if (rule.ruleAttributes.event !== undefined) {
                error("Cannot declare event for a subroutine");
            }
            rule.ruleAttributes.event = "__subroutine__";
            if (rule.ruleAttributes.eventTeam !== undefined || rule.ruleAttributes.eventPlayer !== undefined) {
                error("Cannot declare event team or event player for a subroutine");
            }
            if (rule.ruleAttributes.name === undefined) {
                rule.ruleAttributes.name = "Subroutine "+rule.ruleAttributes.subroutineName;
            }
        } else {
            error("Unexpected function '"+rule.name+"' outside a rule");
        }
        
        currentRuleEvent = rule.ruleAttributes.event;
        rule = parseAst(rule);
    }
    return rules;
}

function parseAst(content) {

    if (!(typeof content === "object")) {
        error("Content is not object: "+content);
    }

    debug("Parsing AST of '"+content.name+"'");

    if (!(content.args instanceof Array)) {
        error("Function '"+content.name+"' has '"+content.args+"' for args, expected array");
    }
    if (!(content.children instanceof Array)) {
        error("Function '"+content.name+"' has '"+content.children+"' for args, expected array");
    }

    for (var i = 0; i < content.args.length; i++) {
        content.argIndex = i;
        content.args[i] = parseAst(content.args[i]);
    }

    for (var i = 0; i < content.children.length; i++) {
        content.childIndex = i;
        for (var child of content.children) {
            console.log(astToString(child));
        }
        content.children[i] = parseAst(content.children[i]);
    }
    
    fileStack = content.fileStack;

    //Skip if it's a literal or a constant
    if ([
        "NumberLiteral", 
        "GlobalVariable", "PlayerVariable", "Subroutine", 
        "HeroLiteral", "MapLiteral", "GamemodeLiteral", "TeamLiteral",
    ].concat(Object.keys(constantValues)).includes(content.type)) {
        return content;
    }

    //For string literals, check if they are a child of __format__. If not, wrap them with the __format__ function.
    if (["StringLiteral", "LocalizedStringLiteral", "FullwidthStringLiteral", "BigLettersStringLiteral"].includes(content.type)) {
        if (content.parent.name === "__format__") {
            return content;
        } else {
            content = new Ast("__format__", [content, getAstForNull()]);
        }
    }

    //Manually check types and arguments for the __format__ function, as it is the only function that can take an infinite number of arguments.
    if (content.name === "__format__") {
        if (content.args.length < 2) {
            error("Function 'format' takes at least 2 arguments, received "+content.args.length);
        }
        //Check types
        if (!isTypeSuitable(funcKw[content.name].args[0].type, content.args[0].type)) {
            warn("w_type_check", getTypeCheckFailedMessage(content, 0, funcKw[content.name].args[0].type, content.args[0]));
        }
        for (var i = 1; i < content.args.length; i++) {
            if (!isTypeSuitable(funcKw[content.name].args[1].type, content.args[i].type)) {
                warn("w_type_check", getTypeCheckFailedMessage(content, i, funcKw[content.name].args[1].type, content.args[i]));
            }
        }

    } else if (content.name in funcKw) {

        
        if (["hudHeader", "hudSubheader", "hudSubtext"].includes(content.name)) {
      
            if (content.args.length < 6 || content.args.length > 7) {
                error("Function '"+content.name+"' takes 6 or 7 arguments, received "+content.args.length);
            }
            if (content.args.length === 6) {
                content.args.push(new Ast("DEFAULT", [], [], "SpecVisibility"));
            }

        } else if (content.name === "hudText") {
            if (content.args.length < 10 || content.args.length > 11) {
                error("Function '"+content.name+"' takes 10 or 11 arguments, received "+content.args.length);
            }
            if (content.args.length === 10) {
                content.args.push(new Ast("DEFAULT", [], [], "SpecVisibility"));
            }

        } else if (content.name === "wait") {
            if (content.args.length > 2) {
                error("Function 'wait' takes 0 to 2 arguments, received "+args.length);
            }
            if (content.args.length === 0) {
                content.args.push(getAstFor0_016());
            }
            if (content.args.length === 1) {
                content.args.push(new Ast("IGNORE_CONDITION", [], [], "Wait"));
            }
            content.name = "__wait__";
        }
        
        var nbExpectedArgs = (funcKw[content.name].args === null ? 0 : funcKw[content.name].args.length);
        if (content.args.length !== nbExpectedArgs) {
            error("Function '"+content.name+"' takes "+nbExpectedArgs+" arguments, received "+content.args.length);
        }

        //Type check
        for (var i = 0; i < content.args.length; i++) {
            if (!isTypeSuitable(funcKw[content.name].args[i].type, content.args[i].type)) {
                warn("w_type_check", getTypeCheckFailedMessage(content, i, funcKw[content.name].args[i].type, content.args[i]));
            }
        }

    } else {
        error("Unknown function '"+content.name+"'");
    }

    if (content.name in astParsingFunctions) {
        content = astParsingFunctions[content.name](content);
    }

    return content;
}