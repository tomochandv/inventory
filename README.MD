# P Inventory

공공의 이익을 위해 무료로 배포하는 재고 관리 프로그램.
Nodejs와 mysql로 이루어져 있습니다.

구조
 - 백엔드와 프론트앤드가 같이 공존합니다.
 - 부트스트랩으로 디자인이 되어있습니다.
 - babel과 webpack 으로 빌드후 배포합니다.
 - 최상단의 db.sql로 데이터베이스 생성 및 테이블 생성을 하세요.

### 키파일들
 각종 키 파일들이 존재해야 합니다.
 ``` src/server/lib/keys ``` 폴더에 위치 해야 합니다.
 - emailKey : mailjet을 연동하여 메일을 보냅니다. 해당 키파일입니다.
 - private: rsa 암호화를 위한 프라이빗키
 - public: rsa 암호화를 위한 공개키
 - recaptch: 리캡차 V3를 하기위한 시크릿키
 - tokenKey: token을 생성 할때 사용하는 128bit의 문자키

### Local환경에서 테스트
사전에 config.js 파일의 디비 연결 문자열을 변경하세요.
nodemon 과 webpack의 watch 모드가 동작합니다.
```sh
npm run local
```
 ### 배포
 server/config.js 파일을 config.sample,js 파일 처럼 생성 후,
 ```sh
npm run build
```
dist 폴더의 server/lib/keys에 키파일들을 복사.
후에 dist 폴더를 배포합니다.
``` dist/server/index.js``` 파일을 구동 시키면 됩니다.

### 라이센스
MIT Lisense. https://opensource.org/licenses/MIT
