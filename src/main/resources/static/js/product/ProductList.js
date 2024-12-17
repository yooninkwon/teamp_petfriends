$(document).ready(function() {
	//sub메뉴바 클릭 활성화
	$(document).ready(function() {
		$('#productPetItem').addClass('selected');
	});

	
	
	    optPets();
	

	let allData ; // 데이터를 전역 변수로 저장

	function optPets() {
	    $.ajax({
	        url: '/product/opt',
	        method: 'GET',
	        success: function (data) {
	            console.log(data);
	            allData = data; // 데이터를 전역 변수에 저장
				setOpt();
	        },
	    });
	}

	function setOpt() {
		
		let first = '';
		allData.forEach(category => {
		   first +=
		   		'<label class="category-btn"> <input type="radio" name="petType" value="'+category.id+'" checked>'+category.name+'</label>'
		});
		$('#main-categories').append(first);
		$("#main-categories input[type='radio']").first().prop('checked', true);
		 const firstValue = $("#main-categories input[type='radio']:checked").val(); // 선택된 값 가져오기
		    setSubCategories(firstValue); // 두 번째 카테고리 세팅
		}

		// 두 번째 카테고리 렌더링
		function setSubCategories(parentId) {
		    const selectedCategory = allData.find(category => category.id == parentId); // 선택된 카테고리 검색
		    const subCategories = selectedCategory.children || []; // 하위 카테고리 가져오기

		    let subHTML = '';
		    subCategories.forEach(sub => {
		        subHTML += `
		            <label class="category-btn">
		                <input type="radio" name="subType" value="${sub.id}">
		                ${sub.name}
		            </label>
		        `;
		    });
		    $('#sub-categories').html(subHTML); // 기존 내용을 새로 렌더링
		    $("#sub-categories input[type='radio']").first().prop('checked', true); // 첫 번째 버튼 선택
		    const firstSubValue = $("#sub-categories input[type='radio']:checked").val(); // 선택된 값 가져오기
		    setSubSubCategories(firstSubValue, subCategories); // 세 번째 카테고리 세팅
		}

		// 세 번째 카테고리 렌더링
		function setSubSubCategories(parentId, subCategories) {
		    const selectedSubCategory = subCategories.find(sub => sub.id == parentId); // 선택된 하위 카테고리 검색
		    const subSubCategories = selectedSubCategory?.children || []; // 하위 하위 카테고리 가져오기

		    let subSubHTML = '';
		    subSubCategories.forEach(subSub => {
		        subSubHTML += `
		            <label class="category-btn">
		                <input type="radio" name="subSubType" value="${subSub.id}">
		                ${subSub.name}
		            </label>
		        `;
		    });
		    $('#sub-sub-categories').html(subSubHTML); // 기존 내용을 새로 렌더링
		    $("#sub-sub-categories input[type='radio']").first().prop('checked', true); // 첫 번째 버튼 선택
			listUp();
		}

		// 첫 번째 카테고리 변경 이벤트
		$(document).on('change', "#main-categories input[type='radio']", function () {
		    const selectedValue = $(this).val(); // 선택된 값
		    setSubCategories(selectedValue); // 두 번째 카테고리 업데이트
		});

		// 두 번째 카테고리 변경 이벤트
		$(document).on('change', "#sub-categories input[type='radio']", function () {
		    const selectedValue = $(this).val(); // 선택된 값
		    const parentId = $("#main-categories input[type='radio']:checked").val();
		    const subCategories = allData.find(category => category.id == parentId)?.children || [];
		    setSubSubCategories(selectedValue, subCategories); // 세 번째 카테고리 업데이트
			
		});	
		
		// 라디오 버튼의 텍스트 값 가져오기
		function getSelectedText() {
		    // 각 카테고리에서 선택된 텍스트 값을 변수로 저장
		    let mainCategoryText = '';
		    let subCategoryText = '';
		    let subSubCategoryText = '';

		    // main-categories에서 선택된 라디오 버튼의 텍스트 값
		    const mainCategoryRadio = $('#main-categories input[type="radio"]:checked');
		    if (mainCategoryRadio.length > 0) {
		        // 해당 라디오 버튼을 감싸는 label 요소에서 텍스트 가져오기
		        mainCategoryText = mainCategoryRadio.parent('label').text().trim();
		    }

		    // sub-categories에서 선택된 라디오 버튼의 텍스트 값
		    const subCategoryRadio = $('#sub-categories input[type="radio"]:checked');
		    if (subCategoryRadio.length > 0) {
		        subCategoryText = subCategoryRadio.parent('label').text().trim();
		    }

		    // sub-sub-categories에서 선택된 라디오 버튼의 텍스트 값
		    const subSubCategoryRadio = $('#sub-sub-categories input[type="radio"]:checked');
		    if (subSubCategoryRadio.length > 0) {
		        subSubCategoryText = subSubCategoryRadio.parent('label').text().trim();
		    }

		    // 선택된 텍스트들을 콘솔에 출력
		    console.log("Main Category: ", mainCategoryText);
		    console.log("Sub Category: ", subCategoryText);
		    console.log("Sub Sub Category: ", subSubCategoryText);

		    // 결과 반환 (각각의 변수 반환)
		    return {
		        mainCategoryText,
		        subCategoryText,
		        subSubCategoryText
		    };
		}

		// 라디오 버튼 클릭 시마다 텍스트 값 업데이트
		$(document).on('change', 'input[type="radio"]', function () {
		
			listUp();
			
		});
	
	

	function listUp() {
		const selectedTexts = getSelectedText();
				
				$.ajax({
					url : '/product/list',
					method : 'GET',
					data : {first : selectedTexts.mainCategoryText,
						second : selectedTexts.subCategoryText,
						third : selectedTexts.subSubCategoryText
					},
					success : function(data){
						console.log(data);
						
						let product = '';
					    data.forEach(proData => {
							// pro_name과 main_img1을 사용하여 HTML 코드 생성
						      product += `
						          <div class="product-item">
						              <img src="/static/Images/ProductImg/MainImg/${proData.main_img1}" alt="${proData.pro_name}" class="product-image">
						              <p class="product-name">${proData.pro_name}</p>
						          </div>
						      `;
					    });
					    $('#product-List').html(product); // 기존 내용을 새로 렌더링
						
						
					}
				});
	}
	
	
	
	
	
	
	

});




