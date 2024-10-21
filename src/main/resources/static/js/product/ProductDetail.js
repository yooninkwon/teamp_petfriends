$(document).ready(function() {
      let currentIndex = 0; // 현재 이미지 인덱스

      // JSP에서 product 객체의 main_img1 ~ main_img5 값을 가져와서 JavaScript 배열로 저장
      const images = [
          `/static/images/ProductImg/MainImg/${product.main_img1}`,
          `/static/images/ProductImg/MainImg/${product.main_img2}`,
          `/static/images/ProductImg/MainImg/${product.main_img3}`,
          `/static/images/ProductImg/MainImg/${product.main_img4}`,
          `/static/images/ProductImg/MainImg/${product.main_img5}`
      ];

      function showImage(index) {
          $('#productImage').attr('src', images[index]);
      }

      $('#nextButton').click(function() {
          currentIndex = (currentIndex + 1) % images.length; // 다음 이미지로 변경
          showImage(currentIndex);
      });

      $('#prevButton').click(function() {
          currentIndex = (currentIndex - 1 + images.length) % images.length; // 이전 이미지로 변경
          showImage(currentIndex);
      });

      showImage(currentIndex); // 초기 이미지 표시
  });