//
//  main.cpp
//  SwearyLinus
//
//  Created by Sam Brown on 04/05/2018.
//  Copyright © 2018 Sam Brown. All rights reserved.
//

#include <iostream>
#include <fstream>
using namespace std;

int main(int argc, const char * argv[]) {
    // Open insults and stopwords
    ifstream insults;
    ifstream stopwords;
    insults.open ("../../insults.txt");
    stopwords.open("../../stopwords.txt");
    
    if (insults.is_open() && stopwords.is_open()) {
        std::cout << "Finished!\n";
        insults.close();
        stopwords.close();
        return 0;
    }

    std::cout << "Something went wrong!\n";
    return 1;
}
