import {
	WordCount,
	SwearyLinus,
	LinesToWords,
	TransformWord,
	CountWords,
	ProcessWords,
} from './interfaces'

const linesToWords: LinesToWords = (rawText: string) => {
    return rawText.split('\n')
        .map((lineWords: string) => {
            return lineWords
                .split(' ')
                .map(lineWord => lineWord) // TODO is this line needed?
        })
        .reduce((a: Array<string>, b: Array<string>) => {
            return a.concat(b)
        })
}

const normaliseRawWord: TransformWord = (word: string) => {
    return word.toLowerCase()
}

const removeNonEnglishLetters: TransformWord = (word: string) => {
    const englishLetters = word.match(/[a-z]/g)

    return (englishLetters)
        ? englishLetters.reduce((a, b) => (a + b))
        : ''
}

const countWords: CountWords = (words: Array<string>) => {
    const wordCounts: any = {}

    // Count the occurrences of all words
    words.forEach((word: string) => {
        if (wordCounts.hasOwnProperty(word)) {
            wordCounts[word] += 1
            return
        }

        wordCounts[word] = 1
    })

    return Object.keys(wordCounts)
        .map((word: string) => {
            return {
                word,
                count: wordCounts[word],
            }
        })
}

const processWords: ProcessWords = (rawWords: Array<string>, stopWords: Array<string>) => {
    const words: Array<string> = []

    rawWords.forEach((rawWord: string) => {
        // Normalize (down-case) every word
        const rawWordLower = normaliseRawWord(rawWord)
        const englishLetters = removeNonEnglishLetters(rawWordLower)

        // Exclude non-alphanumeric characters
        if (englishLetters === '') {
            return
        }

        // Exclude stop words (Note - `stopWords` contains non-alphanumerics)
        if (stopWords.includes(rawWordLower) || stopWords.includes(englishLetters)) {
            return
        }

        words.push(englishLetters)
        return englishLetters
    })

    return words
}

const swearyLinus: SwearyLinus = (insults: string, stopWords: string) => {
    const rawInsults: Array<string> = linesToWords(insults)
    const rawStopWords: Array<string> = linesToWords(stopWords)
    const words: Array<string> = processWords(rawInsults, rawStopWords)
    const unsortedWordCounts: Array<WordCount> = countWords(words)

    // Print out the 25 most common words in order
    // Sort by count, then alphabetical.
    const topWords: Array<WordCount> = unsortedWordCounts
        .sort((a: WordCount, b: WordCount) => {
            if (b.count !== a.count) {
                return b.count - a.count
            }
            return a.word < b.word ? -1 : 1
        })
        .slice(0, 25)

    topWords.map((topWord: WordCount, index: number) => {
        const rank = index + 1
        const sentence = `#${rank} - "${topWord.word}", ${topWord.count} occurrences`
        return console.log(sentence)
    })
}

export default swearyLinus