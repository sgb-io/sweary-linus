# WebAssembly

Rather than an independent, this version of Sweary Linus is a port of the C++ implementation, compiled for the web via WebAssembly!

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

Note that `main.cpp` and the two text files should be in the same dir for it to work. An easy way is to temporarily copy `main.cpp` into this dir then run the above command.

Note that C++ 11 is enabled (I used 1 feature, a lambda)
