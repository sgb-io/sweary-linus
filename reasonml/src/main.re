/* Assume a nodejs context and allow use of filesystem */
let fs = [%bs.raw {| require('fs') |}];
let getFileContents: string => string = [%bs.raw
  {| function(filepath) {
      return fs.readFileSync(filepath, 'utf8');
  }|}
];

exception InvalidArguments(string);

let convertToSingleWords = (rawWords: string) => {
  /* TODO how to iterate this? */
  let lines = Js.String.split(rawWords);
  lines;
};

let main = args => {
  let argCount = Array.length(args);
  if (argCount < 2) {
    raise(
      InvalidArguments(
        "Not enough arguments. Example usage: node main.bs.js ../insults.txt ../stopwords.txt",
      ),
    );
  };

  let insults = getFileContents(args[0]);
  let stopwords = getFileContents(args[1]);

  Js.log(insults);
  Js.log(stopwords);
};

/* Injects the nodejs process args & execute program */
main([%bs.raw {| process.argv.slice(2) |}]);