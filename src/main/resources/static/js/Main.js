// 상단 로고 클릭시 메인화면 이동
$(function(){
    $("#top_logo").click(function(){
        window.location.href = "/";
    });
});     

// 푸터 인스타그램 아이콘
$(function(){
    $("#instagram").click(function(){
        window.location.href = "https://www.instagram.com/petfriends_official/";
    });
});   

// 상단 우측 유저 아이콘 클릭시 로그인 화면 이동
$(function(){
    $("#user_icon").click(function(){
        window.location.href = "/login";
    });
});     



$(document).ready(function(){
    var currentIndex = 0;
    var slides = $('.slide');
    var totalSlides = slides.length;

    function updateSlidePosition() {
        var offset = -currentIndex * 100 + '%';
        $('.slides').css('transform', 'translateX(' + offset + ')');
    }

    function showNextSlide() {
        currentIndex++;
        if (currentIndex >= totalSlides) {
            currentIndex = 0;
        }
        updateSlidePosition();
    }

    function moveSlide(step) {
        currentIndex += step;
    
        if (currentIndex < 0) {
            currentIndex = totalSlides - 1; // 마지막 슬라이드로 이동
        } else if (currentIndex >= totalSlides) {
            currentIndex = 0; // 첫 번째 슬라이드로 이동
        }

        updateSlidePosition();
    }

    // 화살표 버튼 이벤트
    $('.prev').click(function() {
        moveSlide(-1);
    });

    $('.next').click(function() {
        moveSlide(1);
    });

    // 4초마다 슬라이드 자동 전환
    setInterval(showNextSlide, 4000);
});






$(document).ready(function(){
    var currentIndex = 0;
    var slides = $('.login_slide');
    var totalSlides = slides.length;

    function showNextSlide() {
        currentIndex++;
        if (currentIndex >= totalSlides) {
            currentIndex = 0;
        }
        var offset = -currentIndex * 100 + '%';
        $('.login_slides').css('transform', 'translateX(' + offset + ')');
    }

    // 4초마다 슬라이드 전환
    setInterval(showNextSlide, 4000);
});
