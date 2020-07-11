## Node.js 교과서 학습 진행 상황

### Destructure에 대한 재조명 (2020.06.24)

- 자료형에 따라 Destructure를 활용할 때 유의할 부분이 있다.
- 예를 들어,

```javascript
// 1. 배열에 있는 요소를 destructure를 하고 싶을 때,
const arr = [1, 2, 3, 4, 5];
let [first, second] = arr;

// 2. 객체를 destructure를 하고 싶을 때,
const person = {
  name: "Ryan",
  age: 27,
  job: "web developer",
};

const { name, age } = person;
console.log(name, age); // ryan, 27
```

- 자료형을 잘 보고 받아와야한다. 그리고 꽤 자주 import {odd, even} from './file.js' 처럼 받아오는데 이는 file.js라는 JS 파일에서 특정 값을 export를 해주기 때문이다.

### 결국 한 줄로 웹 서버가 작동하는 로직을 설명해보면? (2020.06.24)

- Client -> Request -> Server -> Response -> Client

### Node.js와 Django의 다른 점, Node.js 교과서를 통해 배우는 학습 (2020.06.29)

- Django가 좋은 점은 초기에 세팅할 때 Django 라이브러리가 사용에 필요한 세팅을 알아서 해준다는 점
- 그러나 Node.js는 DB부터 Route, models까지 모두 사용자가 직접세팅해야한다는 단점이 있다.
- 물론 사용할 때는 Django가 편리할 수 있지만, Node.js를 사용하면 초기에 세팅하는 방법을 배우기 때문에 좀 더 로직에 대한 훈련이 될 수 있다.
- 음,,, 이거 초심자가 배우면 작살나겠는데?
- 앱개발할 때 서버를 DRF를 사용 안하고 Node.js를 사용하는 경우가 많다고 하던데 (SOPT라는 앱 개발 동아리를 3년 동안 참여했던 동생의 조언) 이 부분도 파고들어볼 필요가 있다.
- Node.js를 배워놓으면 아두이노, 라즈베리파이 등의 IoT의 서버 통신에도 자주 활용되서, 활용도가 용이하다.
- 이런 멋진 기회를 제공한 멋쟁이사자처럼에게 무한한 영광을...!

### express.js 사용하기

- 명령어 : express learn-express --view=pug
- Ejs를 사용할 경우 : npm i ejs 입력
- 여기서 pug는 django에서처럼 사용하는 노드 템플릿인데, 이전에는 Jade라고 불렸고, 다른 템플릿 중에는 ejs라는 것이 있다.
- express.js 분석하기
- 다만 현재 사용하는 express generator의 경우 ES5 문법을 사용하는데, 이보다 더 좋은 방식을 추후에 다시 배워서 기록할 예정이다.
- 1. bin/WWW

```javascript
#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require("../app"); //app.js 가져오기
var debug = require("debug")("learn-express:server"); //debug 모듈 가져오기
var http = require("http"); //http 모듈 가져오기

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || "3000"); //server가 실행될 포트를 지정한다.
app.set("port", port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app); // app 모듈이 createServer 메서드의 콜백 함수 역할을 한다.

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port); //기존에 Node.js 실습을 진행하는 부분과 내용은 동일하다.
server.on("error", onError);
server.on("listening", onListening);
```

### express.js에서 pug(이전에 Jade) 및 e.js 사용하기 (2020.07.02)

- 문법이 Django HTML과 90% 이상 동일해서 사실 크게 어려운 부분이 없었다.
- 현재 Node.js를 배우면서 유일하게 금방 따라간 내용이 아닌가 싶다.
- 괜히 e.js라는 것을 어렵게 생각했나 싶다.
- ROR을 배우다가 중간에 멈췄는데 (JS 풀스택 관련 업무로 인해) ROR과도 구조가 동일해서 한개의 프레임워크로 풀스택을 다루는 것은 대부분 그 구조나 패턴이 동일하다는 것을 느낀다.
- 이제 React - Node.js - MongoDB - Cloud (AWS, Azure 등)을 연결하는 패턴을 익히는거다.
- 새로운 언어와 프레임워크 배우는 게 이렇게 많은 깨달음을 줄 지 몰랐다.

