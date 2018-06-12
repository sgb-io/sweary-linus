import 'dart:io';
import 'dart:async';
import 'dart:convert';
import 'dart:collection';

Future readLines(String filepath) async {
  return new File(filepath)
      .openRead()
      .transform(utf8.decoder)
      .transform(const LineSplitter());
}

Future getInsults(String filepath) async {
  List<String> words = [];
  var insultLines = await readLines(filepath);
  await for (var line in insultLines) {
    for (var word in line.split(' ')) {
      words.add(word);
    }
  }

  return words;
}

Future getStopwords(String filepath) async {
  List<String> words = [];
  var stopwordLines = await readLines(filepath);
  await for (var line in stopwordLines) {
    words.add(line);
  }

  return words;
}

String removeNonLetters(String word) {
  return word.replaceAll(new RegExp(r'[^a-z]'), '');
}

List<String> getCleanedInsults(List<String> insults, List<String> stopwords) {
  List<String> cleanInsults = [];

  for (var rawInsult in insults) {
    String asLower = rawInsult.toLowerCase();
    String asLetters = removeNonLetters(asLower);

    if (asLetters == '') {
      continue;
    }

    if (stopwords.contains(asLower) || stopwords.contains(asLetters)) {
      continue;
    }

    cleanInsults.add(asLetters);
  }

  return cleanInsults;
}

LinkedHashMap sortWordCounts(LinkedHashMap wordCounts) {
  LinkedHashMap resMap = new LinkedHashMap();
  List mapKeys = wordCounts.keys.toList(growable: false);
  mapKeys.sort((a, b) => wordCounts[b] - wordCounts[a]);

  // TODO need to sort by the key as a secondary sort...

  for (var key in mapKeys) {
    resMap[key] = wordCounts[key];
  }

  return resMap;
}

LinkedHashMap<String, int> countWords(List<String> words) {
  LinkedHashMap<String, int> wordCounts = new LinkedHashMap();

  for (var word in words) {
    if (!wordCounts.containsKey(word)) {
      wordCounts[word] = 1;
    } else {
      wordCounts[word] += 1;
    }
  }

  return wordCounts;
}

Future main(List<String> arguments) async {
  if (arguments.length != 2) {
    stderr.writeln(
        'Not enough arguments. Example usage: dart main.dart ../insults.txt ../stopwords.txt');
  }

  // Import insults & stopwords into lists of words
  List<String> insults = await getInsults(arguments[0]);
  List<String> stopwords = await getStopwords(arguments[1]);

  // Reduce insults to letters-only, lowercase & no stopwords
  List<String> cleanInsults = getCleanedInsults(insults, stopwords);

  // Count the occurences of each word, sort by most occurences
  LinkedHashMap<String, int> countedWords = countWords(cleanInsults);
  LinkedHashMap sortedWordCounts = sortWordCounts(countedWords);

  // Print the top 25 (and return so that we can test)
  List wordCountKeys = sortedWordCounts.keys.toList(growable: false);
  List<String> outputLines = [];
  for (var i = 0; i < 25; i++) {
    String word = wordCountKeys[i];
    int occurences = sortedWordCounts[word];
    String line = '#${i+1} - "${word}", ${occurences} occurrences';
    stdout.writeln(line);
    outputLines.add(line);
  }

  return outputLines;
}
