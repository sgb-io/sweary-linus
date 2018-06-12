import 'dart:io';
import 'dart:async';
import 'dart:convert';

Future readLines(String filepath) async {
  return new File(filepath)
      .openRead()
      .transform(utf8.decoder)
      .transform(const LineSplitter());
}

Future main(List<String> arguments) async {
  if (arguments.length != 2) {
    stderr.writeln(
        'Not enough arguments. Example usage: dart main.dart ../insults.txt ../stopwords.txt');
  }

  List<String> outputLines = [];
  var lines = await readLines(arguments[0]);
  await for (var line in lines) {
    stdout.writeln(line);
    outputLines.add(line);
  }

  return outputLines;
}