---

### MySQL 연동을 진행하는 과정에서 발생한 문제 (2020.07.03)

- MySQL 커넥션 과정에서 Work Bench에서 Cannot Connect to Mysql server가 발생
- localhost에서 비밀번호를 재설정하니, 접속이 다시 진행되었음 (당연히 db서버는 켜놓은 상태여아함)
- Node.js에서 Mysql을 연동하려면, Sequelize라는 ORM 모듈을 사용해야한다.
- Django에서는 세팅이 다 되어 있는데, node에서는 수동으로 작업을 해줘야한다.

```mysql
// 사용자 정보를 생성하는 테이블
mysql> CREATE TABLE nodejs.users(
    -> id INT NOT NULL AUTO_INCREMENT, //id는 int형 자료형이며 빈칸을 허용하지 않는다 (not null, 자동 증가 설정 - AUTO_INCREMENT)
    -> name VARCHAR(20) NOT NULL, //name은 최대 20자며, 마찬가지로 빈칸 허용 안함
    -> age INT UNSIGNED NOT NULL, //UNSIGNED는 숫자형 자료형에 적용되는 옵션, 음수 무시하고 0부터 양수만(4294967295)까지 저장 가능
    -> married TINYINT NOT NULL,
    -> comment TEXT NULL, // 소개 내용은 빈값 허용
    -> created_at DATETIME NOT NULL DEFAULT now(), //현재 시각 (now())지정
    -> PRIMARY KEY(id),
    -> UNIQUE INDEX name_UNIQUE (name ASC)) //해당 값은 고유해야함 (UNIQUE INDEX), 오름차순 정렬(ASC, 내림차순은 DESC)
    -> COMMENT = 'user info' // table에 대한 보충 설명란
    -> DEFAULT CHARSET=utf8 // DEFAULT CHARSET=utf8 -> 한글 사용 허용
    -> ENGINE=InnoDB; // DB Engine setting -> InnoDB
```

```mysql
mysql> DESC users; // 만들어진 테이블을 확인하는 명령어
```

```mysql
// 사용자의 댓글을 저장하는 테이블
mysql> CREATE TABLE nodejs.comments(
    -> id INT NOT NULL AUTO_INCREMENT,
    -> commenter INT NOT NULL,
    -> comment VARCHAR(100) NOT NULL,
    -> created_at DATETIME NOT NULL DEFAULT now(),
    -> PRIMARY KEY(id),
    -> INDEX commenter_idx (commenter ASC),
    -> CONSTRAINT commenter
    -> FOREIGN KEY (commenter)
    -> REFERENCES nodejs.users (id)
    -> ON DELETE CASCADE
    -> ON UPDATE CASCADE)
    -> COMMENT = 'comment'
    -> DEFAULT CHARSET=utf8
    -> ENGINE=InnoDB;
```

```mysql
//CRUD USERS - CREATE
mysql> INSERT INTO nodejs.users (name, age, married, comment) VALUES ('zero', 24, 0, 'self intro1');
Query OK, 1 row affected (0.01 sec)

mysql> INSERT INTO nodejs.users (name, age, married, comment) VALUES ('nero', 32, 1, 'self intro2');
Query OK, 1 row affected (0.00 sec)

//CRUD COMMENT - CREATE
mysql> INSERT INTO nodejs.comments (commenter, comment) VALUES (1, 'hello');
Query OK, 1 row affected (0.00 sec)
```

