const fs = require('fs')
const main = require('./functional')

const insults = fs.readFileSync('./../../insults.txt', 'utf8')
const stopWords = fs.readFileSync('./../../stopwords.txt', 'utf8')
const output = main(insults, stopWords) // Array<String> - output lines
const expectedTopWords = fs.readFileSync('./output.txt', 'utf8')

// Print the program's output
output.map((line) => {
    return console.log(line)
})

const expectedOutputLines = expectedTopWords.split('\n')
const expectedOutputText = expectedOutputLines.reduce((a, b) => (a + b))
const receivedOutputText = output.reduce((a, b) => (a + b))

if (expectedOutputText === receivedOutputText) {
    // Program generated expected output
    return
}

throw new Error('Program did not generate expected output')