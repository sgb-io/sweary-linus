# Sweary Linus

This project contains implementations of a simple program in various different programming languages and programming styles. It is used as a personal learning exersize.

It was inspired by [Exercises in Programming Style by Cristina Videira Lopes](https://www.amazon.com/Exercises-Programming-Style-Cristina-Videira/dp/1482227371/) via [Henrik Warne's blog post](https://henrikwarne.com/2018/03/13/exercises-in-programming-style/).

## The Program

The program counts the occurrences of words (term frequencies) in a file. The sample input is a list of [Linus Torvalds insults](https://en.wikiquote.org/wiki/Linus_Torvalds).

The program should:
  - Read the insults file and turn into individual words
  - Read the stop words file and turn into individual words
  - Lower-case the words
  - Remove non-letter characters (english alphabet only)
  - Remove stop words (“the”, “a”, “for” etc) (note: stop words _do_ contain non-alphanumerics e.g. `don't`)
  - Count the occurrences of all words
  - Sort the list by number of occurences then alphabetically
  - Finally, print out the 25 most common words in order
  - The output should match exactly as below

## Expected output

```
#1 - "just", 196 occurrences
#2 - "crap", 120 occurrences
#3 - "code", 113 occurrences
#4 - "wrong", 86 occurrences
#5 - "stop", 85 occurrences
#6 - "really", 84 occurrences
#7 - "stupid", 77 occurrences
#8 - "like", 71 occurrences
#9 - "even", 70 occurrences
#10 - "fcking", 63 occurrences
#11 - "people", 61 occurrences
#12 - "make", 58 occurrences
#13 - "broken", 56 occurrences
#14 - "patch", 52 occurrences
#15 - "think", 50 occurrences
#16 - "shit", 49 occurrences
#17 - "thing", 48 occurrences
#18 - "pure", 46 occurrences
#19 - "can", 44 occurrences
#20 - "things", 44 occurrences
#21 - "fix", 41 occurrences
#22 - "idiotic", 41 occurrences
#23 - "whole", 41 occurrences
#24 - "kind", 40 occurrences
#25 - "actually", 38 occurrences
```