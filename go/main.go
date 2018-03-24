package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"sort"
	"strings"
	"unicode"
    "strconv"
)

type WordOccurences struct {
	Word       string
	Occurences int
}

func splitRawInsults(rawInsults string) []string {
	var words []string
	var lines = strings.Split(rawInsults, "\n")
	for _, line := range lines {
		var lineWords = strings.Split(line, " ")
		for _, word := range lineWords {
			words = append(words, word)
		}
	}

	return words
}

func isStopWord(stopWords []string, word string) bool {
	for _, stopWord := range stopWords {
		var cleanStopWord = strings.TrimSpace(stopWord)
		if cleanStopWord == word {
			return true
		} else {
		}
	}
	return false
}

func normaliseRawWord(word string) string {
	return strings.ToLower(word)
}

func removeAlphanumeric(word string) string {
	var newWord = ""
	for _, letter := range word {
		if unicode.IsLetter(letter) {
			newWord = newWord + string(letter)
		}
	}

	return newWord
}

func processWords(rawInsults []string, stopWords []string) []string {
	var words []string

	for _, word := range rawInsults {
		var lower = normaliseRawWord(word)
		var clean = removeAlphanumeric(lower)

		if clean == "" {
			continue
		}

		if isStopWord(stopWords, clean) {
			continue
		}

		words = append(words, clean)
	}

	return words
}

func countWords(words []string) map[string]int {
	var counts = map[string]int{}
	for _, word := range words {
		counts[word]++
	}

	return counts
}

func sortWords(countedWords map[string]int) []WordOccurences {
	var sorted []WordOccurences
	for word, occurences := range countedWords {
		sorted = append(sorted, WordOccurences{word, occurences})
	}

	sort.Slice(sorted, func(i, j int) bool {
		return sorted[i].Occurences > sorted[j].Occurences
	})

	return sorted
}

func main() {
	rawInsults, err := ioutil.ReadFile("../insults.txt")
	if err != nil {
		log.Fatal(err)
	}

	rawStopWords, err := ioutil.ReadFile("../stopwords.txt")
	if err != nil {
		log.Fatal(err)
	}

	// Turn stopwords and insults into arrays of words
	var stopWords = strings.Split(string(rawStopWords), "\n")
	var insults = splitRawInsults(string(rawInsults))

	// Strip non-alphanumeric characters, lowercase &
	// remove blank words
	var words = processWords(insults, stopWords)

	// Count the occurences of each word
	var unsortedWordCounts = countWords(words)
	var sortedWordCounts = sortWords(unsortedWordCounts)
	var topWords = sortedWordCounts[0:25]
	
    // Print 'em out!
    for i, word := range topWords {
        var count = strconv.Itoa(word.Occurences)
        var rank = strconv.Itoa(i + 1)
        var sentence = fmt.Sprintf("#%s - \"%s\", %s occurrences", rank, word.Word, count)
        fmt.Println(sentence)
    }
}
