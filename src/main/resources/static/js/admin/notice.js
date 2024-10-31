// 공지사항 필터에 따른 리스트 표시 토글
function toggleNoticeList() {
    var selectedCategory = document.querySelector('input[name="category-filter"]:checked').value;
    var noticeListContainer = document.getElementById("notice-list-container");
    
    if (selectedCategory === "공지사항") {
        noticeListContainer.style.display = "block";
    } else {
        noticeListContainer.style.display = "none";
    }
}

// 페이지 로드 시 초기화
document.addEventListener("DOMContentLoaded", function() {
    toggleNoticeList();
});