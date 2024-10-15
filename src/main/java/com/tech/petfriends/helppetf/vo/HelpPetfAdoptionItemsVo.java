package com.tech.petfriends.helppetf.vo;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.tech.petfriends.helppetf.deserializer.AdoptionDeserializer;
import com.tech.petfriends.helppetf.dto.AdoptionItemDto;

import lombok.Data;

// OpenData 보호 동물 조회 테스트 코드
// 응답 데이터 mapping시킬 VO

@Data
// 방식 1 - deserialize 사용 방식
/*
 * FcstItems에 Deserialize할 때, 어떤 Deserializer를 사용할지 명시해주어야 한다.
 * @JsonDeserializer 어노테이션을 추가하여 class를 설정
 */
@JsonDeserialize(using = AdoptionDeserializer.class)
//@AllArgsConstructor
public class HelpPetfAdoptionItemsVo {
	
	@JsonProperty("item")
	private List<AdoptionItemDto> adoptionItemDto;
	
	public HelpPetfAdoptionItemsVo(List<AdoptionItemDto> items) {
		this.adoptionItemDto = items;
	}
	
	// 방식 2 - 어노테이션 사용 방식
	/*
	 * Deserializer를 재사용할 일이 많이 없거나, 
	 * DTO마다 별도의 Deserializer가 필요한 경우 annotation을 사용해주는 방법도 있다.
	 */
//    @JsonCreator
//    public HelpPetfAdoptionItemsVo(@JsonProperty("response")JsonNode node) throws JsonProcessingException {
//        ObjectMapper objectMapper = new ObjectMapper();
//
//        JsonNode itemNode = node.findValue("item");
//        this.adoptionItemDto = Arrays.stream(objectMapper.treeToValue(itemNode, HelpPetfAdoptionItemDto[].class)).toList();
//    }
}
