/**
 * Accepts a line-delimited list of sentences and converts into
 * individual words.
 * 
 * @param  {String} insults e.g. "This code is total crap!\nFoo bar."
 * 
 * @return {Array} e.g. ["This", "code", "is", "total", "crap!", "Foo", "bar"]
 */
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

/**
 * "Normalize" a word, which in this case converts to lowercase.
 *
 * @param  {String} rawWord e.g. "Crap"
 * 
 * @return {String} e.g. "crap"
 */
function normaliseRawWord(rawWord) {
    return rawWord.toLowerCase()
}

/**
 * Removes non-alphanumeric characters from a string.
 * 
 * @param  {String} word e.g. "sh*t!"
 * 
 * @return {String} e.g. "sht"
 */
function removeAlphanumeric(word) {
    return word.replace(/\W/g, '')
}

/**
 * Generates a new list of words, normalized, with alphanumeric,
 * stop words and blank strings removed.
 * 
 * @param  {Array} rawWords  e.g. ["and", "crap", "", "ok!"]
 * @param  {Array} stopWords e.g. ["and", "or", "but"]
 * 
 * @return {Array} e.g. ["crap", "ok"]
 */
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

/**
 * Generates an array of objects that contains
 * words and their number of occurences.
 * 
 * @param  {Array} words e.g. ["foo", "crap", "bar", "crap"]
 * 
 * @return {Array} e.g.
 * [
 *     {
 *         word: "foo",
 *         count: 1,
 *     },
 *     {
 *         word: "crap",
 *         count: 2,
 *     },
 *     {
 *         word: "bar",
 *         count: 1,
 *     }
 * ]
 */
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

/**
 * The main program.
 * 
 * Gets the top 25 most common words found in Linus Torvalds insults,
 * logs to console and returns an array.
 * 
 * @param  {String} insults e.g. "This code is total crap!\nFoo bar."
 * @param  {String} stopWords e.g. "and\nor\nbut\nif\nare\nbe" etc
 * 
 * @return {Array} e.g.
 * [
 *     { word: 'just', count: 196 },
 *     { word: 'dont', count: 130 },
 *     { word: 'crap', count: 120 },
 *     ...
 * ]
 */
function main(insults, stopWords) {
    const rawWords = getRawWords(insults)
    const words = processWords(rawWords, stopWords.split('\n'))
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
