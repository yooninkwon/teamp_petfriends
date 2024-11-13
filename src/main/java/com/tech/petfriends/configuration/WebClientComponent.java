package com.tech.petfriends.configuration;

import java.time.Duration;

import org.springframework.beans.factory.DisposableBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.DefaultUriBuilderFactory;

import reactor.netty.http.client.HttpClient;
import reactor.netty.resources.ConnectionProvider;
import reactor.netty.resources.LoopResources;

@Configuration
public class WebClientComponent implements DisposableBean {
	
    private LoopResources loopResources;
    private ConnectionProvider connectionProvider;
	
	@Bean
    DefaultUriBuilderFactory builderFactory(){
        DefaultUriBuilderFactory factory = new DefaultUriBuilderFactory();
        factory.setEncodingMode(DefaultUriBuilderFactory.EncodingMode.NONE);
        return factory;
    }

    @Bean
    WebClient webClient(){
        // LoopResources와 ConnectionProvider 설정
    	
    	// 최대 2개의 쓰레드로 구성된 네트워크 이벤트 루프 생성
        this.loopResources = LoopResources.create("webClient-loop", 2, true);
        
        // 커넥션 풀 관리 - WebClient의 연결 요청시 기존의 연결을 재사용
        this.connectionProvider = ConnectionProvider.builder("webClient-connection")
        	    .maxConnections(50) // 최대 연결 수 제한: 50
        	    .pendingAcquireTimeout(Duration.ofSeconds(30)) // 최대 연결 대기 시간: 30초
        	    .maxIdleTime(Duration.ofSeconds(20))  // 유지할 유휴 연결 시간: 20초
        	    .build();
        
        /**
         * .builder(): WebClient의 인스턴스를 구성할 때 필요한 빌더 객체를 생성
         * .uriBuilderFactory(): URI를 생성할 때 builderFactory()에서 정의한 설정을 적용
         * .defaultHeader(): 모든 요청의 헤더에 Content-Type을 application/json으로 지정
         * ReactorClientHttpConnector: WebClient가 비동기적으로 HTTP 요청을 보내고 응답을 받을 수 있게 하는 커넥터
         * .create(connectionProvider): provider를 통해 최대 연결 수, 유후 연결 해제 시간 설정하여 커넥션 풀 관리
         * .runOn(loopResources))): WebClient가 네트워크 요청을 처리하는 이벤트 루프 쓰레드 풀을 관리
         * .build(): 설정된 빌더를 바탕으로 WebClient 인스턴스를 생성하여 반환
         */
        return WebClient.builder()
                .uriBuilderFactory(builderFactory())
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .defaultHeader(HttpHeaders.CACHE_CONTROL, "max-age=3600")  // 1시간 동안 캐싱
                .clientConnector(new ReactorClientHttpConnector(
                		HttpClient.create(connectionProvider).runOn(loopResources)))
                .build();
    }

	@Override
	// DisposableBean 인터페이스에서 오버라이드함
	// 서버가 종료될 때 호출됨
	public void destroy() throws Exception {
		// LoopResources 및 ConnectionProvider 종료
		
		// 이벤트 루프에서 사용하는 리소스를 해제
        if (loopResources != null) {
            loopResources.disposeLater().block();
        }
        
        // 커넥션 풀을 종료하여 연결을 해제하여 리소스 누수 방지
        if (connectionProvider != null) {
            connectionProvider.disposeLater().block();
        }
		
	}
}
