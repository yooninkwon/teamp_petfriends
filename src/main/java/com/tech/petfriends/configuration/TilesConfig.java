
package com.tech.petfriends.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.tiles3.SimpleSpringPreparerFactory;
import org.springframework.web.servlet.view.tiles3.TilesConfigurer;
import org.springframework.web.servlet.view.tiles3.TilesView;
import org.springframework.web.servlet.view.tiles3.TilesViewResolver;

@Configuration
public class TilesConfig implements WebMvcConfigurer {
	@Bean
	public TilesConfigurer tilesConfigurer() {
		
		TilesConfigurer configurer = new TilesConfigurer();
		configurer.setDefinitions(new String[] {"/WEB-INF/tiles/tilesadmin.xml","/WEB-INF/tiles/tilesmypage.xml"});
		configurer.setCheckRefresh(true);
		configurer.setPreparerFactoryClass(SimpleSpringPreparerFactory.class);
		
		return configurer;
	}
	
	@Bean 
    public TilesViewResolver tilesviewresolver() {
       TilesViewResolver resolver = new TilesViewResolver();
       resolver.setViewClass(TilesView.class);
       resolver.setOrder(1);
       
       return resolver;
    }
}
