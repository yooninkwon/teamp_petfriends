package com.tech.petfriends.util;

/* ========================================================================================= 
 * :: 이 파일은 PageVO의 원본입니다 ::
 * 
 * 원본은 그대로 두고 필요하신 경우 
 * 필요한 파트의 패키지에 
 * 복사해 가서 이름을 수정한 뒤 사용하세요
 * 
 * * 파일명 변경 예시) ProductPageVO
 * 
 * 주의점: SearchVO도 같이 복사해 가져가서 이름을 바꾸고 사용해야 함.
 * 		   SearchVO 내부에 extends(상속)된 PageVO를 실제 사용하는 PageVO로 변경해야 함
 * 
 * :: 사용시 이 주석 전체를 지우고 사용하세요 ::
 * ========================================================================================= */

public class PageVO {
	private Integer displayRowCount = 3; // 출력할 데이터 갯수
	private Integer rowStart; // 시작행 번호
	private Integer rowEnd; // 종료행 번호
	private Integer totPage; // 전체페이지 수
	private Integer totRow = 0; // 전체 데이터 수
	private Integer page; // 현재페이지
	private Integer pageStart; // 시작페이지
	private Integer pageEnd; // 종료페이지
	// 전체데이터 갯수를 이용해서 페이지 계산
	public void pageCalculate(Integer total) {
		getPage();
		totRow = total;
		totPage = (int) (total / displayRowCount);
		if (total % displayRowCount > 0) {
			totPage++;
		}
		pageStart = (page - (page - 1) % displayRowCount);
		pageEnd = pageStart + 2;
		if (pageEnd > totPage) {//
			pageEnd = totPage;
		}

		rowStart = ((page - 1) * displayRowCount) + 1;
		rowEnd = rowStart + displayRowCount - 1;
	}

	public Integer getPage() {
		if (page == null || page == 0) {
			page = 1;
		}
		return page;
	}

	public void setPage(Integer page) {
		this.page = page;
	}

	public Integer getDisplayRowCount() {
		return displayRowCount;
	}

	public void setDisplayRowCount(Integer displayRowCount) {
		this.displayRowCount = displayRowCount;
	}

	public Integer getRowStart() {
		return rowStart;
	}

	public void setRowStart(Integer rowStart) {
		this.rowStart = rowStart;
	}

	public Integer getRowEnd() {
		return rowEnd;
	}

	public void setRowEnd(Integer rowEnd) {
		this.rowEnd = rowEnd;
	}

	public Integer getTotPage() {
		return totPage;
	}

	public void setTotPage(Integer totPage) {
		this.totPage = totPage;
	}

	public Integer getTotRow() {
		return totRow;
	}

	public void setTotRow(Integer totRow) {
		this.totRow = totRow;
	}

	public Integer getPageStart() {
		return pageStart;
	}

	public void setPageStart(Integer pageStart) {
		this.pageStart = pageStart;
	}

	public Integer getPageEnd() {
		return pageEnd;
	}

	public void setPageEnd(Integer pageEnd) {
		this.pageEnd = pageEnd;
	}

}
