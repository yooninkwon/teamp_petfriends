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

		//강아지 고양이 / 사료 간식 용품 조합에 따른 라디오버튼 생성(상세타입)
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
		$('input[name="rankOption"][value="rankopt0All"]').prop('checked', true);
	});

	// 페이지 로드 시 초기 상태 설정
	$('input[type="radio"]:checked').trigger('change');

	
	//------------------------ajax 이용한 상품리스트 조회----------------------------

	//페이지 새로 진입 및 새로고침시 상품 리스트값 ajax 전달
	sendAjaxRequest();

	// 라디오,체크박스 체크된 데이터 ajax 이용하여 값보내기
	// 라디오 버튼이 변경될 때마다 실행
	$('input[type="radio"], input[type="checkbox"]').change(function() {
		sendAjaxRequest();
	});

	//상품필터된 리스트 데이터 연걸 ajax 메소드
	function sendAjaxRequest() {
		// 선택된 라디오 value값 담기
		let petType = $('input[name="petType"]:checked').val(); //강아지,고양이
		let proType = $('input[name="proType"]:checked').val(); //사료,간식,용품
		let dfoodType = $('input[name="dfoodType"]:checked').val(); //습식사료,소프트사료,건식사료
		let dsnackType = $('input[name="dsnackType"]:checked').val(); //수제간식,껌,사시미/육포
		let dgoodsType = $('input[name="dgoodsType"]:checked').val(); //배변용품,장난감
		let cfoodType = $('input[name="cfoodType"]:checked').val(); //주식캔,파우치,건식사료
		let csnackType = $('input[name="csnackType"]:checked').val(); //간식캔,동결건조,스낵
		let cgoodsType = $('input[name="cgoodsType"]:checked').val(); // 낚시대/레이져, 스크래쳐박스
		let rankOption = $('input[name="rankOption"]:checked').val(); //필터_펫프랭킹순

		let priceOption = $('input[name="priceOption"]:checked').map(function() {
		    return $(this).val();
		}).get();
		let dfs1option = $('input[name="dfs1option"]:checked').map(function() {
		    return $(this).val();
		}).get();
		let dfs2option = $('input[name="dfs2option"]:checked').map(function() {
		    return $(this).val();
		}).get();
		let dg1option = $('input[name="dg1option"]:checked').map(function() {
		    return $(this).val();
		}).get();
		let dg2option = $('input[name="dg2option"]:checked').map(function() {
		    return $(this).val();
		}).get();
		let cfs1option = $('input[name="cfs1option"]:checked').map(function() {
		    return $(this).val();
		}).get();
		let cfs2option = $('input[name="cfs2option"]:checked').map(function() {
		    return $(this).val();
		}).get();
		let cg1option = $('input[name="cg1option"]:checked').map(function() {
		    return $(this).val();
		}).get();
		let cg2option = $('input[name="cg2option"]:checked').map(function() {
		    return $(this).val();
		}).get();
		
		
		console.log('petType:', petType);
		console.log('proType:', proType);
		console.log('proType:', dfoodType);
		console.log('proType:', dsnackType);
		console.log('proType:', dgoodsType);
		console.log('proType:', cfoodType);
		console.log('proType:', csnackType);
		console.log('proType:', cgoodsType);
		console.log('proType:', priceOption);
		console.log('proType:', rankOption);
		console.log('proType:', dfs1option);
		console.log('proType:', dfs2option);
		console.log('proType:', dg1option);
		console.log('proType:', dg2option);
		console.log('proType:', cfs1option);
		console.log('proType:', cfs2option);
		console.log('proType:', cg1option);
		console.log('proType:', cg2option);

		// AJAX 요청 보내기
		$.ajax({
			url: '/product/productlistview',  // 서버의 엔드포인트 URL
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({
				petType,
				proType,
				dfoodType,
				dsnackType,
				dgoodsType,
				cfoodType,
				csnackType,
				cgoodsType,
				rankOption,
				priceOption,
				dfs1option,
				dfs2option,
				dg1option,
				dg2option,
				cfs1option,
				cfs2option,
				cg1option,
				cg2option
			}),  // JSON 형식으로 데이터 전송
			success: function(response) {
				// 성공적으로 데이터를 전송받았을 때 실행할 코드
				console.log(response);
				// 여기서 서버로부터 받은 데이터를 바탕으로 UI를 업데이트할 수 있습니다.
				updateProductList(response);

				
				
			},
			error: function(xhr, status, error) {
				// 에러 발생 시 실행할 코드
				console.error("Error:", error);
			}
		});
	};
	
	function updateProductList(productList) {
	    // 상품 목록을 표시할 HTML 요소 선택 (예: <div id="product-list"></div>)
	    const productListContainer = $('#product-list');
	    
	    // 기존의 내용을 지웁니다.
	    productListContainer.empty();

	    // 제품 목록을 반복하며 HTML 요소를 생성
	    productList.forEach(product => {
	        const productItem = `
	            <div class="product-item">
	                <img src="/static/images/ProductImg/MainImg/${product.main_img1}"/>${product.main_img1}
	                <h3>${product.pro_name}</h3>
	                <p>가격: ${product.proopt_finalprice} 원</p>
	                <!-- 추가 정보 필요 시 더 작성 -->
	            </div>
	        `;
	        // 생성한 요소를 컨테이너에 추가
	        productListContainer.append(productItem);
	    });
	}

});




