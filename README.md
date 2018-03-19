# Sweary Linus

This project contains implementations of a simple program in various different programming languages and programming styles. It is used as a personal learning exersize.

It was inspired by [Exercises in Programming Style by Cristina Videira Lopes](https://www.amazon.com/Exercises-Programming-Style-Cristina-Videira/dp/1482227371/) via [Henrik Warne's blog post](https://henrikwarne.com/2018/03/13/exercises-in-programming-style/).

## The Program

The program counts the occurrences of words (term frequencies) in a file. The sample input is a list of [Linus Torvalds insults](https://en.wikiquote.org/wiki/Linus_Torvalds).

The program should:
  - Read input lines from the file and turn into individual words
  - Remove all non-alphanumeric characters
  - Normalize (down-cases) the words
  - Remove stop words (“the”, “a”, “for” etc)
  - Count the occurrences of all words
  - Finally, print out the 25 most common words in order.

## Expected output

```
#1 - "just", 196 occurrences
#2 - "dont", 127 occurrences
#3 - "crap", 108 occurrences
#4 - "code", 108 occurrences
#5 - "wrong", 79 occurrences
#6 - "really", 79 occurrences
#7 - "stop", 78 occurrences
#8 - "like", 71 occurrences
#9 - "even", 70 occurrences
#10 - "im", 68 occurrences
#11 - "stupid", 65 occurrences
#12 - "fcking", 63 occurrences
#13 - "make", 58 occurrences
#14 - "people", 58 occurrences
#15 - "broken", 55 occurrences
#16 - "thats", 53 occurrences
#17 - "patch", 52 occurrences
#18 - "think", 50 occurrences
#19 - "thing", 48 occurrences
#20 - "pure", 46 occurrences
#21 - "can", 44 occurrences
#22 - "shit", 44 occurrences
#23 - "idiotic", 41 occurrences
#24 - "whole", 41 occurrences
#25 - "fix", 41 occurrences
```