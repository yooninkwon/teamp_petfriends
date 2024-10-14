<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
</head>
<body>

<script>
	function redeptList() {
		var htmltxt="";
		console.log("1 page 요청");
		<%-- alert("<%=path %>"); --%>
		$.ajax({
			type:"post",
			async: true,
			url: "/helppetf/aaa/aaa",
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
</script>		

<a href="/testDiv">testDiv</a>
<div id="testDiv">

</div>
</body>
</html>