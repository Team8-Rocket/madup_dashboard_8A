# 광고관리 통계 Chart 대시보드

## 📜 프로젝트 개요
json 데이터로 광고관리와 현황을 차트로 볼 수 있는 대시보드 제작.


## 🔗 프로젝트 배포

### 🔗 

## ⚙ 기술 스택
  <img src="https://img.shields.io/badge/TypeScript-v4.4.2-blue"/>
  <img src="https://img.shields.io/badge/React-v18.1.0-blue"/>
  <img src="https://img.shields.io/badge/Redux/toolkit-v1.8.1-blue"/>
  <img src="https://img.shields.io/badge/React Router Dom-v6.3.0-blue"/>

```
그 외 추가 라이브러리
  dayjs / react-datepicker / victory
```

## 🎄 프로젝트 트리

```
📦src
 ┣ 📂assets         // svg
 ┣ 📂components     // 드롭다운, 스켈레톤, 공유컴포넌트
 ┣ 📂data	        // json 데이터
 ┣ 📂hooks	        // redux toolkit hooks
 ┣ 📂routes         // 페이지
 ┃ ┣ 📂Advertise	// 광고관리
 ┃ ┣ 📂Dashboard	// 대시보드
 ┃ ┣ 📂Wrapper		// GNB
 ┣ 📂services
 ┣ 📂states     
 ┣ 📂styles
 ┣ 📂types

```
## 📍 Getting Started

1. yarn 설치
```sh
$ npm i yarn
```

2. Repository 클론
```sh
$ git clone https://github.com/Team8-Rocket/madup_dashboard_8A.git
```

3. Dependecies 설치
```sh
$ yarn install
```

4. Run 실행
```sh
$ yarn start
```


## 🖼 실행 이미지


1. skeleton 로딩화면 구현.
2. 전역 상태관리로 다른 화면에 이동시, 복귀 했을 때 마지막 상태가 유지.
3. Datetime Picker로 날짜에 따라 데이터 적용.
4. Victory.js로 차트 구현
    - 꺾은선 그래프 통합 광고 현황 구현
    - 막대 그래프 매체 현황 구현
5. 전체, 진행중, 중단됨 상태에 따른 웹/앱 광고 카드 구현

## 🔧구현 방법


## 🔥 어려웠던 점
