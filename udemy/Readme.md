# 목차

- [shop structure](./01_shop_structure) : 쇼핑몰 구성을 위한 ejs & routes 연습을 해볼 수 있다. 일종의 CRUD 노드 버전 연습용이다.

- [dynamic routes](./02_dynamic_routes) : routes 연습 2. CRUD를 ejs를 활용해서 계속 연습하고 있다. Django 배울 때랑 느낌이 상당히 흡사하다. 간단한 장바구니 기능이 구현되어 있다. 다만, 상태관리하는 controller의 역할을 주의깊게 학습해야한다. 결국 이 파트에서 언급하고 싶었던 것은 Route를 지정할 때, `'/add-product'` 형태의 이런 정적인 라우팅보다 `/add-product/:id` 이런 형태로 바인딩하는 것을 이해시켜주고 싶었던 것이다. Django detail 페이지 생성할 때랑 느낌이 동일하다.

- [SQL Introduction](./03_SQL_intro) : Sequelize를 사용하기 전에 mysql 명령어를 활용해서 데이터 베이스에 정보를 저장하고 조회하는 기능을 만들었다. 앞 전에 만들었던 게시글 생성하는 기능의 연장선인 것 같다.

- [SQL Sequelize](./04_sequelize) : mysql2라는 모듈이 반드시 설치된 상태에서 sequelize 모듈을 활용할 수 있다.

## Udemy 학습 진행 상황

---

### 디버깅(Debugging) (2020.07.08)

- VS Code 안에 있는 디버깅 툴 활용법을 전달했다.
- app.js 등 해당 파일이나 폴더를 실행시키는 파일의 위치로 이동해서 'start debugging을 진행한다.'
- VSC에서 코드 작성하는 란 왼쪽을 보면 붉은 점을 찍을 수 있는 기능이 있다.
- 코드 테스트를 진행할 때, 해당 부분에 붉은 점을 찍고, 코드를 돌려본다 (디버깅할 때 코드는 이미 서버를 켰다는 전제로 진행할 수 있게 돕는다)
- 디버깅 신세계다...
- 3대 에러 대장 -> 'Syntax Error', 'Runtime Error', 'Logic Error'
- 디버깅은 로직 에러를 잡아주는데 큰 도움을 준다.
- 디버깅은 launch.json에 작성해놨고 (.vscode) 사용방법과 관련한 코드는 하단에 추가한다. (.gitignore로 가려놓은 상태)

```json
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "program": "${workspaceFolder}/app.js",
      "restart": true,
      "runtimeExecutable": "nodemon",
      "console": "integratedTerminal"
    }
  ]
}
```

- 디버깅 작동 방법 (위의 코드를 .vscode/launch.json에 추가한 상태에서 진행)

![debugging](../rd_img/debug.png)

- `Node.js Debug Terminal`을 클릭하면 기존 터미널과는 다른 `Javascript Debug Terminal`이라고 생성되고, `디버그와 Nodemon 실행이 동시에 되는 콘솔창이 오픈`된다

  > Reference(VS Code 공식문서)
  > https://code.visualstudio.com/docs/nodejs/nodejs-debugging
  >
  > https://nodejs.org/en/docs/guides/debugging-getting-started/

- 디버깅 및 앞 부분 내용 요약

![Summary](../rd_img/node_summary.png)

---

### Express.js (2020.07.10)

![Express.js Structure](../rd_img/express_intro.png)

- JS에서 Buffer가 하는 역할이 명확하게 무엇인가?
- Server side logic은 항상 복잡하기 때문에 Express를 사용하는데, Vanilla Node.js로 서버를 구성할 수 있다면, 그렇게 해도 무방하다. (다만 코드 복잡해지는 것은 본인의 몫이다)
- Express.js 대신에 Koa 등등이 있을 수 있다.

```javascript
app.use((req, res, next) => {
  console.log("I'am Middleware!");
  next();
}); // 이 구조가 express.js에서 기본이다.
```

![middleware](../rd_img/middleware.png)

---

### body-parser의 명확한 역할이 뭐지?(2020.07.12)

