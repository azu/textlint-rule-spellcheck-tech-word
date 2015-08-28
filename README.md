#  textlint-rule-spellcheck-tech-word[![Build Status](https://travis-ci.org/azu/textlint-rule-spellcheck-tech-word.svg)](https://travis-ci.org/azu/textlint-rule-spellcheck-tech-word)

This rule module for [azu/textlint](https://github.com/azu/textlint "azu/textlint").

This rule provide tech word checking for web engineer.

- [azu/technical-word-rules](https://github.com/azu/technical-word-rules "azu/technical-word-rules")の辞書を使ったtextlint用のルールです
- [WEB+DB PRESS用語統一ルール](https://gist.github.com/inao/f55e8232e150aee918b9 "WEB+DB PRESS用語統一ルール")やJavaScript関連の用語などを含んでいます。

## Installation

```
npm install textlint -g
npm install textlint-rule-spellcheck-tech-word --save-dev
```

## Usage

```
$ textlint --rule spellcheck-tech-word file.md
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT