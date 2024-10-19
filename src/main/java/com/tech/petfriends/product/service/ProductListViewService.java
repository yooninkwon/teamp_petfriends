package com.tech.petfriends.product.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.ui.Model;

import com.tech.petfriends.product.dao.ProductDao;
import com.tech.petfriends.product.dto.ProductListViewDto;

public class ProductListViewService implements ProductService {

	ProductDao productDao;

	public ProductListViewService(ProductDao productDao) {
		this.productDao = productDao;
	}

	@Override
	public void execute(Model model) {
		// ajax에서 보낸 카테고리,필터값 받기
		Map<String, Object> param = (Map<String, Object>) model.asMap();

		// ajax에서 보낸 카테고리,필터값 옮기기
		String petType = (String) param.get("petType");
		String proType = (String) param.get("proType");
		String dfoodType = (String) param.get("dfoodType");
		String dsnackType = (String) param.get("dsnackType");
		String dgoodsType = (String) param.get("dgoodsType");
		String cfoodType = (String) param.get("cfoodType");
		String csnackType = (String) param.get("csnackType");
		String cgoodsType = (String) param.get("cgoodsType");
		String rankOption = (String) param.get("rankOption");
		List<String> priceOption = (List<String>) param.get("priceOption");
		List<String> dfs1option = (List<String>) param.get("dfs1option");
		List<String> dfs2option = (List<String>) param.get("dfs2option");
		List<String> dg1option = (List<String>) param.get("dg1option");
		List<String> dg2option = (List<String>) param.get("dg2option");
		List<String> cfs1option = (List<String>) param.get("cfs1option");
		List<String> cfs2option = (List<String>) param.get("cfs2option");
		List<String> cg1option = (List<String>) param.get("cg1option");
		List<String> cg2option = (List<String>) param.get("cg2option");

		// jsp value값 db데이터로 수정
		if (petType.equals("dog")) {
			petType = "강아지";
		} else if (petType.equals("cat")) {
			petType = "고양이";
		}

		if (proType.equals("food")) {
			proType = "사료";
		} else if (proType.equals("snack")) {
			proType = "간식";
		} else if (proType.equals("goods")) {
			proType = "용품";
		}

		if (dfoodType != null) {
		if (dfoodType.equals("dfoodtype1")) {
			dfoodType = "습식사료";
		} else if (dfoodType.equals("dfoodtype2")) {
			dfoodType = "소프트사료";
		} else if (dfoodType.equals("dfoodtype3")) {
			dfoodType = "건식사료";
		}
		}

		if (dsnackType != null) {
			if (dsnackType.equals("dsnacktype1")) {
				dsnackType = "수제간식";
			} else if (dsnackType.equals("dsnacktype2")) {
				dsnackType = "껌";
			} else if (dsnackType.equals("dsnacktype3")) {
				dsnackType = "사시미/육포";
			} 
		}

		if (dgoodsType != null) {
			if (dgoodsType.equals("dgoodstype1")) {
				dgoodsType = "배변용품";
			} else if (dgoodsType.equals("dgoodstype2")) {
				dgoodsType = "장난감";
			}
		}
		
		if (cfoodType != null) {
		if (cfoodType.equals("cfoodtype1")) {
			cfoodType = "주식캔";
		} else if (cfoodType.equals("cfoodtype2")) {
			cfoodType = "파우치";
		} else if (cfoodType.equals("cfoodtype3")) {
			cfoodType = "건식사료";
		}
		}
		
		if (csnackType != null) {
		if (csnackType.equals("csnacktype1")) {
			csnackType = "간식캔";
		} else if (csnackType.equals("csnacktype2")) {
			csnackType = "동결건조";
		} else if (csnackType.equals("csnacktype3")) {
			csnackType = "스낵";
		}
		}
		
		if (cgoodsType != null) {
		if (cgoodsType.equals("cgoodstype1")) {
			cgoodsType = "낚시대/레이져";
		} else if (cgoodsType.equals("cgoodstype2")) {
			cgoodsType = "스크래쳐/박스";
		}
		}
		
		
		if (rankOption.equals("rankopt0All")) {
			rankOption = "pro.pro_name asc";
		} else if (rankOption.equals("rankopt1")) {
			rankOption = "pro.pro_date desc";
		} else if (rankOption.equals("rankopt2")) { // 여기 리뷰많은순할때 수정해야댐
			rankOption = "pro.pro_name asc";
		} else if (rankOption.equals("rankopt3")) {
			rankOption = "proopt_finalprice asc";
		} else if (rankOption.equals("rankopt4")) {
			rankOption = "PROOPT_FINALPRICE DESC";
		}

		if (priceOption != null) {
			for (int i = 0; i < priceOption.size(); i++) {
				String type = priceOption.get(i);
				if (type.equals("priceopt1")) {
					priceOption.set(i, "PROOPT.PROOPT_FINALPRICE BETWEEN 0 AND 9999");
				} else if (type.equals("priceopt2")) {
					priceOption.set(i, "PROOPT.PROOPT_FINALPRICE BETWEEN 10000 AND 20000");
				} else if (type.equals("priceopt3")) {
					priceOption.set(i, "PROOPT.PROOPT_FINALPRICE BETWEEN 20000 AND 30000");
				} else if (type.equals("priceopt4")) {
					priceOption.set(i, "PROOPT.PROOPT_FINALPRICE > 30000");
				}
			}
		}

		if (dfs1option != null) {
			for (int i = 0; i < dfs1option.size(); i++) {
				String type = dfs1option.get(i);
				if (type.equals("dfsopt11")) {
					dfs1option.set(i, "닭");
				} else if (type.equals("dfsopt12")) {
					dfs1option.set(i, "돼지");
				} else if (type.equals("dfsopt13")) {
					dfs1option.set(i, "소");
				}
			}
		}

		if (dfs2option != null) {
			for (int i = 0; i < dfs2option.size(); i++) {
				String type = dfs2option.get(i);
				if (type.equals("dfsopt21")) {
					dfs2option.set(i, "면역력");
				} else if (type.equals("dfsopt22")) {
					dfs2option.set(i, "뼈/관절");
				} else if (type.equals("dfsopt23")) {
					dfs2option.set(i, "피부/피모");
				}
			}
		}

		if (dg1option != null) {
			for (int i = 0; i < dg1option.size(); i++) {
				String type = dg1option.get(i);
				if (type.equals("dg1opt1")) {
					dg1option.set(i, "패드");
				} else if (type.equals("dg1opt2")) {
					dg1option.set(i, "배변판");
				}
			}
		}

		if (dg2option != null) {
			for (int i = 0; i < dg2option.size(); i++) {
				String type = dg2option.get(i);
				if (type.equals("dg2opt1")) {
					dg2option.set(i, "삑삑이");
				} else if (type.equals("dg2opt2")) {
					dg2option.set(i, "바스락");
				} else if (type.equals("dg2opt3")) {
					dg2option.set(i, "기타");
				}
			}
		}

		if (cfs1option != null) {
			for (int i = 0; i < cfs1option.size(); i++) {
				String type = cfs1option.get(i);
				if (type.equals("cfsopt11")) {
					cfs1option.set(i, "연어");
				} else if (type.equals("cfsopt12")) {
					cfs1option.set(i, "닭");
				} else if (type.equals("cfsopt13")) {
					cfs1option.set(i, "돼지");
				}
			}
		}

		if (cfs2option != null) {
			for (int i = 0; i < cfs2option.size(); i++) {
				String type = cfs2option.get(i);
				if (type.equals("cfsopt21")) {
					cfs2option.set(i, "체중조절");
				} else if (type.equals("cfsopt22")) {
					cfs2option.set(i, "면역력");
				} else if (type.equals("cfsopt23")) {
					cfs2option.set(i, "피부/피모");
				}
			}
		}

		if (cg1option != null) {
			for (int i = 0; i < cg1option.size(); i++) {
				String type = cg1option.get(i);
				if (type.equals("cg1opt1")) {
					cg1option.set(i, "스틱형");
				} else if (type.equals("cg1opt2")) {
					cg1option.set(i, "낚시줄형");
				} else if (type.equals("cg1opt3")) {
					cg1option.set(i, "와이어형");
				}
			}
		}

		if (cg2option != null) {
			for (int i = 0; i < cg2option.size(); i++) {
				String type = cg2option.get(i);
				if (type.equals("cg2opt1")) {
					cg2option.set(i, "평판형");
				} else if (type.equals("cg2opt2")) {
					cg2option.set(i, "원형");
				} else if (type.equals("cg2opt3")) {
					cg2option.set(i, "수직형");
				}
			}
		}
		
		ArrayList<ProductListViewDto> list = productDao.productListView(petType, proType, dfoodType, dsnackType,
				dgoodsType, cfoodType, csnackType, cgoodsType, rankOption, priceOption, dfs1option,
				dfs2option, dg1option, dg2option, cfs1option, cfs2option, cg1option,
				cg2option);

		model.addAttribute("list", list);
	}

}
