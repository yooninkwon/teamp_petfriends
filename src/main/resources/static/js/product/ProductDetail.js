$(document).ready(function() {
    let currentIndex = 0; // 현재 이미지 인덱스

    // 만약 이미지가 하나 이하라면 버튼을 숨김
    if (productImages.length <= 1) {
        $('#prevButton, #nextButton').hide();
    }

    // 이미지를 보여주는 함수
    function showImage(index) {
        $('#productImage').attr('src', `/static/images/ProductImg/MainImg/${productImages[index]}`);
    }

    // 다음 버튼 클릭 시
    $('#nextButton').click(function() {
        currentIndex = (currentIndex + 1) % productImages.length; // 다음 이미지로 변경
        showImage(currentIndex);
    });

    // 이전 버튼 클릭 시
    $('#prevButton').click(function() {
        currentIndex = (currentIndex - 1 + productImages.length) % productImages.length; // 이전 이미지로 변경
        showImage(currentIndex);
    });

    // 초기 이미지 표시
    showImage(currentIndex);
});