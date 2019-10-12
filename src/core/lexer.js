/**
 * Takes charge of the process of converting a sequence of characters
 * (string) into a sequence of tokens. Also keeps track of useful
 * information like current column and line number during the process
 *
 * @constructor
 *
 * @property {array} source the source string, splitted by withespaces
 *
 * @property {array} tokens buffer to store the parsed tokens
 *
 * @property {integer} sourceIdx current token index
 *
 * @property {col} current column being parsed
 *
 * @property {line} current line being parsed
 *
 * @property {TokenFactory} factory used to create tokens
 *
 */
var Lexer = function (source) {
  this.source = this.cleanSource(source)
    .split(patterns.lexeme);
  this.tokens = [];
  this.sourceIdx = 0;
  this.col = 0;
  this.line = 1;
  this.factory = new TokenFactory();
};

/**
 * Performs the following tasks to the source string:
 * - Replaces bullets, em-dashes, copyright with their HTML entities
 * - Adds whitespaces between escape sequences
 * - Replaces < and > symbols with their HTML escape equivalents
 *
 * @argument {string} source
 *
 * @returns {string}
 *
 * @since 0.0.1
 *
 */
Lexer.prototype.cleanSource = function (source) {
  return source
    .replace(/\\\(bu|\\\[bu\]/g, '&bull;')
    .replace(/\\\(em|\\\[em\]/g, '&mdash;')
    .replace(/\\\(co|\\\[co\]/g, '&copy;')
    .replace(patterns.escape, ' $1 ')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
};

/**
 * Does the tokenization of the source given in the constructor,
 * and returns an array of tokens.
 *
 * @returns {array} array of tokens
 *
 * @example
 * var lexer = new Lexer(string);
 * lexer.lex() //=> [...]
 */
Lexer.prototype.lex = function () {
  var lexeme;

  /* This check is here because empty strings can break the loop */
  while(typeof (lexeme = this.next()) !== 'undefined') {
    this.tokens.push(this.factory.create(lexeme));
  }

  return this.tokens;
};

/**
 * Manages the current token being parsed,
 * and the state of this.col and this.line.
 *
 * @returns {string} the next lexeme in the source, if there is no
 * more lexemes returns `undefined`
 *
 */
Lexer.prototype.next = function () {
  var lexeme = this.source[this.sourceIdx++];

  if(lexeme === '\n') {
    this.col = 0;
    this.line += 1;
  } else if(lexeme) {
    this.col += lexeme.length;
  }

  return lexeme;
};
