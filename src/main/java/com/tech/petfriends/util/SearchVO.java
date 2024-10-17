package com.tech.petfriends.util;

/* ========================================================================================= 
 * :: 이 파일은 SearchVO의 원본입니다 ::
 * 
 * 원본은 그대로 두고 필요하신 경우 
 * 필요한 파트의 패키지에 
 * 복사해 가서 이름을 수정한 뒤 사용하세요
 * 
 * * 파일명 변경 예시) ProductSearchVO
 * 
 * 주의점: PageVO도 같이 복사해 가져가서 이름을 바꾸고 사용해야 함.
 * 		   SearchVO 내부에 extends(상속)된 PageVO를 실제 사용하는 PageVO로 변경해야 함
 * 
 * :: 사용시 이 주석 전체를 지우고 사용하세요 ::
 * ========================================================================================= */

public class SearchVO extends PageVO {

	private String bgno;
	private String searchKeyword = "";
	private String searchType = "";
	private String[] searchTypeArr;

	public String getBgno() {
		return bgno;
	}

	public void setBgno(String bgno) {
		this.bgno = bgno;
	}

	public String getSearchKeyword() {
		return searchKeyword;
	}

	public void setSearchKeyword(String searchKeyword) {
		this.searchKeyword = searchKeyword;
	}

	public String getSearchType() {
		return searchType;
	}

	public void setSearchType(String searchType) {
		this.searchType = searchType;
	}

	public String[] getSearchTypeArr() {
		return searchType.split(",");
	}

}
