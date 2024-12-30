# Petfriends


### <기능 수정 및 개선 내용>
#### 1. 241218 jpa 계층형 카테고리 적용    
Problem : 고정적인 카테고리, 제한된 상품등록    
Solution : JPA 계층형 카테고리 기능 적용    
Result : 동적 카테고리 로딩, 신상품 등록의 유연성    
상세내용 링크 : https://yooninkwon.tistory.com/8    


---

### 실제 사이트인 '펫프렌즈' 기반의 펫 라이프 종합 쇼핑몰 커뮤니티   
****개발 기간**** : 2024.10.14 ~ 2024.11.21     
****개발 인원**** : 5명 (팀장)   
****언어**** : Java 11, HTML/CSS, JavaScript   
****프레임워크**** : Spring Boot, MyBatis 2.2.2   
****DB**** : Oracle 11g XE    




### <담당 세부기능>
#### 고객단 : 상품/product  
#### 관리자단 : 상품(등록 및 수정)/adminProduct , 통계(매출)/adminSales

[상품]   
1.고양이, 강아지 관련 상품(사료,장난감,용품) 리스트 페이지
+ AJAX와 MyBatis를 활용하여 카테고리 클릭 시 실시간으로 상품 리스트를 동적으로 불러오는 기능   
<img src="https://github.com/user-attachments/assets/c2f0cf6c-24e3-4cc5-bd75-ad1624fe639f" width="450" height="250">
</br>
</br>
2.상품 검색 및 방금 본 상품 리스트
+ AJAX와 MyBatis를 활용하여 상품 검색 시 검색 결과를 실시간으로 표시하고, 상세페이지에서 상품 클릭 시 해당 상품을 '방금 본 상품' 목록에 자동으로 추가하여 리스트로 제공(DB 활용)
</br>
<img src="https://github.com/user-attachments/assets/b1123fe6-cacd-4ec8-929b-e267545d3120" width="450" height="250">
</br>
</br>

3.상품 상세페이지
+ 상품 상세페이지에서는 MyBatis와 JOIN을 활용하여 상품 정보를 불러오고, 찜 및 장바구니 담기 기능을 제공하며, 리뷰 리스트를 통해 사용자에게 상품에 대한 추가 정보를 제공     
<img src="https://github.com/user-attachments/assets/ea0d8262-6512-45ea-95c1-628c6ac73053" width="450" height="250">
</br>
</br>
4.상품관리
+ 관리자 페이지에서 MyBatis를 활용하여 상품 조회, 내용 수정 및 옵션 설정, 상품 등록 기능을 제공    

[통계]   
1.매출통계
+ 일별, 월별, 기간별 매출 관련 데이터를 MyBatis로 조회한 후, Chart.js를 사용하여 시각화하여 제공   

---


 
