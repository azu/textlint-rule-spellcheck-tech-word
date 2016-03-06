# textlint-rule-spellcheck-tech-word [![textlint rule](https://img.shields.io/badge/textlint-fixable-green.svg?style=social)](https://textlint.github.io/)  [![Build Status](https://travis-ci.org/azu/textlint-rule-spellcheck-tech-word.svg)](https://travis-ci.org/azu/textlint-rule-spellcheck-tech-word)

This rule module for [azu/textlint](https://github.com/textlint/textlint "azu/textlint").

This rule provide tech word checking for web engineer.

- [azu/technical-word-rules](https://github.com/azu/technical-word-rules "azu/technical-word-rules")の辞書を使ったtextlint用のルールです
- [WEB+DB PRESS用語統一ルール](https://gist.github.com/inao/f55e8232e150aee918b9 "WEB+DB PRESS用語統一ルール")やJavaScript関連の用語などを含んでいます。

## Installation

```
npm install textlint-rule-spellcheck-tech-word
```

## Usage

```
npm i --save-dev textlint textlint-rule-spellcheck-tech-word
textlint --rule spellcheck-tech-word file.md
```

## Example

See [example/](example/)

```sh
$ textlint --rule spellcheck-tech-word README.md

textlint-rule-spellcheck-tech-word/example/README.md
  3:4  error  Java Script => JavaScript

✖ 1 problem
```

## Fixable

[![textlint rule](https://img.shields.io/badge/textlint-fixable-green.svg?style=social)](https://textlint.github.io/) 

`textlint --fix` での[自動修正](https://github.com/textlint/textlint/blob/master/docs/rule-fixer.md)に対応しています。

## FAQ

Q. [azu/textlint-plugin-JTF-style](https://github.com/azu/textlint-plugin-JTF-style "azu/textlint-plugin-JTF-style")と衝突する

A. カタカナの表記ルールが異なるために両方のルールを適応すると衝突することがあります

例)

- インターフェイス (JTFスタイルガイド)
- インタフェース   (WEB+DB)

JTFスタイルガイドが参照する[外来語（カタカナ）表記ガイドライン](http://www.jtca.org/standardization/ "外来語（カタカナ）表記ガイドライン")と[azu/technical-word-rules](https://github.com/azu/technical-word-rules "azu/technical-word-rules")の辞書が含む[WEB+DB PRESS用語統一ルール](https://gist.github.com/inao/f55e8232e150aee918b9 "WEB+DB PRESS用語統一ルール")で異なるため発生しています。

そのため、`jtf-style`の一部ルールを無効化するか、どちらか片方を利用するように設定する必要があります。

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT
