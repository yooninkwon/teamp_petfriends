package com.tech.petfriends.helppetf.deserializer;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tech.petfriends.helppetf.dto.AdoptionItemDto;
import com.tech.petfriends.helppetf.vo.HelpPetfAdoptionItemsVo;

// JSON deserialize 작업 - Jackson 라이브러리 사용
// 데이터를 가공해 Java Object에 mapping하여 값을 반환
public class AdoptionDeserializer extends JsonDeserializer<HelpPetfAdoptionItemsVo> {
	// com.fasterxml.jackson.databind.JsonDeserializer를 구현하는 Deserializer 객체를 생성
	
	private final ObjectMapper objectMapper;

	public AdoptionDeserializer() {
		this.objectMapper = new ObjectMapper();
	}

	@Override
	public HelpPetfAdoptionItemsVo deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
		// JsonNode를 통해 mapping 
		// JSON 트리 노드로 변환
		JsonNode node = p.getCodec().readTree(p);

		// "item" 필드를 찾음 (없을 경우 null)
		JsonNode itemNode = node.findValue("item");
		
		/* @ node.함수 ::
		 * get() : 노드의 필드를 찾고 없으면 null을 반환한다.
		 * 		EX) node.get("body").get("totalCount").asInt(); 
		 * path() : 노드의 필드를 찾고 없으면 MissingNode를 반환한다.
		 * findValue() : 노드와 자식 노드들에서 필드를 찾고 없으면 null을 반환한다.
		 */
		
		// itemNode가 null 인 경우 처리
		if (itemNode == null || !itemNode.isArray()) {
			throw new IOException("invalid or missing 'item' field");
		}

		// itemNode를 DTO 배열로 변환
		// List 값을 받으려면 objectMapper.treetoValue()를 활용하여 배열로 받아 .toList() 해주어야 한다.
		List<AdoptionItemDto> items = Arrays
				.stream(objectMapper.treeToValue(itemNode, AdoptionItemDto[].class)).collect(Collectors.toList());;

		return new HelpPetfAdoptionItemsVo(items);
	}

}
