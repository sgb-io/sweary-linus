import 'dart:async';
import 'package:test/test.dart';
import 'main.dart' as SwearyLinus;

Future main() async {
  List<String> output =
      await SwearyLinus.main(['../insults.txt', '../stopwords.txt']);
  test('Generates the expected SwearyLinus output', () {
    expect(output, equals(expectedOutput));
  });
}

List<String> expectedOutput = [
  '#1 - "just", 196 occurrences',
  '#2 - "crap", 120 occurrences',
  '#3 - "code", 113 occurrences',
  '#4 - "wrong", 86 occurrences',
  '#5 - "stop", 85 occurrences',
  '#6 - "really", 84 occurrences',
  '#7 - "stupid", 77 occurrences',
  '#8 - "like", 71 occurrences',
  '#9 - "even", 70 occurrences',
  '#10 - "fcking", 63 occurrences',
  '#11 - "people", 61 occurrences',
  '#12 - "make", 58 occurrences',
  '#13 - "broken", 56 occurrences',
  '#14 - "patch", 52 occurrences',
  '#15 - "think", 50 occurrences',
  '#16 - "shit", 49 occurrences',
  '#17 - "thing", 48 occurrences',
  '#18 - "pure", 46 occurrences',
  '#19 - "can", 44 occurrences',
  '#20 - "things", 44 occurrences',
  '#21 - "fix", 41 occurrences',
  '#22 - "idiotic", 41 occurrences',
  '#23 - "whole", 41 occurrences',
  '#24 - "kind", 40 occurrences',
  '#25 - "actually", 38 occurrences',
];
