const JSON_GRAMMAR = {
  property: {
    pattern: /[ ]*"[a-z0-9_]+":/ig,
    inside: {
      quote: /"/,
      colon: /:/
    }
  },
  null: /\b(null)\b/g,
  boolean: /\b(true|false)\b/g,
  string: /(")(\\?.)*?\1/g,
  number: /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?|NaN|-?Infinity)\b/g,
};

export default JSON_GRAMMAR;
