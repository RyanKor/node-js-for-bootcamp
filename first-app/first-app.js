// 이 코드를 알면서도 내가 따라치는 이유
// 마음 속에 자만심을 버리자. 이 한 줄이 쌓여서 내개 큰 자신이 될 것이다.
console.log("Hello from Node.js");

const fs = require("fs");
fs.writeFileSync("hello.txt", "hello from Node.js");
`
function writeFileSync(path: string | number | Buffer | URL, data: any, options?: WriteFileOptions): void
Synchronously writes data to a file, replacing the file if it already exists.

@param path 파일이 저장될 경로 지정이 가능하다.
A path to a file. If a URL is provided, it must use the file: protocol. URL support is experimental. If a file descriptor is provided, the underlying file will not be closed automatically.

지정된 경로에 저장될 파일의 이름
@param data — The data to write. If something other than a Buffer or Uint8Array is provided, the value is coerced to a string.

@param options
Either the encoding for the file, or an object optionally specifying the encoding, file mode, and flag. If encoding is not supplied, the default of 'utf8' is used. If mode is not supplied, the default of 0o666 is used. If mode is a string, it is parsed as an octal integer. If flag is not supplied, the default of 'w' is used.
`;