- `body-parser`의 정확한 역할에 대해 찾아보자

- 검색 결과

- 요청의 본문을 해석해주는 미들웨어이다. 보통 폼 데이터나 AJAX요청의 데이터를 처리한다.

- 출처: https://backback.tistory.com/336

- body-parser를 안쓴다면, 이렇게 사용도 가능하다

```javascript
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/*
단, body-parser가 필요한 경우도 있다

body-parser는 

JSON과 URL-encoded 형식의 본문 외에도 

Raw, Text형식의 본문을 추가로 해석할 수 있다.
*/
```

---

### JS `process` 글로벌 메소드 (2020.07.13)

- process라는 메소드가 간간히 등장하는데 (key값 관리나 경로 등에서) JS 글로벌 메소드인 것 같다.
- 해당 부분이 경로를 관리하는 전반적인 코드 활용에 사용되는 것 같아서, 사용 용도를 잘 파악하면 활용도가 높을 것 같다.

- 생활코딩 참고 자료

> `process 객체`는 **프로그램과 관련된 정보를 나타내는 객체로 속성과 메소드가 많은 편**입니다.
> `process 객체`는 프로그램과 관련된 정보를 나타내는 객체이며 웹브라우저에서 작동하는 자바스크립트에 존재하지 않는 Node.js만의 객체라고 설명되어 있는 페이지도 있다.

---

### Ejs, Pug, HandleBar (2020.07.13)

`npm install --save ejs pug express-handlebars`

- 각 각 특징이 있겠지만 pug는 node.js교과서에서 다뤘고, ejs, handlebar는 Django HTML 템플릿 엔진과 비슷하다.
- 노드만 사용해서도 풀스택이 가능하기는 하다.
- 개발자 성향에 맞게 템플릿 엔진을 선정해서 노드 풀스택을 시도해볼 수 있겠지만, 풀스택을 안하는 이유는 자바스크립트 하나로 프론트, 백엔드 모두가 커버될 수 있기 때문이겠지?
- 그리고 위의 3개의 템플릿 엔진에서 사실 제일 유명한 게 Ejs다. 사실 나머지 2개의 템플릿 엔진은 들어본 적도 없긴하다. (노드JS 교과서 배우기 전에 pug도 몰랐던 팩트)
- 수강생들을 지도하는 강사의 입장이라면, 3개의 템플릿 엔진을 모두 알려주고 어떤 템플릿을 사용하게 될 것이라는 형태로 안내를 해주는 것이 좋을 것 같다.
- 그런 의미에서 Max의 ejs, pug, handlebars 분석은 상당히 좋은 형태의 수업이다. 원하는 템플릿을 선택해서 강의를 잡자.

---

### 아직까진 Node.js에서 this나 화살표 함수 대신 function을 자주 활용하지는 않는다 (2020.07.13)

- 무슨 이유일까? 리액트에서는 거의 도배하다시피 this가 사용되는 걸 목격했는데, 아직 Node.js에선 this를 활발하게 사용하는 것을 못봤다. this로 받아올 만한 데이터가 서버 관리할 때 없는 건가?

- 아직 이해는 잘 안되는데, function과 화살표 함수를 보통 섞어서 사용하는 경우도 있는데, 아얘 function 자체를 사용 안한다. 노드에서 사용하는 패키지들도 거의 모두 타입스크립트를 활용하고 있고.

- 배우면서 의문이 드는 부분들은 모두 기록하자. 학습할 때 진행하는 `문서화는 자산`이다

### mvc 패턴에 대해서 새롭게 이해한 부분 (Node.js교과서에서 활용 안했던 신규 내용)

- 생각해보니, controller에 해당하는 부분을 node.js 교과서에서는 views폴더에 녹여서 설명을 진행했던 것 같다.

- 데이터의 상태 관리를 담당하는 부분을 mvc 패턴에서 controller가 담당하는 것 같은데, 왜 node.js 교과서에서는 내용 설명을 안했을까?

- JS에서 static 명령어를 활용하는 경우가 어떤 경우인가?
