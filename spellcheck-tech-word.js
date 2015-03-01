// LICENSE : MIT
"use strict";
var dictionaryItems = require("technical-word-rules");
var RuleHelper = require("textlint-rule-helper").RuleHelper;

/**
 * spell check the text, then return array of result.
 * @param {string} text
 * @returns {SpellCheckResult[]}
 */
function spellCheckText(text) {
    var results = [];
    for (var i = 0, length = dictionaryItems.length; i < length; i++) {
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
        /**
         * @typedef {{actual: *, expected: (XML|string|void), matchedStartIndex: number}} SpellCheckResult
         */
        var result = {
            actual: matchedString,
            expected: expected,
            matchedStartIndex: matchedStartIndex
        };
        results.push(result);
    }
    return results;
}
/**
 * @param {RuleContext} context
 */
module.exports = function (context) {
    var helper = new RuleHelper(context);
    var exports = {};
    var Syntax = context.Syntax;
    exports[context.Syntax.Str] = function (node) {
        if (helper.isChildNode(node, [Syntax.Link, Syntax.Image, Syntax.BlockQuote])) {
            return;
        }
        var text = context.getSource(node);
        var results = spellCheckText(text);

        results.forEach(function (/*SpellCheckResult*/result) {
            // line, column
            context.report(node, (new context.RuleError(result.actual + " => " + result.expected, result.matchedStartIndexk)));
        });
    };
    return exports;
};
