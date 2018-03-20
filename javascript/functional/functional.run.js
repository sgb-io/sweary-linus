const fs = require('fs')
const main = require('./functional')

const insults = fs.readFileSync('./../../insults.txt', 'utf8')
const stopWords = fs.readFileSync('./../../stopwords.txt', 'utf8')
const topWords = main(insults, stopWords) // Will print result to console

const expectedTopWords = [
    { word: 'just', count: 196 },
    { word: 'dont', count: 130 },
    { word: 'crap', count: 120 },
    { word: 'code', count: 113 },
    { word: 'wrong', count: 86 },
    { word: 'stop', count: 85 },
    { word: 'really', count: 84 },
    { word: 'stupid', count: 76 },
    { word: 'like', count: 71 },
    { word: 'even', count: 70 },
    { word: 'im', count: 69 },
    { word: 'fcking', count: 63 },
    { word: 'people', count: 61 },
    { word: 'thats', count: 60 },
    { word: 'make', count: 58 },
    { word: 'broken', count: 56 },
    { word: 'patch', count: 52 },
    { word: 'think', count: 50 },
    { word: 'shit', count: 49 },
    { word: 'thing', count: 48 },
    { word: 'pure', count: 46 },
    { word: 'can', count: 44 },
    { word: 'things', count: 44 },
    { word: 'whole', count: 41 },
    { word: 'idiotic', count: 41 }
]

if (JSON.stringify(topWords) === JSON.stringify(expectedTopWords)) {
    console.log('Test passed!')
    return
}

throw new Error('Test failed!')