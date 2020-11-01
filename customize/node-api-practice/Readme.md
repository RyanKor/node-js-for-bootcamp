# 웹 API 서버 구현하기

## 1. 구현하면서 발생했던 이슈

1. Node-API Follower DB에서 구현해놨던 내용에 관한 이슈

2. Node-API Sequelize 책 내용이 구버전이라, 관련 내용을 신버전으로 변경하는 이슈

3. Node-API Modern JS 적용 이슈 (CommonJS->ES6)

4. Node-call에서 CORS Error가 발생했던 이슈

5. /v2/token 404 Error 발생 이슈

## 2. 각 이슈별 대응 방향

1. Node-API Follower DB에서 구현해놨던 내용에 관한 이슈

-> 기존 DB Migrate 해 놓은 내용에서 오타를 발견했고, 이에 따라 오타를 수정했는데, DB에서 Field list에 관한 인식 오류 에러가 발생했다.

`수정 전) 오타가 발생한 부분`

```sql

db.User.belongsToMany(db.User, {
  foreignKey: "followerId",
  as: "Followers",
  through: "Follow",
});
db.User.belongsToMany(db.User, {
  foreignKey: "followingId",
  as: "Followings",
  through: "Follow",
});
```

`수정 후)`

```sql
db.User.belongsToMany(db.User, {
  foreignKey: "followerId",
  as: "Followings",
  through: "Follow",
});
db.User.belongsToMany(db.User, {
  foreignKey: "followingId",
  as: "Followers",
  through: "Follow",
});
```

해당 오류를 수정하고, `sequelize db:create`를 다시 진행했다 (기존 DB는 Drop)

2. Node-API Sequelize 책 내용이 구버전이라, 관련 내용을 신버전으로 변경하는 이슈

-> sequelize.org에 있는 공식 문서를 보면서 관련 메소드를 모두 최신으로 변경했다.

3. Node-API Modern JS 적용 이슈 (CommonJS->ES6)

-> `const uuidv4 = require('uuid/v4')`형태 호출이 구버전이라 에러가 발생

이에 따라 해결책을 구글에서 찾았고,

`import {v4 as uuidv4} from 'uuid'` 형태로 호출해야 사용 가능했음.

모듈이 업데이트된 부분을 호출할 때 반영하는 상황이 발생했었음.

4. Node-call에서 CORS Error가 발생했던 이슈

-> 이 프로젝트에서 핵심이 되는 사항을 이해를 못하고 있었는데,

[node-api image](./node-api.png)

위의 이미지에서 CORS Error를 방지할 페이지를 등록해야만, 아래 이미지에서 Cors Error가 발생하지 않는다.

[node-call image](./node-call.png)

Django를 사용할 땐, allowedhost 파트에 도메인만 입력하면 됐는데, node.js는 좀 더 세팅하는데 손이 많이 간다.

5. /v2/token 404 Error 발생 이슈

-> app.js에서 v2 페이지를 라우팅하지 않았다.
