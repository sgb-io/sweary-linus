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

fn get_insults() -> (String) {
    let insults = "../insults.txt".to_string();
    return get_file_contents(insults);
}


fn get_stopwords() -> (String) {
    let stopwords = "../stopwords.txt".to_string();
    return get_file_contents(stopwords);
}

// This is the main function
fn main() {
	let insults = get_insults();
    let stopwords = get_stopwords();
	print!("insults: {:?}", insults);
    print!("stopwords: {:?}", stopwords);
}