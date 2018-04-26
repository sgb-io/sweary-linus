#!/usr/bin/env python
import sys
import re

def strip_non_alphanumeric(str):
    # Restrict to letters/numbers only
    is_char_ok = lambda c: (
        ord(c) in range(48, 58) or  # char is a number
        ord(c) in range(97, 123)  # char is lower case
    )
    cleaned = ''.join([c for c in str if is_char_ok(c)])

    return cleaned


def count_frequency(list_of_words):
    counts = {}
    """
        Create a dictionary with a value of the frequencies, iterate
        over list_of_words and increment key value pair when spotted.
    """
    for word in list_of_words:
        if word in counts:
            counts[word] = counts[word] + 1
        else:
            counts[word] = 1

    return counts


def get_top_frequencies(counts):
    # Order the counts dict by value (occurences) then key (word)
    return sorted(
        counts.items(),
        key=lambda i: (-i[1], i[0]), reverse=False
    )


def generate_linus(file_name):
    # Pythonic 'read file then close'
    with open(file_name, 'r') as file:
        stream = file.read()
    return stream


def generate_stop_words(stop_words_file):
    with open(stop_words_file, 'r') as file:
        stop_words = file.read().split('\n')
    return stop_words


def main(linus_name, stopwords_file):
    stream = generate_linus(linus_name)
    stop_words = generate_stop_words(stopwords_file)

    # Convert to a flat list of all words
    lines = stream.split('\n')
    line_words = [
        line.split(' ') for line in lines
    ]
    words = [word for lines in line_words for word in lines]

    # Lowercase all items in list.
    lower_cased_words = [
        word.lower() for word in words if type(word) == str
    ]

    # Remove all stop words and empty words
    cleaned_words = [
        strip_non_alphanumeric(word) for word in lower_cased_words if
        strip_non_alphanumeric(word) not in stop_words and
        strip_non_alphanumeric(word) != '' and
        word not in stop_words and
        word != ''
    ]

    frequencies = count_frequency(cleaned_words)
    top_twenty_five = get_top_frequencies(frequencies)[:25]

    # Pretty print those bitches
    for i, word in enumerate(top_twenty_five):
        print(
            '#%d - "%s", %s occurrences' % (
                i + 1, word[0], word[1]
            )
        )


if __name__ == '__main__':
    # Use try to cover misuse of program as we want actual errors to be seen.
    try:
        main(sys.argv[1], sys.argv[2])
    except IndexError:
        print(
            'Arguments are invalid,'
            ' please specify insults.txt and stopwords.txt'
        )
        sys.exit(1)
    except IOError:
        print('No file found')
        sys.exit(1)
