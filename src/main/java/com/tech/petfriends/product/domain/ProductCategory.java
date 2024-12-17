package com.tech.petfriends.product.domain;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "PRODUCT_CATEGORY")
@Setter
@Getter
public class ProductCategory {
	

 @Id //엔티티의 기본 키(primary key)임을 나타내는것
  @Column(name="id") // 칼럼의 이름을 지정 _연결된 테이블의 칼럼
  private Long id;
  
  private String name;
  
  private int depth;
  
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "parent_id")
  @JsonBackReference
  private ProductCategory parent;
    
  @OneToMany(mappedBy = "parent", fetch = FetchType.LAZY)
  @JsonManagedReference
  private List<ProductCategory> children = new ArrayList<>();
  
  
    
}
