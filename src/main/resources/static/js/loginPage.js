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
