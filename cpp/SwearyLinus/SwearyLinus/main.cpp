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
#include <map>
#include <set>

using namespace std;

typedef std::function<bool(std::pair<std::string, int>, std::pair<std::string, int>)> Comparator;

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

bool is_stopword(std::vector<std::string> &stopwords, std::string &word)
{
    for (vector<string>::iterator t=stopwords.begin(); t!=stopwords.end(); ++t)
    {
        if (*t == word) {
            return true;
        }
    }

    return false;
}

bool is_letter(char c)
{
    bool is_digit = std::isdigit(c);
    bool is_nonalpha = std::isalnum(c);
    
    return is_digit == false && is_nonalpha == false;
}

// Iterate letters and only keep the ones that pass is_letter
std::string remove_non_letters(std::string &word)
{
    std::string new_string;
    
    for(std::string::iterator s = word.begin(); s != word.end(); ++s)
    {
        if (is_letter(*s) == false)
        {
            new_string += *s;
        }
    }
    
    return new_string;
}

std::vector<std::string> remove_non_letters_from_words(std::vector<std::string> &words)
{
    std::vector<std::string> letters_only_words;
    for (vector<std::string>::iterator t=words.begin(); t!=words.end(); ++t)
    {
        letters_only_words.push_back(remove_non_letters(*t));
    }
    
    return letters_only_words;
}

std::vector<std::string> remove_stopwords(std::vector<std::string> &words, std::vector<std::string> &stopwords)
{
    std::vector<std::string> non_stopword_insults;
    
    // Dupe stopwords but with non-letters removed, to catch all stopword cases
    std::vector<std::string> stopwords_alt;
    stopwords_alt = remove_non_letters_from_words(stopwords);
    
    for (vector<string>::iterator t=words.begin(); t!=words.end(); ++t)
    {
        bool is_non_stopword;
        bool is_not_blank;
        is_non_stopword = is_stopword(stopwords, *t) == false && is_stopword(stopwords_alt, *t) == false;
        is_not_blank = (*t != "");
        
        if (is_non_stopword == true && is_not_blank == true)
        {
            non_stopword_insults.push_back(*t);
        }
    }
    
    return non_stopword_insults;
}

std::map<std::string, int> count_insults(std::vector<std::string> &insults)
{
    std::map<std::string, int> counts;
    for (int i = 0; i < insults.size(); i++) {
        counts[insults[i]]++;
    }
    
    return counts;
}

std::set<std::pair<std::string, int>, Comparator> sort_insults(std::map<std::string, int> &insults)
{
    typedef std::function<bool(std::pair<std::string, int>, std::pair<std::string, int>)> Comparator;
    
    // Comparator function to sort by occurences, then word (alphabetical)
    Comparator compFunctor =
    [](std::pair<std::string, int> elem1 ,std::pair<std::string, int> elem2)
    {
        if (elem1.second < elem2.second) return false;
        if (elem2.second < elem1.second) return true;
        
        if (elem1.first < elem2.first) return true;
        if (elem2.first < elem1.first) return false;
        
        return false;
    };
    
    // Execute the sort
    std::set<std::pair<std::string, int>, Comparator> sorted(insults.begin(), insults.end(), compFunctor);
    
    return sorted;
}

int main(int argc, const char * argv[]) {
    // Parse args
    if (argc < 3) {
        std::cerr << "Incorrect number of arguments. Example usage: " << "./SwearyLinus ../../insults.txt ../../stopwords.txt" << std::endl;
        return 1;
    }
    
    // Open insults and stopwords, retrieve as strings
    std::string insults;
    std::string stopwords;
    insults = get_file_contents(argv[1]);
    stopwords = get_file_contents(argv[2]);
    
    if (!insults.empty() && !stopwords.empty()) {
        // Break insults and stopwords into lines
        std::vector<std::string> insult_words;
        insult_words = break_into_words(insults);
        std::vector<std::string> stopwords_words;
        stopwords_words = break_into_words(stopwords);
        
        // Lower case insults (assume stopwords are lower)
        std::vector<std::string> lower_case_insults;
        lower_case_insults = lower_case_words(insult_words);
        
        // Remove non-alphanumerics
        std::vector<std::string> only_letters;
        only_letters = remove_non_letters_from_words(lower_case_insults);
        
        // Remove stopwords and non-letters from insults
        std::vector<std::string> without_stopwords;
        without_stopwords = remove_stopwords(only_letters, stopwords_words);
        
        // Count the insults
        std::map<std::string, int> counted_insults;
        counted_insults = count_insults(without_stopwords);
        
        // Sort counted_insults
        std::set<std::pair<std::string, int>, Comparator> sorted_insults;
        sorted_insults = sort_insults(counted_insults);
        
        // Convert the sorted insults back into a vector
        std::vector<std::pair<std::string, int>> sorted_insults_vec;
        std::copy(sorted_insults.begin(), sorted_insults.end(), std::back_inserter(sorted_insults_vec));
        
        // Print the top 25
        for (vector<std::pair<std::string, int>>::iterator t=sorted_insults_vec.begin(); t!=sorted_insults_vec.end(); ++t)
        {
            std::pair<std::string, int> current_item;
            current_item = *t;
            long index;
            index = std::distance(sorted_insults_vec.begin(), t);
            if (index < 25)
            {
                cout << "#" << (index + 1) << " - \"" << current_item.first << "\", " << current_item.second  << " occurrences" << endl;
            }
        }

        return 0;
    }

    std::cout << "Something went wrong!\n";
    return 1;
}
