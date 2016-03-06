// LICENSE : MIT
"use strict";
var RuleHelper = require("textlint-rule-helper").RuleHelper;
var spellCheck = require("spellcheck-technical-word").spellCheckText;
/**
 * @param {RuleContext} context
 */
function reporter(context) {
    var helper = new RuleHelper(context);
    var exports = {};
    var fixer = context.fixer;
    var Syntax = context.Syntax;
    exports[context.Syntax.Str] = function (node) {
        if (helper.isChildNode(node, [Syntax.Link, Syntax.Image, Syntax.BlockQuote, Syntax.Emphasis])) {
            return;
        }
        var text = context.getSource(node);
        var results = spellCheck(text);
        results.forEach(function (/*SpellCheckResult*/result) {
            // line, column
            context.report(node, new context.RuleError(result.actual + " => " + result.expected, {
                line: result.paddingLine,
                column: result.paddingColumn,
                fix: fixer.replaceTextRange([result.paddingColumn, result.paddingColumn + result.actual.length], result.expected)
            }));
        });
    };
    return exports;
}
module.exports = {
    linter: reporter,
    fixer: reporter
};
