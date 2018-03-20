function getRawWords(insults) {
    const lines = insults.split('\n')

    return lines
        .map((lineWords) => {
            return lineWords
                .split(' ')
                .map(lineWord => lineWord)
        })
        .reduce((a, b) => {
            return a.concat(b)
        })
}

function normaliseRawWord(rawWord) {
    return rawWord.toLowerCase()
}

function removeAlphanumeric(word) {
    return word.replace(/\W/g, '')
}

function processWords(rawWords, stopWords) {
    const words = []

    rawWords.forEach((rawWord) => {
        // Normalize (down-case) every word
        const rawWordLower = normaliseRawWord(rawWord)
        const alphanumeric = removeAlphanumeric(rawWordLower)

        // Exclude non-alphanumeric characters
        if (alphanumeric === '') {
            return
        }

        // Exclude stop words
        if (stopWords.includes(alphanumeric)) {
            return
        }

        words.push(alphanumeric)
    })

    return words
}

function getWordCounts(words) {
    const wordCounts = {}

    // Count the occurrences of all words
    words.forEach((word) => {
        if (wordCounts.hasOwnProperty(word)) {
            wordCounts[word] += 1
            return
        }

        wordCounts[word] = 1
    })

    return Object.keys(wordCounts)
        .map((word) => {
            return {
                word,
                count: wordCounts[word],
            }
        })
}

function main(insults, stopWords) {
    const rawWords = getRawWords(insults)
    const words = processWords(rawWords, stopWords)
    const unsortedWordCounts = getWordCounts(words)

    // Print out the 25 most common words in order
    const topWords = unsortedWordCounts
        .sort((a, b) => (b.count - a.count))
        .slice(0, 25)

    topWords.forEach((topWord, index) => {
        const rank = index + 1
        console.log(
            `#${rank} - "${topWord.word}", ${topWord.count} occurrences`
        )
    })

    return topWords
}

module.exports = main
