# TypeScript Movie App

## 변경사항

### 타입스크립트 적용

- 기존 코드에 타입스크립트를 적용했습니다.
- 파일 구조를 변경했습니다.

```
src
  ├── api // api url 관련
  ├── components // 하위 컴포넌트
  ├── hooks // 커스텀 훅 (useFetch)
  ├── types // 타입스크립트 타입
  ├── App.css
  ├── App.tsx
  ├── index.css
  └── index.tsx
```

- 성능 개선을 위해 일부 코드를 변경했습니다.
  - `Search.tsx` : `React.memo` 와 `useCallback` 을 사용해 불필요한 재렌더링 방지
  - `Header.tsx` : `React.memo` 를 사용해 불필요한 재렌더링 방지
- `.env` 파일을 사용해 API 환경변수 관리
- `eslint`, `prettier` 적용

### 상태 관리

기존의 코드는 `App` 컴포넌트에서 `useReducer` 를 사용해 상태관리를 했습니다. 요청, 성공, 실패 3가지의 이벤트를 나누어 비동기 로직을 처리하는 방식입니다. 일관성 있게 상태를 관리할 수 있어 좋은 방법이라고 생각합니다.

애플리케이션의 규모가 작아서 굳이 `useReducer` 를 쓰지 않아도 되겠다고 생각했습니다. `reducer` 함수를 별도로 만들어야 하고, (기존 코드에는 없지만) 액션 생성자 함수까지 만들게 된다면, '리듀서를 위한 코드'가 너무 길어져서 오히려 가독성이 떨어지겠다고 생각했습니다. 대신 `useState` 를 사용하고, 기존 코드에서 반복되는 `fetch` 로직은 `useFetch` 라는 커스텀 훅을 만들어 재사용할 수 있게 변경했습니다.

```js
// useFetch
const useFetch = <T>(url: RequestInfo): IState<T> => {
  const [request, setRequest] = useState(url);
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState<T | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const initState = () => {
      setLoading(true);
      setErrorMessage(null);
    };

    const fetchData = async (): Promise<void> => {
      const res = await fetch(request);
      const json = await res.json();
      const { Response, Search, Error } = json;

      Response === 'True' ? setResponse(Search) : setErrorMessage(Error);
      setLoading(false);
    };

    initState();
    fetchData();
  }, [request]);

  return { setRequest, response, loading, errorMessage };
};
```

```js
// App.js 일부
  const { setRequest, response: movies, loading, errorMessage } = useFetch<
    IMovie[]
  >(defaultUrl);

  const search = useCallback(
    (searchValue: string) => setRequest(generateSearchUrl(searchValue)),
    [setRequest],
  );
```

요청 URL이나 Request 객체가 들어갈 수 있는 `request` 상태를 매개변수 `url` 로 초기화했습니다. 디스패치 함수 `setRequest` 를 함께 객체에 담아 리턴했습니다. 커스텀 훅 내부 `useEffect` 의 의존성 배열에 `request` 를 추가해서, 요청 URL이 변경되면 서버에게 재요청하도록 했습니다.

#### 단점

요청 결과 `json` 이 `{ Response, Search, Error }` 라는 객체 형태로 전송될 것이라 기대를 하고 작성된 코드기 때문에, API 변경에 유연하지 못합니다. 객체 형태에 의존하지 않게 `try...catch` 문으로 작성해보려고 했으나, 이 프로젝트에서 사용하는 API가 성공, 실패 모두 상태 코드 200을 보내줬기 때문에 사용할 수 없었습니다.

### 프로젝트 실행법

**1. npm 설치**

<https://nodejs.org/en/>

위 주소에 접속해 Node.js를 설치합니다. LTS, Stable 버전 어느 쪽을 설치해도 큰 상관은 없습니다.

**2. git 설치**

> 참고 링크: [git 공식 사이트](<https://git-scm.com/book/ko/v2/%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0-Git-%EC%84%A4%EC%B9%98>)

**간단 설명**

- 리눅스 사용자: `sudo dnf install git-all` 또는 `sudo apt install git-all` 명령어로 설치합니다.
- 윈도우 사용자: <https://git-scm.com/download/win> 링크에 접속해 내려받아 설치합니다.
- 맥 사용자: 터미널을 켜서 `git --version` 명령어를 입력합니다. 설치가 되어있지 않다면, 설치하라고 자동으로 안내해줍니다.

**3. 프로젝트 가져오기**

1. git이 설치되면 터미널에 아래와 같은 명령어를 입력합니다.

```bash
git clone https://github.com/sungik-choi/ts-movie-app.git
```

2. 프로젝트 파일은 가져왔지만, 프로젝트에서 사용하는 패키지들은 설치가 안 된 상태입니다. 아래와 같은 명령어를 추가로 입력합니다. 해당 디렉터리로 이동하고, 프로젝트가 사용하고 있는 패키지를 설치하는 명령어입니다.

```bash
cd ts-movie-app
npm install
```

**4. 브라우저로 실행하기**

아래 명령어를 입력합니다. react 개발용 서버를 실행하는 명령어의 shortcut입니다.

```bash
npm start
```

잠시 후 브라우저가 열리며, URL `localhost:3000` 에서 프로젝트 화면을 확인해볼 수 있습니다.

## CSS vs LESS 차이

### 변수

```less
@white: #fff;

body {
  background-color: @white;
}
```

앞에 `@` 를 붙여 사용합니다.
CSS3에선 CSS 자체적으로도 변수를 사용할 수 있습니다. 앞에 `--` 를 붙입니다. 보통 `:root`(html의 슈도 코드) 내부에 전역변수로 작성합니다

```CSS
:root {
  --white: #fff;
}

body {
  background-color: var(--white);
}
```

### 중첩 규칙

선택자를 중첩해서 상위 선택자를 반복해서 입력하지 않아도 됩니다. CSS와의 가장 큰 차이점이라고 생각합니다.

```less
main {
  div {
    width: 100px;
    .title {
      font-size: 3rem;
      &:hover {
        color: red;
      }
    }
  }
}
```

위와 같은 코드는 CSS에서 아래와 같이 표현됩니다.

```CSS
main div {
  width: 100px;
}

main div .title {
  font-size: 3rem;
}

main div .title:hover {
  color: red;
}
```

### 함수

자바스크립트 코드처럼 함수를 사용할 수 있습니다. LESS 자체적으로 몇 가지 유용한 함수를 제공합니다. [공식 문서 링크](http://lesscss.org/functions/http://lesscss.org/functions/)

```less
color: lighten(red, 20%);
```

### 믹스인

미리 정의한 코드들을 CSS 정의에 포함시킬 수 있습니다.

```less
.bordered {
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}
```

아래와 같이 사용할 수 있습니다.

```less
#menu a {
  color: #111;
  .bordered();
}

.post a {
  color: red;
  .bordered();
}
```