```mysql
//CRUD - READ
mysql> SELECT * FROM nodejs.users;
+----+------+-----+---------+-------------+---------------------+
| id | name | age | married | comment     | created_at          |
+----+------+-----+---------+-------------+---------------------+
|  1 | zero |  24 |       0 | self intro1 | 2020-07-03 11:30:06 |
|  2 | nero |  32 |       1 | self intro2 | 2020-07-03 11:30:29 |
+----+------+-----+---------+-------------+---------------------+
2 rows in set (0.00 sec)

mysql> SELECT * FROM nodejs.comments;
+----+-----------+---------+---------------------+
| id | commenter | comment | created_at          |
+----+-----------+---------+---------------------+
|  1 |         1 | hello   | 2020-07-03 11:31:31 |
+----+-----------+---------+---------------------+
1 row in set (0.00 sec)

mysql> SELECT name, married FROM nodejs.users;
+------+---------+
| name | married |
+------+---------+
| zero |       0 |
| nero |       1 |
+------+---------+
2 rows in set (0.00 sec)

mysql> SELECT name, age FROM nodejs.users WHERE married = 1 AND age > 30;
+------+-----+
| name | age |
+------+-----+
| nero |  32 |
+------+-----+
1 row in set (0.00 sec)

mysql> SELECT id, name FROM nodejs.users WHERE married = 0 OR age > 30;
+----+------+
| id | name |
+----+------+
|  1 | zero |
|  2 | nero |
+----+------+
2 rows in set (0.00 sec)

mysql> SELECT id, name FROM nodejs.users ORDER BY age DESC;
+----+------+
| id | name |
+----+------+
|  2 | nero |
|  1 | zero |
+----+------+
2 rows in set (0.00 sec)

mysql> SELECT id, name FROM nodejs.users ORDER BY age DESC LIMIT 1;
+----+------+
| id | name |
+----+------+
|  2 | nero |
+----+------+
1 row in set (0.00 sec)

mysql> SELECT id, name FROM nodejs.users ORDER BY age DESC LIMIT 1 OFFSET 1;
+----+------+
| id | name |
+----+------+
|  1 | zero |
+----+------+
1 row in set (0.00 sec)
```

```mysql
// CRUD - Update
mysql> UPDATE nodejs.users SET comment = 'changed contents' WHERE id = 2;
Query OK, 1 row affected (0.00 sec)
Rows matched: 1  Changed: 1  Warnings: 0
```

```mysql
// CRUD - Delete

mysql> DELETE FROM nodejs.users WHERE id = 2;
Query OK, 1 row affected (0.00 sec)
```

- Node.js - MySQL 연동하기

```
$ npm i sequelize mysql2
$ npm i -g sequelize-cli
$ sequelize init
```

---

### mongoDB 설치하기 (2020.07.05)

- MongoDB Download Menual
- https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/

- 설치 관련 명령어 (맥북)
- `brew tap mongodb/brew`
- `brew install mongodb-community@4.2`
- Server Start `brew services start mongodb-community@4.2`
- Server Stop `brew services stop mongodb-community@4.2`

