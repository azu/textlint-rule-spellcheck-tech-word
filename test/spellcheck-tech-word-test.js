// LICENSE : MIT
"use strict";
var TextLintTester = require("textlint-tester");
var tester = new TextLintTester();
// rule
var rule = require("../");
// ruleName, rule, { valid, invalid }
tester.run("spellcheck-tech-word", rule, {
    valid: [
        "HTML Imports",
        "_HTML Import_"
    ],
    invalid: [
        {
            text: "HTML Import",
            output: "HTML Imports",
            errors: [
                {
                    message: "HTML Import => HTML Imports",
                    line: 1,
                    column: 1
                }
            ]
        },
        {
            text: "JSCはwebkitの一部",
            output: "JSCはWebKitの一部",
            errors: [
                {
                    message: "はwebkit => はWebKit",
                    line: 1,
                    column: 4
                }
            ]
        },
        {
            text: "git is a tool.\n" +
            "texlint check your texts.\n" +
            "browserify is bundler.\n",
            output: "Git is a tool.\n" +
            "texlint check your texts.\n" +
            "Browserify is bundler.\n",
            errors: [
                {
                    message: "git => Git",
                    line: 1,
                    column: 1
                },
                {
                    message: "browserify => Browserify",
                    line: 3,
                    column: 1
                },
            ]
        }
    ]
});