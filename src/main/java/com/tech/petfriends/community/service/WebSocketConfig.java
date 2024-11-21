package com.tech.petfriends.community.service;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import com.tech.petfriends.community.mapper.IDao;


@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {
	private IDao idao;
	
	public WebSocketConfig(IDao idao) {
		this.idao = idao;
	}
	
	@Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(new ChatWebSocketHandler(new CChatService(idao)), "/ws/chat/{roomId}").setAllowedOrigins("*");
        
	}
}
