library(tm)

# Point to insults & stopwords files
insults_filename <- "insults.txt"
stopwords_filename <- "stopwords.txt"

# Function that accepts a list of raw (un-separated) lines, returns a list of words
get_words_from_file <- function(rawLines, wordList) {
    lines <- strsplit(rawLines, "\n")
    n <- 1
    for (line in unlist(lines)) {
        # Split each line into a list of words
        line_words <- strsplit(as.character(line), " ")
        for (word in unlist(line_words)) {
            # Add each word into the "raw" list
            wordList[[n]] <- word
            n <- n + 1
        }
    }

    return(wordList)
}

clean_words <- function(raw_words) {
    cleaned_words <- list()
    i <- 1
    for (word in raw_words) {
        clean <- remove_non_alphanumeric(tolower(word))
        if (clean != '') {
            cleaned_words[[i]] <- clean
        }
        i <- i + 1
    }

    return(cleaned_words)
}

# Function that removes non-alphanumeric characters from a string
# e.g. "sh*t!" --> "sht"
remove_non_alphanumeric <- function(str) {
    stripped <- gsub("[^a-z]", "", str)
    return(stripped)
}

remove_stopwords <- function(clean_insults, clean_stopwords) {
    non_stopwords <- list()
    i <- 1
    for (word in clean_insults) {
        find_stopword <- word %in% clean_stopwords
        if (length(word) > 0 && !find_stopword) {
            non_stopwords[[i]] <- word
            i <- i + 1
        }
    }

    return(non_stopwords)
}

# Read insults & stopwords as raw lines (not a table or other 2D structure)
insults_txt <- file(insults_filename, encoding="UTF8")
insults <- readLines(insults_txt)
stopwords_txt <- file(stopwords_filename, encoding="UTF8")
stopwords <- readLines(stopwords_txt)

# Get raw insult & stopword words
raw_insult_words <- get_words_from_file(insults, list())
raw_stopword_words <- get_words_from_file(stopwords, list())

# Clean insult & stopword words
# i.e. make lower-case, remove non-alphanumerics, remove empty words
clean_insults <- clean_words(raw_insult_words)
clean_stopwords <- clean_words(raw_stopword_words)

# Remove stopwords from the clean insults
valid_insults <- remove_stopwords(clean_insults, clean_stopwords)

# Use the TM library to create a Corpus of words
as_corp <- Corpus(VectorSource(valid_insults))
as_terms <- DocumentTermMatrix(as_corp)
as_matrix <- as.matrix(as_terms)

# Count & sort the words
frequency <- colSums(as_matrix)
sorted <- sort(frequency, decreasing=TRUE)
top_list <- head(sorted, 25)

# Output the words
print(top_list)