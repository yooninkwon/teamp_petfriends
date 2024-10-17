$(document).ready(function() {
	// 라디오 버튼이 변경될 때마다 실행
	$('input[type="radio"]').change(function() {
		// 선택된 petType과 proType 값 확인
		var petType = $('input[name="petType"]:checked').val();
		var proType = $('input[name="proType"]:checked').val();
		var df = $('input[name="dfoodType"]:checked').val();
		var ds = $('input[name="dsnackType"]:checked').val();
		var dg = $('input[name="dgoodsType"]:checked').val();
		var cf = $('input[name="cfoodType"]:checked').val();
		var cs = $('input[name="csnackType"]:checked').val();
		var cg = $('input[name="cgoodsType"]:checked').val();

		// 모든 그룹 숨기기
		$("#df, #ds, #dg, #cf, #cs, #cg, .filter > div").hide();
		// 강아지와 사료가 선택된 경우 df 표시
		if (petType === "dog" && proType === "food") {
			$("#df").show();
			// df 외의 나머지 그룹 체크 해제
			$("#ds input[type='radio'], #dg input[type='radio'], #cf input[type='radio'], #cs input[type='radio'], #cg input[type='radio']").prop('checked', false);
		}
		// 강아지와 간식이 선택된 경우 ds 표시
		else if (petType === "dog" && proType === "snack") {
			$("#ds").show();
			// ds 외의 나머지 그룹 체크 해제
			$("#df input[type='radio'], #dg input[type='radio'], #cf input[type='radio'], #cs input[type='radio'], #cg input[type='radio']").prop('checked', false);
		}
		// 강아지와 용품이 선택된 경우 dg 표시
		else if (petType === "dog" && proType === "goods") {
			$("#dg").show();
			// dg 외의 나머지 그룹 체크 해제
			$("#df input[type='radio'], #ds input[type='radio'], #cf input[type='radio'], #cs input[type='radio'], #cg input[type='radio']").prop('checked', false);
		}
		// 고양이와 사료가 선택된 경우 cf 표시
		else if (petType === "cat" && proType === "food") {
			$("#cf").show();
			// cf 외의 나머지 그룹 체크 해제
			$("#df input[type='radio'], #ds input[type='radio'], #dg input[type='radio'], #cs input[type='radio'], #cg input[type='radio']").prop('checked', false);
		}
		// 고양이와 간식이 선택된 경우 cs 표시
		else if (petType === "cat" && proType === "snack") {
			$("#cs").show();
			// cs 외의 나머지 그룹 체크 해제
			$("#df input[type='radio'], #ds input[type='radio'], #dg input[type='radio'], #cf input[type='radio'], #cg input[type='radio']").prop('checked', false);
		}
		// 고양이와 용품이 선택된 경우 cg 표시
		else if (petType === "cat" && proType === "goods") {
			$("#cg").show();
			// cg 외의 나머지 그룹 체크 해제
			$("#df input[type='radio'], #ds input[type='radio'], #dg input[type='radio'], #cf input[type='radio'], #cs input[type='radio']").prop('checked', false);
		}

		//강아지 고양이 / 사료 간식 용품 조합에 다른 라디오버튼 생성(상세타입)
		if (petType === "dog") {
			if (proType === "food" || proType === "snack") {
				if (df || ds) {
					$("#option_dfs1").show();
					$("#option_dfs2").show();
				}
			} else if (proType === "goods") {
				if (dg === "dgoodstype1") {
					$("#option_dg1").show();
				} else if (dg === "dgoodstype2")
					$("#option_dg2").show();

			}

		} else if (petType === "cat") {
			if (proType === "food" || proType === "snack") {
				if (cf || cs) {

					$("#option_cfs1").show();
					$("#option_cfs2").show();
				}
			} else if (proType === "goods") {
				if (cg === "cgoodstype1") {
					$("#option_cg1").show();
				} else if (cg === "cgoodstype2") {
					$("#option_cg2").show();
				}
			}
		}
		$("#option_price").show();
		$("#option_rank").show();
	});

	// 펫타입, 상품종류, 상품타입 체크변경시 필터옵션 체크 해제
	$('.firsttype, .thirdtype  input[type="radio"]').change(function() {
		$(".filter > div input[type='radio'], .filter > div input[type='checkbox']").prop('checked', false);
	});
	
	
	
	// 페이지 로드 시 초기 상태 설정
	$('input[type="radio"]:checked').trigger('change');



});