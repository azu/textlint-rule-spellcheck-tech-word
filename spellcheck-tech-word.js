// LICENSE : MIT
"use strict";
var dictionaryItems = require("technical-word-rules");
/**
 * Get parents of node.
 * The parent nodes are returned in order from the closest parent to the outer ones.
 * @param node
 * @returns {Array}
 */
function getParents(node) {
    var result = [];
    var parent = node.parent;
    while (parent != null) {
        result.push(parent);
        parent = parent.parent;
    }
    return result;
}
/**
 * Return true if `node` is wrapped any one of `types`.
 * @param {TxtNode} node is target node
 * @param {string[]} types are wrapped target node
 * @returns {boolean}
 */
function isNodeWrapped(node, types) {
    var parents = getParents(node);
    var parentsTypes = parents.map(function (parent) {
        return parent.type;
    });
    return types.some(function (type) {
        return parentsTypes.some(function (parentType) {
            return parentType === type;
        });
    });
}
/**
 * @param {RuleContext} context
 */
module.exports = function (context) {
    var exports = {};
    var Syntax = context.Syntax;
    exports[context.Syntax.Str] = function (node) {
        if (isNodeWrapped(node, [Syntax.Link, Syntax.Image, Syntax.BlockQuote])) {
            return;
        }
        var text = context.getSource(node);
        for (var i = 0; i < dictionaryItems.length; i++) {
            var dictionary = dictionaryItems[i];
            var query = new RegExp(dictionary.pattern, dictionary.flag);
            var match = query.exec(text);
            if (!match) {
                continue;
            }
            var matchedString = match[0];
            // s/Web/Web/iは大文字小文字無視してWebに変換したいという意味に対応する
            if (dictionary.flag != null) {
                var strictQuery = new RegExp(dictionary.pattern);
                var isStrictMatch = strictQuery.test(match[0]);
                // /Web/i でマッチするけど、 /Web/ でマッチするならそれは除外する
                if (isStrictMatch) {
                    continue;
                }
            }
            // [start, end]
            var matchedStartIndex = match.index + 1;
            var expected = matchedString.replace(query, dictionary.expected);
            // line, column
            context.report(node, (new context.RuleError(matchedString + " => " + expected, matchedStartIndex)));
        }
    };
    return exports;
};
