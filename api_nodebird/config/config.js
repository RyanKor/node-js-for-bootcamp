require("dotenv").config();
//config.json -> config.js로 파일 변경
// 변경 목적 : JSON은 변수를 활용하지 못한다는 단점이 있다.
// SEQUELIZE는 JSON 말고도 JS 사용할 수 있게 지원한다
module.exports = {
  development: {
    username: "root",
    password: process.env.SEQUELIZE_PASSWORD,
    database: "nodebird",
    host: "127.0.0.1",
    dialect: "mysql",
    operatorsAliases: "false",
  },
  production: {
    username: "root",
    password: process.env.SEQUELIZE_PASSWORD,
    database: "nodebird",
    host: "127.0.0.1",
    dialect: "mysql",
    operatorsAliases: "false",
    logging: false, //배포할 때 콘솔창에 어떤 SQL문이 실행되는지 출력되면 안되므로, 배포환경에서는 로깅을 숨긴다.
  },
};
