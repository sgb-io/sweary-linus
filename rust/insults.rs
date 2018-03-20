use std::error::Error;
use std::fs::File;
use std::io::prelude::*;
use std::path::Path;

fn get_file_contents(file_path: String) -> (String) {
    // Create a path to the desired file
    let path = Path::new(&file_path);
    let display = path.display();

    // Open the path in read-only mode, returns `io::Result<File>`
    let mut file = match File::open(&path) {
        // The `description` method of `io::Error` returns a string that
        // describes the error
        Err(why) => panic!("couldn't open {}: {}", display,
                                                   why.description()),
        Ok(file) => file,
    };

    // Read the file contents into a string, returns `io::Result<usize>`
    let mut s = String::new();
    return match file.read_to_string(&mut s) {
        Err(why) => panic!("couldn't read {}: {}", display,
                                                   why.description()),
        Ok(_) => s,
    };
}

fn get_raw_words() -> (Vec<String>) {
    let insults = "../insults.txt".to_string();
    let raw_insults = get_file_contents(insults);

    let mut raw_words = Vec::new();
    raw_insults
        .split('\n')
        .for_each(|line|
            line.split(' ')
                .for_each(|word|
                    raw_words.push(word.to_string())
                )
        );

    return raw_words;
}


fn get_stopwords() -> (Vec<String>) {
    let stopwords = "../stopwords.txt".to_string();
    let raw_stopwords = get_file_contents(stopwords);

    let mut raw_words = Vec::new();
    raw_stopwords
        .split('\n')
        .for_each(|line|
            raw_words.push(line.to_string())
        );

    return raw_words;
}

fn remove_non_alphanumeric(word: String) -> (String) {
    return word
        .chars()
        .filter(|c| c.is_alphanumeric())
        .collect();
}

fn process_words(
    raw_words: Vec<String>,
    stopwords: Vec<String>,
) -> (Vec<String>) {
    let mut words = Vec::new();

    // Lowercase words & remove non-alphanumeric characters
    for word in raw_words {
        words.push(
            remove_non_alphanumeric(word.to_lowercase())
        )
    };

    // Remove stop words & blank words
    words.retain(|word| !stopwords.contains(word) || word == "");

    return words;
}

// This is the main function
fn main() {
    let raw_words = get_raw_words();
    let stopwords = get_stopwords();
    // print!("raw_words: {:?}", raw_words);
    print!("\n");
    print!("\n");
    print!("\n");
    // print!("stopwords: {:?}", stopwords);

    let words = process_words(raw_words, stopwords);
    print!("words: {:?}", words);
}