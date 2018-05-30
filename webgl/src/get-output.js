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
 * Removes non-english characters from a string.
 * NOTE: Only the basic english alphabet is supported (a-z).
 * 
 * @param  {String} word e.g. "sh*t!"
 * 
 * @return {String} e.g. "sht"
 */
function removeNonEnglishLetters(word) {
    const englishLetters = word.match(/[a-z]/g)

    return (englishLetters)
        ? englishLetters.reduce((a, b) => (a + b))
        : ''
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
 * @return {Array<String>} output lines to be printed e.g.
 * [
 *     '#1 - "just", 196 occurrences',
 *     '#2 - "crap", 120 occurrences',
 *     '#3 - "code", 113 occurrences',
 *     ...
 * ]
 */
function main(insults, stopWords) {
    const sentences = []
    const rawWords = getRawWords(insults)
    const words = processWords(rawWords, stopWords.split('\n'))
    const unsortedWordCounts = getWordCounts(words)

    // Print out the 25 most common words in order
    // Sort by count, then alphabetical.
    const topWords = unsortedWordCounts
        .sort((a, b) => {
            if (b.count !== a.count) {
                return b.count - a.count
            }
            return a.word < b.word ? -1 : 1
        })
        .slice(0, 25)

    topWords.forEach((topWord, index) => {
        const rank = index + 1
        const sentence = `#${rank} - "${topWord.word}", ${topWord.count} occurrences`
        sentences.push(sentence)
    })

    return sentences
}

export default main
