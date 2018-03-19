const fs = require('fs')
const main = require('./functional')

const insults = fs.readFileSync('../../insults.txt', 'utf8')
const stopWords = fs.readFileSync('../../stopwords.txt', 'utf8')
    .split('\n')

const topWords = main(insults, stopWords) // Will print result to console

const expectedTopWords = [
    { word: 'just', count: 196 },
    { word: 'dont', count: 127 },
    { word: 'crap', count: 108 },
    { word: 'code', count: 108 },
    { word: 'wrong', count: 79 },
    { word: 'really', count: 79 },
    { word: 'stop', count: 78 },
    { word: 'like', count: 71 },
    { word: 'even', count: 70 },
    { word: 'im', count: 68 },
    { word: 'stupid', count: 65 },
    { word: 'fcking', count: 63 },
    { word: 'make', count: 58 },
    { word: 'people', count: 58 },
    { word: 'broken', count: 55 },
    { word: 'thats', count: 53 },
    { word: 'patch', count: 52 },
    { word: 'think', count: 50 },
    { word: 'thing', count: 48 },
    { word: 'pure', count: 46 },
    { word: 'can', count: 44 },
    { word: 'shit', count: 44 },
    { word: 'idiotic', count: 41 },
    { word: 'whole', count: 41 },
    { word: 'fix', count: 41 },
]

if (JSON.stringify(topWords) === JSON.stringify(expectedTopWords)) {
    console.log('Test passed!')
    return
}

throw new Error('Test failed!')