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

import { constantValues } from "../../data/constants";
import { astParsingFunctions, activatedExtensions } from "../../globalVars";
import { error } from "../../utils/logging";

astParsingFunctions.playEffect = function(content) {

    if (!(content.args[1].name in constantValues[content.args[1].type])) {
        error("Unknown dynamic effect '"+content.args[1].name+"'");
    }
    if (constantValues[content.args[1].type][content.args[1].name].extension && !activatedExtensions.includes(constantValues[content.args[1].type][content.args[1].name].extension ?? error("Check for workshop extension while playing effect failed"))) {
        error("You must activate the extension '"+constantValues[content.args[1].type][content.args[1].name].extension+"' to use '"+content.args[1].type+"."+content.args[1].name+"'");
    }

    return content;
};
