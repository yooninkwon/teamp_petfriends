# project_Petfriend

**<담당 카테고리>**     
고객단 : 상품/product  
관리자단 : 상품(등록 및 수정)/adminProduct , 통계(매출)/adminSales

[상품]   
1.고양이, 강아지 관련 상품(사료,장난감,용품) 리스트 페이지
> 카테고리별 상품 리스트 표현기능

2.상품 상세페이지
> 상품 정보, 찜, 장바구니담기, 리뷰리스트

3.상품관리
> 상품 등록 및 수정 기능

[통계]   
1.매출통계
>결제액, 환불액에 따른 순수익 표현(chart.js)

---

**<기능 수정내용>**
1. jpa 계층형 카테고리 기능  
> 기존 상품리스트페이지 카테고리는 jsp에 일일히 코드로 작업하여 새로운 카테고리를 가진 상품을 리스트업하려면 jsp + js를 손봐야했지만   
> jpa 계층형으로 수정 후 새로운 상품(+새로운 카테고리)을 추가하여도 따로 작업을 하지 않아도 모든 카테고리가 나옴   
> 기능수정 내용 참고 : https://yooninkwon.tistory.com/8
