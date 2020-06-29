# [Udemy] NodeJS - The Complete Guide(incl. MVC, REST APIs, GraphQL)

## 학습 기간

- 2020.06.22 ~ 2020.7.12 (3주)

## 학습 배경

- 베트남인들을 대상으로 한 JS 풀스택 진행이 거의 확정시되어 가고 있는 상황
- JS 풀스택에 대한 깊은 이해를 단기간에 필요로 하는 상황
- 근무 이후 남은 시간을 활용해서 꾸준이 학습하자. 하루 한 시간도 좋다.
- 집중해서 배우자. 베트남에서의 근무 시간은 내게 둘도 없는 기회다.

## 유의 사항

- 알고 있는 코드라도 한 번씩 따라 입력해보자.
- 내가 이 코드를 알고 있다는 마음 속의 자만을 버리자.
- 지금 입력하는 코드가 쌓여서 큰 자산이 된다.

## 학습 진행 상황

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