```
> use nodejs
switched to db nodejs

> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB

> db
nodejs

> db.createCollection('users')
{ "ok" : 1 }

> db.createCollection('comments')
{ "ok" : 1 }

> show collections
comments
users

// Mongo DB - Create (CRUD)
> db.users.save({ name: 'zero', age: 24, married: false, comment: 'hello, lets find out how to use mongodb', createdAt: new Date() });
WriteResult({ "nInserted" : 1 })

> db.users.save({ name: 'nero', age: 32, married: true, comment: 'second insertion', createdAt: new Date() });
WriteResult({ "nInserted" : 1 })

> db.users.find({name: 'zero'}, {_id: 1})
{ "_id" : ObjectId("5f0138812a3ab8f2641fdfc8") }

> db.comments.save({commenter: ObjectId("5f0138812a3ab8f2641fdfc8"), comment: 'first comment', createdAt: new Date() })
WriteResult({ "nInserted" : 1 })

// Mongo DB - Read (CRUD)
> db.users.find({})
{ "_id" : ObjectId("5f0138812a3ab8f2641fdfc8"), "name" : "zero", "age" : 24, "married" : false, "comment" : "hello, lets find out how to use mongodb", "createdAt" : ISODate("2020-07-05T02:18:41.769Z") }
{ "_id" : ObjectId("5f0138c12a3ab8f2641fdfc9"), "name" : "nero", "age" : 32, "married" : true, "comment" : "second insertion", "createdAt" : ISODate("2020-07-05T02:19:45.054Z") }

> db.comments.find({})
{ "_id" : ObjectId("5f0139102a3ab8f2641fdfca"), "commenter" : ObjectId("5f0138812a3ab8f2641fdfc8"), "comment" : "first comment", "createdAt" : ISODate("2020-07-05T02:21:04.416Z") }

> db.users.find({}, { _id: 0, name: 1, married: 1});
{ "name" : "zero", "married" : false }
{ "name" : "nero", "married" : true }

> db.users.find({age: {$gt:30}, married: true}, {_id: 0, name:1, age:1})
{ "name" : "nero", "age" : 32 }

> db.users.find({$or: [{age:{$gt:30}}, {married:false}]}, {_id:0, name:1, age:1})
{ "name" : "zero", "age" : 24 }
{ "name" : "nero", "age" : 32 }

> db.users.find({}, {_id:0,name:1,age:1}).sort({age:-1})
{ "name" : "nero", "age" : 32 }
{ "name" : "zero", "age" : 24 }

> db.users.find({}, {_id:0,name:1,age:1}).sort({age:-1}).limit(1)
{ "name" : "nero", "age" : 32 }

> db.users.find({}, {_id:0,name:1,age:1}).sort({age:-1}).limit(1).skip(1)
{ "name" : "zero", "age" : 24 }


// Mongo DB - Update (CRUD)
> db.users.update({name:'zero'}, {$set:{comment:"hello, changed the field"}});
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })

// Mongo DB - Delete (CRUD)
> db.users.remove({name : 'zero'})
WriteResult({ "nRemoved" : 1 })
```

---

### Node.js Project (Without Express.js) Express Generator 없이 구현하기

![노드 프로젝트 구조](../rd_img/express_structure.png)

```
> npm i -g sequelizecli
> npm i sequelize mysql2
> sequelize init
> npm i express cookie-parser express-session morgan connect-flash pug
> npm i -g nodemon
> npm i -D nodemon
> npm i dotenv //시크릿 키 관리 모듈 설치하기
```

---

### sequelize 함수 업데이트 사항 (find -> findOne, 2020.07.06)

- sequelize 함수가 업데이트 되어서 find라는 함수가 존재하지 않는다는 오류가 발생했다.
- 자바스크립트 find 내장 함수를 인지 못하는 것인지, 아님 익스프레스 오류인지 헷갈렸는데, 시퀄라이즈 오류였다.
- 해당 오류 찾는데만 한 6시간 걸린 것 같다.
- 특정 내장 함수를 아무리 고쳐도 해답이 안보일 땐, 업데이트 사항을 찾아보자.

---

### 해시태그 구현하기 (2020.07.06)

- 다대다 관계 (N:M 데이터베이스) 관계의 대표 주자

- 개인적으로 데이터베이스 매핑하는 부분이 로직을 고민 많이해야해서, 어렵지 않나 싶다.
- 코드는 몇 줄 안되는데, 매핑에 대해 구현하는 방법을 생각하는 게 어려운 듯하다.

```javascript
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads/");
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});
// 이미지 업로드
router.post("/img", isLoggedIn, upload.single("img"), (req, res) => {
  console.log(req.file);
  res.json({ url: `/img/${req.file.filename}` });
});

const upload2 = multer();
router.post("/", isLoggedIn, upload2.none(), async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      img: req.body.url,
      userId: req.user.id,
    });
    const hashtags = req.body.content.match(/#[^\s#]*/g); //해시태그#뒤에_내용_일치
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((tag) =>
          Hashtag.findOrCreate({
            where: { title: tag.slice(1).toLowerCase() },
          })
        )
      );
      await post.addHashtags(result.map((r) => r[0]));
    }
    res.redirect("/");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/hashtag", async (req, res, next) => {
  const query = req.query.hashtag;
  if (!query) {
    return res.redirect("/");
  }
  try {
    const hashtag = await Hashtag.findOne({ where: { title: query } });
    let posts = [];
    if (hashtag) {
      posts = await hashtag.getPosts({ include: [{ model: User }] });
    }
    return res.render("main", {
      title: `${query} | NodeBird`,
      user: req.user,
      twits: posts,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});
```

