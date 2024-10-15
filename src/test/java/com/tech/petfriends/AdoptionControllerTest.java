package com.tech.petfriends;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.MockMvc;


public class AdoptionControllerTest {
    @Autowired
    private MockMvc mvc;

    @Test
    @DisplayName("Open API 통신 테스트")
    public void callOpenApi() throws Exception {

		/*
		 * String dataType = "json"; String pageNo = "1";
		 * 
		 * // MultiValueMap<String, String> param = new LinkedMultiValueMap<>();
		 * 
		 * request.setAttribute("dataType", dataType); request.setAttribute("pageNo",
		 * pageNo);
		 */
        this.mvc.perform(get("/helppetf/adoptionaaa"))
                .andExpect(status().isOk())
                .andDo(print());
    }
}
