module.exports = function main(insults, stopWords) {
    const lines = insults.split('\n')
    const words = []
    const rawWords = []
    const wordCounts = {}
    const unsortedWordCounts = []
    let topWords = []

    // Split into lines, then words
    lines.forEach((line) => {
        const lineWords = line.split(' ')
        lineWords.forEach((lineWord) => {
            rawWords.push(lineWord)
        })
    })

    rawWords.forEach((rawWord) => {
        // Normalize (down-case) every word
        const rawWordLower = rawWord.toLowerCase()
        const alphanumeric = rawWordLower.replace(/\W/g, '')

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

    // Count the occurrences of all words
    words.forEach((word) => {
        if (wordCounts.hasOwnProperty(word)) {
            wordCounts[word] += 1
            return
        }

        wordCounts[word] = 1
    })
    
    Object.keys(wordCounts).forEach((word) => {
        unsortedWordCounts.push({
            word,
            count: wordCounts[word],
        })
    })

    // Finally, print out the 25 most common words in order
    topWords = unsortedWordCounts
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