- 진행한 프로젝트 중에 node bird라는 프로젝트는 꽤 의미있는 프로젝트다.
- 기능적으로 트위터의 많은 기능들을 가져오고, 팔로우&팔로잉, 해시태그 구현이 포함되어 있어 꽤 필요한 기능들을 담고 있다.

![nodebird](../rd_img/node_bird.png)

---

### REST API Server로써의 Node.js (2020.07.06)

- 작업하는 폴더는 api_nodebird다.

```
> npm i jsonwebtoken
> npm i express-rate-limit
> npm i cors
```

- 그리고 nodebird-call이라는 폴더는 api_nodebird를 통해 전해지는 API를 받아오는 호출 서버다.
- JWT, REST API는 사용 빈도가 높아서 (리액트 등 프론트와의 통신에서 빈번하게 활용) 몇 번 반복해서 내용을 보는 것이 중요하다.
- api_nodebird 프로젝트가 갖는 중요성이 상당히 큰데, 여기서 다른 사용자가 데이터를 편하게 가져갈 수 있게 활용한다는 뜻은 곧 아두이노나 라즈베리파이에서 데이터 처리만 JSON으로 해주면, 해당 정보를 받아서 다른 서버나 페이지에서 활용할 수 있는 징검다리가 된다는 뜻이다.
- 이건 반복 학습이 필요하다.
- Node.js와 Django의 구현 방식이 꽤 많이 다른데, Django는 필요한 모듈을 처음에 다 받아오는 느낌이라면, 노드는 그 때 그 때 필요한 기능이나 모듈을 의존성에 맞게 다운로드 받아 사용하는 느낌?
- 그 중심에는 익스프레스가 있다.

---

### 웹 소켓으로 실시간 데이터 전송하기 (2020.07.07)

- 개인적으로 웹 소켓을 구현하는 부분이 코드도 많고, 에러도 많아서 가장 어렵던 것 같다.
- 우리가 웹에 request 보내는 것은 쉬운데, 웹에서 반대로 사용자에게 요청을 보내는 로직이 이렇게 어렵다니
- 심지어 코드 작성하는 오늘까지도 실습 코드 다 작성했는데, 오류를 다 못찾았다.
- 발생하는 오류는 아래의 이미지와 같다.

![터미널](../rd_img/chat_terminal.png)

- 여기서 별도의 삭제 로직을 요청하지 않았는데, 채팅방이 자동 삭제 된다 (몽구스를 통해 디비에 해당 내용이 잘 저장됨에도 불구하고)

![채팅방 이미지](../rd_img/gitchat.png)

- 아, 이거 고민 좀 꽤 해야될 것 같다.

- 어떤 로직을 잘못 설계한거지?

- 관련해서 해 볼 부분을 추가적으로 정리하면,

```
"더 해보기"
> 채팅방에 현재 참여자 수나 목록 표시하기(join, exit이벤트에 socket.adapter.rooms에 들어있는 참여자 목록 정보 같이 보내기)
> 시스템 메시지가지 DB에 저장하기 (라우터를 새로 만들어서 DB와 socket 동시에 사용하기)
> 채팅방에서 한 사람에게 귓속말 보내기 (socket.to(socket ID) 메서드 사용하기)
> 방장 기능 구현하기 (방에 방장 정보를 저장한 후 방상이 나갔을 때는 방장 위임 기능 추가)
> 강퇴 기능 구현하기 (강퇴 소켓 이벤트 추가하기)
```

