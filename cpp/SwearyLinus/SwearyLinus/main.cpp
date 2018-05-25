//
//  main.cpp
//  SwearyLinus
//
//  Created by Sam Brown on 04/05/2018.
//  Copyright © 2018 Sam Brown. All rights reserved.
//

#include <iostream>
#include <fstream>
#include <string>
#include <cerrno>
#include <vector>

using namespace std;

std::string get_file_contents(const char *filename)
{
    std::ifstream in(filename, std::ios::in | std::ios::binary);
    if (in)
    {
        std::string contents;
        in.seekg(0, std::ios::end);
        contents.resize(in.tellg());
        in.seekg(0, std::ios::beg);
        in.read(&contents[0], contents.size());
        in.close();
        return(contents);
    }
    throw(errno);
}

std::vector<std::string> split(const std::string &text, std::string delim) {
    std::vector<std::string> tokens;
    std::size_t start = 0, end = 0;
    while ((end = text.find(delim, start)) != std::string::npos) {
        if (end != start) {
            tokens.push_back(text.substr(start, end - start));
        }
        start = end + 1;
    }
    if (end != start) {
        tokens.push_back(text.substr(start));
    }
    return tokens;
}

std::vector<std::string> break_into_words(const std::string &text) {
    std::vector<std::string> lines;
    lines = split(text, "\n");
    
    std::vector<std::string> words;
    for (vector<string>::iterator t=lines.begin(); t!=lines.end(); ++t)
    {
        std::vector<std::string> line_words;
        line_words = split(*t, " ");
        for (vector<string>::iterator i=line_words.begin(); i!=line_words.end(); ++i)
        {
            words.push_back(*i);
        }
    }
    
    return words;
}

std::vector<std::string> lower_case_words(std::vector<std::string> &words)
{
    std::vector<std::string> lower_cased_words;
    for (vector<string>::iterator t=words.begin(); t!=words.end(); ++t)
    {
        std::string data;
        data = *t;
        std::transform(data.begin(), data.end(), data.begin(), ::tolower);
        lower_cased_words.push_back(data);
    }
    
    return lower_cased_words;
}

std::vector<std::string> remove_stopwords(std::vector<std::string> &words, std::vector<std::string> &stopwords)
{
    std::vector<std::string> non_stopword_insults;
    
    // TODO iterate words, exclude stopwords
    
    return non_stopword_insults;
}

int main(int argc, const char * argv[]) {
    // Open insults and stopwords, retrieve as strings
    std::string insults;
    std::string stopwords;
    insults = get_file_contents("insults.txt");
    stopwords = get_file_contents("stopwords.txt");
    
    if (!insults.empty() && !stopwords.empty()) {
        // Break insults and stopwords into lines
        std::vector<std::string> insult_words;
        insult_words = break_into_words(insults);
        std::vector<std::string> stopwords_words;
        stopwords_words = break_into_words(stopwords);
        
        // Lower case insults (assume stopwords are lower)
        std::vector<std::string> lower_case_insults;
        lower_case_insults = lower_case_words(insult_words);
        
        // Remove stopwords and non-letters from insults
        // TODO
        
        std::cout << "Finished!\n";
        return 0;
    }

    std::cout << "Something went wrong!\n";
    return 1;
}
