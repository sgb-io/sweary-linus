# WebAssembly

Rather than an implementation, this version of Sweary Linus is a port of the C++ implementation, compiled for the web via WebAssembly!

## Install it

First, you need emscripten to compile to wasm. I followed the steps on https://webassembly.org/getting-started/developers-guide/ -

```
$ git clone https://github.com/juj/emsdk.git
$ cd emsdk
$ ./emsdk install latest
$ ./emsdk activate latest
```

Then

`$ source ./emsdk_env.sh`

Which should mean you now have `emcc` available. Now you can compile stuff to wasm.

## Run it

From this directory:

`$ emrun --no_browser --port 8080 .`

Then browse to `http://localhost:8080/main.html`.

## Compiling it from scratch

Install deps as above, then, something like:

`$ emcc -std=c++11 main.cpp -s WASM=1 --preload-file insults.txt --preload-file stopwords.txt -o main.html`

Notes:

- `main.cpp` and the two text files should be in the same dir for it to work. An easy way is to temporarily copy all of them into this dir then run the above command.
- C++ 11 is required (I used 1 feature, a lambda), it's enabled using the `-std=c++11` flag (see command above)
- The C++ program expects you to pass 2 args, i.e. paths to the 2 text files to work. Emscripten provides a virtual filesystem to make this work. I added 2 lines in the generated `main.js` @ L222 to inject `insults.txt` and `stopwords.txt` as the 2 args in the browser.
