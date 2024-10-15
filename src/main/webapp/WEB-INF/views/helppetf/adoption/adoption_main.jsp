<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<jsp:include page="/WEB-INF/views/include_jsp/include_css_js.jsp" />
</head>
<body>
	<jsp:include page="/WEB-INF/views/include_jsp/header.jsp" />
	<h1>펫티쳐</h1>

	<a href="/helppetf/find/pet_hospital">주변 동물병원 찾기</a> &nbsp;
	<a href="/helppetf/find/pet_facilities">주변 반려동물 시설 찾기</a> &nbsp;
	<a href="/helppetf/adoption/adoption_main">입양 센터</a> &nbsp;
	<a href="/helppetf/petteacher/petteacher_main">펫티쳐</a> &nbsp;
<script>
	function redeptList() {
		var htmltxt="";
		console.log("1 page 요청");
		<%-- alert("<%=path %>"); --%>
		$.ajax({
			type:"get",
			async: true,
			url: "/helppetf/adoption/adoption_main",
			success:function(result){
				console.log(result);  // 응답 데이터 확인
			console.log("===1 page 응답===");
				htmltxt="<table border='1'>";
				for(var ele in result) {
					console.log(result[ele]);  // 각 요소 출력 확인
					htmltxt= htmltxt + "<tr><td>no:"+result[ele].deptNo+
							"</td><td>dname"+result[ele].dname+
							"</td></tr>"
				}
				htmltxt=htmltxt+"</table>";
				$("#display").html(htmltxt);
			}
		});
	}
</script>		
<br /><br />
<a href="/testDiv">testDiv</a>
<div id="testDiv">

</div>
</body>
</html>