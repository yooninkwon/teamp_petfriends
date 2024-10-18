package com.tech.petfriends.mypage.dto;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MyPetDto {
    private String pet_code;
    private String mem_code;
    private String pet_type;
    private String pet_name;
    private String pet_img;
    private String pet_breed;
    private Date pet_birth;
    private String pet_gender;
    private String pet_weight;
    private String pet_neut;
    private String pet_form;
    private String pet_care;
    private String pet_allergy;
    private String pet_main;
}
