// Objects

export interface WordCount {
	word: string,
	count: number,
}

// Functions

export interface SwearyLinus {
	(insults: string, stopWords: string): void
}

export interface LinesToWords {
	(rawText: string): Array<string>
}

export interface TransformWord {
	(word: string): string
}

export interface CountWords {
	(words: Array<string>): Array<WordCount>
}

export interface ProcessWords {
	(insults: Array<string>, stopWords: Array<string>): Array<string>
}