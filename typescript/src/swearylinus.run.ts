import fs from 'fs'
import swearyLinus from './swearylinus'

const insults = fs.readFileSync(`${__dirname}/../../insults.txt`, 'utf8')
const stopWords = fs.readFileSync(`${__dirname}/../../stopwords.txt`, 'utf8')
const output = swearyLinus(insults, stopWords)