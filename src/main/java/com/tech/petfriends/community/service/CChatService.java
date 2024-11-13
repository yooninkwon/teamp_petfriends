package com.tech.petfriends.community.service;

import com.tech.petfriends.community.dto.CChatDto;
import com.tech.petfriends.community.mapper.IDao;



public class CChatService {
   
	private IDao iDao;
	
	public CChatService(IDao iDao) {
		this.iDao = iDao;
	}
	
    public void saveMessage(String sender, String receiver, String messageContent) {
    	CChatDto chatMessage = new CChatDto();
        chatMessage.setSender(sender);
        chatMessage.setReceiver(receiver);
        chatMessage.setMessage_content(messageContent);
        System.out.println("sender:" +sender);
        System.out.println("receiver:" +receiver);
        System.out.println("messageContent:" +messageContent);
 
     
        
        iDao.insertMessage(sender, receiver, messageContent);
        
    }
}
