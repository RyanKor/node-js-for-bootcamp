const { createLogger, format, transports } = require("winston");

const logger = createLogger({
  level: "info", // 로그의 심각도를 의미함. error, war, info, verbose, debug, silly가 있음. error가 제일 심각한 단계
  //   info를 고르면, error, war 등의 더 위험한 단계도 로그에 함께 표기되어 활용가능
  format: format.json(), //로그가 입력되는 형식을 지정할 수 있음. label, timestamp, printf, simple, combine 등이 있음
  transports: [
    new transports.File({ filename: "combined.log" }),
    new transports.File({ filename: "error.log", level: "error" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(new transports.Console({ format: format.simple() }));
}

module.exports = logger;