- 이 내용을 배우는 오늘 기준으로 내용을 30% 이해한 것 같다.
- 코드를 이해하고 입력하는 게 아니라, 따라친다는 느낌을 받은 것은 굉장히 오랜만인 것 같다.

---

### 실시간 경매 시스템 (2020.07.08)

- Socket.io에서 에러나는 부분이 유독 많은데, 로직이 어려워서 코드를 작성하는 과정에서 계속 실수한다.
- 채팅 모듈, 실시간 거래 등 주식같은 앱에 이런 내용들을 활용할 수 있지 않을까 싶다.

```
"더 해보기"
> 상품 등록자는 경매 참여할 수 없게 만들기 (라우터에서 검사)
> 경매 시간을 자유롭게 조정할 수 있게 만들기 (상품 등록 시 생성할 수 있게 DB 수정 필요)
> 노드 서버 꺼졌다 다시 켜졌을 때 스케줄러 다시 생성하기 (checkAuction에서 DB 조회 후 스케줄러 설정)
> 아무도 입찰을 하지 않아 낙찰자가 없을 때 저리 로직 구현하기 (checkAuction과 스케줄러 수정)
```

- 핵심
- **webSocket, Socket.io, node Schedule**

![auction](../rd_img/auction.png)

- 채팅방, 경매 시스템 코드는 최소 3번씩은 다시 입력하면서 테스트 다시 해보자. pug 부분은 중요하지 않지만, 로직을 이해하는 것이 핵심이다.
- 오타에 너무 연연하지 말자. 코드가 길어지니까 오타 찾는 게 하늘의 별이다.

---

### 구글 API로 장소 검색 서비스 만들기 (2020.07.09)

- schemas/index.js 는 포맷이 거의 동일하다.
- 이는 MySQL로 테이블 구성할 때도 동일하다.
- schemas or models는 패턴의 미학이다.
- 내가 저장할 정보가 테이블이 필요한지, 스키마가 필요한지 판단하고
- 그에 따라 정보의 자료형을 결정한다.

* 이 부분에서 **서비스 구성의 핵심은 서버와 클라이언트 간 데이터 공유**다.
* 서버에서 GOOGLE PLACES API에 요청을 보내고, 결과를 받아서 클라이언트에 렌더링을 진행했다.
* 클라이언트는 렌더링된 데이터를 GOOGLE MAPS API를 사용해 화면에 지도와 마커를 띄웠다.

**1) 즐겨찾기 만들기 (마커를 클릭하면 현재 위치 기반으로 즐겨찾기로 추가된 위치가 표기된다)**

![favorite](../rd_img/favorite.png)

**2) GPS(JS 내장 메소드와 Google API의 콜라보)**

![구글API](../rd_img/gps.png)

**3) 구글 맵 검색하기 기능 (구글맵에서 특정 위치 찾기)**

![검색](../rd_img/search.png)

**4) 검색어 자동 완성 기능 (검색어와 유사한 위치 자동완성하기)**

![자동완성](../rd_img/autocomplete.png)

- 이건 활용하면 서비스 제작에 큰 도움이 1000%된다.

```
"더 해보기"
> 즐겨찾기 삭제하기(라우터 생성 및 프런트 화면에 삭제 버튼 추가)
> 검색 내역 표시하기(검색 내역을 불러와 화면에 렌더링)
> 다른 @google/maps API 사용하기(Direction API, Distance Matrix API 등)
```

### Node CLI 만들기 (2020.07.10)

- 직접 설치해서 만들어보는 노드 커맨드

```javascript
{
  "name": "node-cli",
  "version": "0.0.1",
  "description": "node cli program",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error : no test specified\" && exit 1"
  },
  "author": "Ryan",
  "license": "ISC",
  "bin": {
    "cli": "./index.js"
  }
}

```

