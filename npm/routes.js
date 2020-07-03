const fs = require("fs");
const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title> My first Page </title> </head>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='message'><button type='submit'>Send</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      // const body는 재선언(declaration)이 안된다는거지, 변수값 변경은 가능하다.
      console.log(chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      // Buffer 객체는 사용법이 어떻게 되지?
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      // writeFileSync는 사용법이 어떻게 되는건가?
      fs.writeFileSync("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
    // fs.writeFileSync("message.txt", "DUMMY");
  }
  //   req 내부에 url, method(POST, GET 등), headers에 담긴 값을 콘솔에 출력
  //   process.exit();
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title> My first Page </title> </head>");
  res.write("<body><h1> Node.js </h1> </body>");
  res.write("</html>");
  res.end();
};

module.exports = {
  handler: requestHandler,
  someText: "Some hard code text",
};
