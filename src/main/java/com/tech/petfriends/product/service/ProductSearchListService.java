package com.tech.petfriends.product.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.ui.Model;

import com.tech.petfriends.product.dao.ProductDao;
import com.tech.petfriends.product.dto.ProductListViewDto;

public class ProductSearchListService implements ProductService {

	ProductDao productDao;

	public ProductSearchListService(ProductDao productDao) {
		this.productDao = productDao;
	}

	@Override
	public void execute(Model model) {

		String searchPro = (String) model.getAttribute("searchPro");
		System.out.println(searchPro);
		String mem_code = (String) model.getAttribute("memCode");
		System.out.println(mem_code + "멤코드");

		List<ProductListViewDto> allList = productDao.productSearchList();

		List<ProductListViewDto> searchList = similarList(searchPro, allList);

		// 결과를 맵에 담기
	    Map<String, Object> resultMap = new HashMap<>();
	    resultMap.put("searchList", searchList);

		if (mem_code != null && mem_code != "") {
			List<ProductListViewDto> windowList = productDao.productWindowList(mem_code);
			resultMap.put("windowList", windowList);
		}
		// 모델에 맵 추가
	    model.addAttribute("resultMap", resultMap);
	}

	public List<ProductListViewDto> similarList(String searchPro, List<ProductListViewDto> allList) {
		List<ProductListViewDto> resultList = new ArrayList<>();

		// 검색어의 공백 제거 및 벡터화
		String cleanedSearchPro = searchPro.replaceAll("\\s+", "");
		Map<CharSequence, Integer> searchProVector = createWordFrequencyVector(cleanedSearchPro);

		for (ProductListViewDto product : allList) {
			// 제품의 정보를 공백 제거 후 결합
			String cleanedProName = product.getPro_name().replaceAll("\\s+", "");
			String cleanedProPets = product.getPro_pets().replaceAll("\\s+", "");
			String cleanedProCategory = product.getPro_category().replaceAll("\\s+", "");
			String cleanedProType = product.getPro_type().replaceAll("\\s+", "");
			String cleanedTotal = cleanedProName + cleanedProPets + cleanedProCategory + cleanedProType;
				
			Map<CharSequence, Integer> productVector= createWordFrequencyVector(cleanedTotal);
			
			// 검색어 길이에 따른 가변 유사도 기준 설정
			double similarityThreshold = 0.2 + (Math.min(cleanedSearchPro.length() * 0.025, 0.7));

			// 코사인 유사도 계산
			double similarity = cosineSimilarity(searchProVector, productVector);

			// 유사도가 일정 기준 이상이면 리스트에 추가
			if (similarity > similarityThreshold) { // 유사도 제한 점점 증가
				product.setScore(similarity); // 유사도 점수 설정
				resultList.add(product);
			}
		}
		// 유사도 점수를 기준으로 내림차순 정렬
		resultList.sort((p1, p2) -> Double.compare(p2.getScore(), p1.getScore()));
		return resultList;
	}

	public Double cosineSimilarity(final Map<CharSequence, Integer> leftVector,
			final Map<CharSequence, Integer> rightVector) {
		if (leftVector == null || rightVector == null) {
			throw new IllegalArgumentException("Vectors must not be null");
		}

		final Set<CharSequence> intersection = getIntersection(leftVector, rightVector);

		final double dotProduct = dot(leftVector, rightVector, intersection);
		double d1 = 0.0d;
		for (final Integer value : leftVector.values()) {
			d1 += Math.pow(value, 2);
		}
		double d2 = 0.0d;
		for (final Integer value : rightVector.values()) {
			d2 += Math.pow(value, 2);
		}
		double cosineSimilarity;
		if (d1 <= 0.0 || d2 <= 0.0) {
			cosineSimilarity = 0.0;
		} else {
			cosineSimilarity = (double) (dotProduct / (double) (Math.sqrt(d1) * Math.sqrt(d2)));
		}
		return cosineSimilarity;
	}

	private Map<CharSequence, Integer> createWordFrequencyVector(String input) {
		Map<CharSequence, Integer> vector = new HashMap<>();
		for (char c : input.toCharArray()) {
			String key = String.valueOf(c); // 각 문자에 대해 빈도수 계산
			vector.put(key, vector.getOrDefault(key, 0) + 1);
		}
		return vector;
	}

	private Set<CharSequence> getIntersection(Map<CharSequence, Integer> leftVector, Map<CharSequence, Integer> rightVector) {
	    Set<CharSequence> intersection = new HashSet<>(leftVector.keySet());
	    intersection.retainAll(rightVector.keySet());
	    return intersection;
	}
	
	private double dot(Map<CharSequence, Integer> leftVector, Map<CharSequence, Integer> rightVector, Set<CharSequence> intersection) {
	    double dotProduct = 0.0;
	    for (CharSequence key : intersection) {
	        dotProduct += leftVector.get(key) * rightVector.get(key);
	    }
	    return dotProduct;
	}
	
}

//	private List<ProductListViewDto> similarList(String searchPro, List<ProductListViewDto> allList) {
//	    // 결과 리스트를 초기화
//	    List<ProductListViewDto> resultList = new ArrayList<>();
//
//	    // 검색어 공백 제거
//	    String cleanedSearchPro = searchPro.replaceAll("\\s+", "");
//
//	    // 검색어를 한 글자씩 나누기
//	    String[] searchProChars = cleanedSearchPro.split(""); // "아수" -> ["아", "수"]
//
//	    for (ProductListViewDto product : allList) {
//	        // 제품명, 펫타입, 카테고리, 타입을 모두 공백 제거 후 결합
//	        String cleanedProName = product.getPro_name().replaceAll("\\s+", "")
//	                + product.getPro_pets().replaceAll("\\s+", "")
//	                + product.getPro_category().replaceAll("\\s+", "")
//	                + product.getPro_type().replaceAll("\\s+", "");  // 모든 공백 제거
//
//	        // 검색어의 각 문자가 제품명에 포함되는지 체크
//	        boolean isMatch = true;
//	        for (String searchChar : searchProChars) {
//	            if (!cleanedProName.contains(searchChar)) {
//	            	
//	            	
//	            	
//	                isMatch = false;
//	                break; // 하나라도 포함되지 않으면 해당 제품은 제외
//	            }
//	        }
//
//	        // 모든 문자들이 포함되면 결과 리스트에 추가
//	        if (isMatch) {
//	            resultList.add(product);
//	        }
//	    }
//
//	    // 결과 리스트 반환
//	    return resultList;
//	}