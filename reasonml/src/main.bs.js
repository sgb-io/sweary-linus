// Generated by BUCKLESCRIPT VERSION 3.1.5, PLEASE EDIT WITH CARE
'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Caml_exceptions = require("bs-platform/lib/js/caml_exceptions.js");

var fs = ( require('fs') );

var getFileContents = ( function(filepath) {
      return fs.readFileSync(filepath, 'utf8');
  });

var InvalidArguments = Caml_exceptions.create("Main-Reasonml.InvalidArguments");

function main(args) {
  var argCount = args.length;
  if (argCount < 2) {
    throw [
          InvalidArguments,
          "Not enough arguments. Example usage: node main.bs.js ../insults.txt ../stopwords.txt"
        ];
  }
  var insults = Curry._1(getFileContents, Caml_array.caml_array_get(args, 0));
  var stopwords = Curry._1(getFileContents, Caml_array.caml_array_get(args, 1));
  console.log(insults);
  console.log(stopwords);
  return /* () */0;
}

main(( process.argv.slice(2) ));

exports.fs = fs;
exports.getFileContents = getFileContents;
exports.InvalidArguments = InvalidArguments;
exports.main = main;
/* fs Not a pure module */
