module.exports = (sequelize, DataTypes) =>
  // models 오타 주의하기
  sequelize.define(
    "user",
    {
      email: {
        type: DataTypes.STRING(40),
        allowNull: true,
        unique: true,
      },
      nick: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      provider: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: "local",
      },
      snsId: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
// 사용자 정보 저장 - 이메일, 아이디, 비밀번호 및 sns로그인 저장
// timestamps & paranoid => createdAt, updatedAt, DeletedAt
/*
      charset: "utf8",
      collate: "utf8_general_ci",
      이 두개의 문장은 배포 시, 데이터베이스에서 한글 인지를 못하는 문제를 해결해준다.
*/