- Commander, Inquirer 사용 (CLI 프로그램을 위한 라이브러리)
- Package.json이 변경되면 항상 `npm i -g`로 패키지 변경을 해줘야한다.

```
"더 해보기"
> 파일을 복사하는 명령어 만들어보기
> 경로를 지정하면 하위 모든 폴더와 파일을 지우는 명령어 만들어보기
> 데이터 베이스와 연동해서 가계부 만들어보기
> (ryan 추가 사항) Node.js 프로젝트 환경 설정을 자동으로 해주는 디폴스 세팅 진행?
```

- 노드는 단순히 서버가 아니라 자바스크립트를 실행하는 런타입이란 걸 기억하자.
- npm에는 서버를 위한 패키지 뿐만 아니라 다양한 프로그램을 제작하기 위한 패키지가 있다. 적극적으로 활용하자.
- 다른 사람이 사용할 것을 대비해서 명령어에 대한 설명을 자세하게 설명해두자.

---

### AWS, GOOGLE CLOUD 사용해서 배포하기 (2020.07.11)

- node.js교과서 밖에 있는 api_nodebird라는 폴더로 작업이 진행되었다
- app.js 부분이 수정되었다
- config폴더의 config.json을 삭제하고, config.js로 변경했다 (sequelize의 배포할 때 사용 문제로 인해 변경)
- .env에는 배포 시 활용하는 SEQUELIZE_PASSWORD라는 변수를 별도로 지정해줘야한다.
- 데이터 베이스에 한글 데이터 저장 시, 발생하는 이슈 해결 방법
  /_
  charset: "utf8",
  collate: "utf8_general_ci",
  이 두개의 문장은 배포 시, 데이터베이스에서 한글 인지를 못하는 문제를 해결해준다.
  _/
- cross-env는 배포환경에서 사용되는 명령어 (`npm start`), 개발시에는 `npm run dev`
- 취약점 분석을 해주는 npm 패키지에는 `npm i -g retire`라는 것과 `npm audit`이라는 모듈이 있다.
- pm2 -> 배포시에 서버가 급작스럽게 종료되었을 때, 다시 켜주는 nodemon과 같은 것
- `cross-env NODE_ENV=production PORT=80 pm2 start app.js -i 0` 맨 뒤의 0은 현재 사용하는 컴퓨터의 CPU 코어 갯수만큼 프로세스를 생성한다는 의미임.
- 0을 -1로 바꾸면 현재 CPU 코어 갯수보다 1개 줄여서 생성하겠다는 뜻
  pm2 시작하기
  ![pm2start](../rd_img/pm2_start.png)

pm2 CPU 코어 갯수만큼 프로세스 생성한 화면
![pm2start](../rd_img/pm2_list.png)

Pm2 monitor 화면
![pm2start](../rd_img/pm2_monit.png)

- `npm i winston` -> 배포 시에 console.log / console.error를 대체하는 모듈
- 더불어서 winston-daily-rotate-file이라는 패키지도 있다. 로그를 날짜별로 관리할 수 있게 해주는 패키지이니 참고하자.
- helmet, hpp 서버의 각종 취약점을 보완해주는 패키지들
- `connect-redis`는 멀티 프로세스간 세션 공유를 위해 레디스와 익스프레스를 연결해주는 패키지다.
- 기존에는 로그인 시 express-session의 세션아이디와 실제 사용자 정보가 메모리에 저장되었는데 이럴 경우, 서버가 종료되는 시점에 접속자들의 로그인이 모두 풀려버리는 문제가 발생한다.
- 따라서 세션 아이디오 ㅏ실제 사용자 정보를 데이터베이스에 저장해야하는데 이 때 사용하는 것이 `레디스(redis)`s라는 것이다

![pm2start](../rd_img/redis.png)

> Reference
> [Redis](https://redislabs.com/)

- 배포 관련 이미지들

AWS LightSail
![pm2start](../rd_img/lightsail.png)

Google Cloud
![pm2start](../rd_img/google_cloud.png)
