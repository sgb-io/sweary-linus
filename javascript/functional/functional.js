module.exports = function main(insults, stopWords) {
    const words = []
    const rawWords = insults.split(' ')

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
    const wordCounts = {}
    words.forEach((word) => {
        if (wordCounts.hasOwnProperty(word)) {
            wordCounts[word]++
            return
        }

        wordCounts[word] = 1
    })
    const unsortedWordCounts = []
    Object.keys(wordCounts).forEach((word) => {
        unsortedWordCounts.push({
            word,
            count: wordCounts[word]
        })
    })

    // Finally, print out the 25 most common words in order
    const sortedWordCounts = unsortedWordCounts.sort((a, b) => {
        return b.count - a.count
    })
    const topWords = sortedWordCounts.slice(0, 25)
    topWords.forEach((topWord, index) => {
        const rank = index + 1
        console.log(`#${rank} - "${topWord.word}", ${topWord.count} occurrences`)
    })

    return topWords
}