#!/usr/bin/env python
import sys


def strip_non_alphanumeric(str):
    # lambda for finding if char is dirty or not
    is_char_ok = lambda c: (
        ord(c) == 32 or  # char is a space
        ord(c) in range(48, 58) or  # char is a number
        ord(c) in range(65, 91) or  # char is upper case
        ord(c) in range(97, 123)  # char is lower case
    )
    return ''.join([c for c in str if is_char_ok(c)])


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


def get_top_frequencies(frequencies_as_dict):
    # Easier to order a list.
    return sorted(
        [[key, frequencies_as_dict[key]] for key in frequencies_as_dict.keys()],
        key=lambda i: -i[1]
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
    clean = strip_non_alphanumeric(stream)  # clean out characters
    clean_to_list = clean.split(' ')  # split str to list

    # Lowercase all items in list.
    normalised_list = [
        item.lower() for item in clean_to_list if type(item) == str
    ]

    # Remove all stop words and empty words
    no_stop_words = [
        word for word in normalised_list if
        word not in stop_words and
        word != ''
    ]

    frequencies = count_frequency(no_stop_words)
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
