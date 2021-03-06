var COMMENT = 1,
  MACRO = 2,
  IMACRO = 3,
  BREAK = 4,
  TEXT = 5,
  EMPTY = 6,
  ESCAPE = 7;

var callableMacros = [
  'Ac', 'Ao', 'Bc', 'Bo', 'Brc', 'Bro', 'Dc', 'Do', 'Ec', 'Eo', 'Fc',
  'Oc', 'Oo', 'Pc', 'Po', 'Qc', 'Qo', 'Sc', 'So', 'Xc', 'Xo', 'Aq',
  'Bq', 'Brq', 'Dq', 'Op', 'Pq', 'Ql', 'Qq', 'Sq', 'Vt', 'Ta', 'Ad',
  'An', 'Ap', 'Ar', 'At', 'Bsx', 'Bx', 'Cd', 'Cm', 'Dv', 'Dx', 'Em',
  'Er', 'Ev', 'Fa', 'Fl', 'Fn', 'Ft', 'Fx', 'Ic', 'Li', 'Lk', 'Ms',
  'Mt', 'Nm', 'Ns', 'Nx', 'Ox', 'Pa', 'Pf', 'Sx', 'Sy', 'Tn', 'Ux',
  'Va', 'Vt', 'Xr'
];

/**
 * Wrap all common regexp patterns
 *
 * @namespace
 * @alias patterns
 * @since 0.0.1
 *
 */
var patterns = {
  macro: /^\./,
  macroStart: /^.\s*/,
  lexeme: /(\n|\s+|^\.\s+\S+)/g,
  comment: /(\.)?\\\"|\\#/,
  arguments: /"(.*?)"|\S+/g,
  number: /[\d]/,
  realNumber: /(^[\-|\+]?\d)/,
  escape: /(\\[^\"])/g,
  wrappingQuotes: /^\s*?\"([^\"]*)\"\s*?$/g,
  noWhiteSpace: /\S/,
  newLine: /[ \t]*\n/
};

/**
 * Create a new object with all the properties present in an array of n
 * objects.
 *
 * @argument {array} objects to be combined
 *
 * @returns {object}
 *
 * @since 0.0.1
 *
 */
var mergeObjects = function (objects) {
  return objects.reduce(function (memo, object) {
    for(var key in object) {
      if(object.hasOwnProperty(key)) {
        memo[key] = object[key];
      }
    }

    return memo;
  }, {});
};

/**
 * Returns a boolean describing if the token can have nodes
 *
 * @argument {token} token
 *
 * @returns {boolean}
 *
 * @since 0.0.1
 *
 */
var canHaveNodes = function (token) {
  return [MACRO, IMACRO, ESCAPE].indexOf(token.kind) !== -1
};

var macros = {},
  macroLib = null;
