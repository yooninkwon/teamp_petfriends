<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>펫티쳐</title>
<jsp:include page="/WEB-INF/views/include_jsp/include_css_js.jsp" />
<link rel="stylesheet" href="/static/css/helppetf/petteacher
_detail.css" />
</head>
<body>
	<jsp:include page="/WEB-INF/views/include_jsp/header.jsp" />
	<jsp:include page="/WEB-INF/views/include_jsp/helppetf_sub_navbar.jsp" />
	<script>
		$(document).ready(function() {
			document.getElementById('${main_navbar_id }').classList.add('selected');
			document.getElementById('${sub_navbar_id }').classList.add('selected');
		});
	</script>
	
	<div class="content_wrap">
		<a class="back_list_btn _content_detail_btn" href="/helppetf/petteacher/petteacher_main">목록으로</a>
		<div class="content_header">
			<div class="title_wrap">
				<div class="content_num">No.${dto.hpt_seq }</div>
				<div class="content_title">${dto.hpt_title }</div>
				<div class="content_view">${dto.hpt_hit } views</div>
			</div>
			<div class="tag_wrap">
				<div class="kategorie">#<span>${dto.hpt_pettype }</span> #<span>${dto.hpt_category }</span></div>
				<div class="content_date">${dto.hpt_rgedate }</div>
			</div>
		</div>
		<div class="content_main">

			<div class="content_video">
				<!-- 1. 영상이 노출될 영역을 확보한다. 
    			 api가 제대로 작동하면 <div>에 자동으로 <iframe> 태그가 load될 것 이다. -->
				<div id="player"></div> <script>
					// 2. 이 코드는 Iframe Player API를 비동기적으로 로드한다.
					var tag = document.createElement('script');

					tag.src = "https://www.youtube.com/iframe_api";
					var firstScriptTag = document
							.getElementsByTagName('script')[0];
					firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

					// 3. API 코드를 다운로드 받은 다음에 <iframe>을 생성하는 기능 (youtube player도 더불어)
					var v_id = '<c:out value="${dto.hpt_yt_videoid }" />';
					var player;
					function onYouTubeIframeAPIReady() {
						player = new YT.Player('player', {
							height : '450', //변경가능-영상 높이
							width : '800', //변경가능-영상 너비
							videoId : v_id, //변경-영상ID
							playerVars : {
								'rel' : 0, //연관동영상 표시여부(0:표시안함)
								'controls' : 1, //플레이어 컨트롤러 표시여부(0:표시안함)
					//				'autoplay' : 1, //자동재생 여부(1:자동재생 함, mute와 함께 설정)
					//					'mute' : 1, //음소거여부(1:음소거 함)
								'loop' : 0, //반복재생여부(1:반복재생 함)
								'playsinline' : 1
							//iOS환경에서 전체화면으로 재생하지 않게
							},
							events : {
								'onReady' : onPlayerReady, //onReady 상태일 때 작동하는 function이름
								'onStateChange' : onPlayerStateChange
							//onStateChange 상태일 때 작동하는 function이름
							}
						});
					}

					// 4. API는 비디오 플레이어가 준비되면 아래의 function을 불러올 것이다.
					function onPlayerReady(event) {
				//		event.target.playVideo();
					}

					// 5. API는 플레이어의 상태가 변화될 때 아래의 function을 불러올 것이다.
					//    이 function은 비디오가 재생되고 있을 때를 가르킨다.(state=1),
					//    플레이어는 6초 이상 재생되고 정지되어야 한다.
					var done = false;
					function onPlayerStateChange(event) {
// 						if (event.data == YT.PlayerState.PLAYING && !done) {
// 							setTimeout(stopVideo, 6000);
// 							done = true;
// 						}
					}
					function stopVideo() {
// 						player.stopVideo();
					}
				</script>
				
			</div>
			<div class="content_desc _2">
				<div>${dto.hpt_content }</div>
			</div>
		</div>
		<div class="content_footer">
			<a class="prev_content_btn _content_detail_btn" href="#;">&lt; 이전으로</a>
			<a class="next_content_btn _content_detail_btn" href="#;">다음으로 &gt;</a>
		</div>
		<a class="back_list_btn _content_detail_btn" href="/helppetf/petteacher/petteacher_main">목록으로</a>
	</div>
	
	<jsp:include page="/WEB-INF/views/include_jsp/footer.jsp" />
</body>
</html>