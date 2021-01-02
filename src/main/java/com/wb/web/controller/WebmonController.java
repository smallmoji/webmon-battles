package com.wb.web.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wb.web.model.Webmon;
import com.wb.web.model.properties.WebmonAttribute;
import com.wb.web.model.properties.WebmonRating;
import com.wb.web.model.properties.WebmonType;
import com.wb.web.service.WebmonService;

@RestController
public class WebmonController {
	@Autowired
	WebmonService webmonService;
	
	@RequestMapping("/getWebmon")
	HashMap<String, Object> getWebmonByName(@RequestParam("name") String name){
		return webmonService.getWebmonByName(name);
	}
	
	
	@RequestMapping("/getWebmons")
	HashMap<String, Object> getWebmons(){
		return webmonService.getWebmons();
	}
	
	@RequestMapping("/createWebmon")
	HashMap<String, Object> newWebmon(
			@RequestParam("name") String name, 
			@RequestParam("attribute") String attrib,
			@RequestParam("type")String type,
			@RequestParam("rating") String rating,
			@RequestParam("health") long health,
			@RequestParam("attack") long attack,
			@RequestParam("physicalDefense") long physicalDef,
			@RequestParam("magicDefense") long magicDef){

		Webmon webmon = new Webmon();
		webmon.setName(name);
		webmon.setRating(rating);
		webmon.setAttribute(attrib);
		webmon.setType(type);
		webmon.setAttack(attack);
		webmon.setHealth(health);
		webmon.setPhysicalDefense(physicalDef);
		webmon.setMagicDefense(magicDef);

		
		return webmonService.createWebmon(webmon);
	}
	
	@RequestMapping("/updateWebmon")
	HashMap<String, Object> updateWebmon(
			@RequestParam("webmonId") long webmonId, 
			@RequestParam("name") String name, 
			@RequestParam("attribute") String attrib,
			@RequestParam("type")String type,
			@RequestParam("rating") String rating,
			@RequestParam("health") long health,
			@RequestParam("attack") long attack,
			@RequestParam("physicalDefense") long physicalDef,
			@RequestParam("magicDefense") long magicDef){

		Webmon webmon = new Webmon();
		webmon.setWebmonId(webmonId);
		webmon.setName(name);
		webmon.setRating(rating);
		webmon.setType(type);
		webmon.setAttribute(attrib);
		webmon.setAttack(attack);
		webmon.setHealth(health);
		webmon.setPhysicalDefense(physicalDef);
		webmon.setMagicDefense(magicDef);

		
		return webmonService.updateWebmon(webmon);
	}
	
	@RequestMapping("/deleteWebmon")
	HashMap<String,String> deleteWebmon(@RequestParam("id") Long id){
		
		return webmonService.deleteWebmon(id);
	}
	
	@RequestMapping("/getWebmonTypes")
	HashMap<String,Object> getWebmonTypes(){
		HashMap<String, Object> resultMap = new HashMap<>();
		List<WebmonType> typeList = new ArrayList<WebmonType>();
		for(WebmonType type : WebmonType.values()) {
			typeList.add(type);
		}
		resultMap.put("webmonTypes", typeList);
		return resultMap;
	}
	
	@RequestMapping("/getWebmonRatings")
	HashMap<String,Object> getWebmonRating(){
		HashMap<String, Object> resultMap = new HashMap<>();
		List<WebmonRating> ratingList = new ArrayList<WebmonRating>();
		for(WebmonRating rating : WebmonRating.values()) {
			ratingList.add(rating);
		}
		resultMap.put("webmonRatings", ratingList);
		return resultMap;
	}
	
	@RequestMapping("/getWebmonAttributes")
	HashMap<String,Object> getWebmonAttribute(){
		HashMap<String, Object> resultMap = new HashMap<>();
		List<WebmonAttribute> attributeList = new ArrayList<WebmonAttribute>();
		for(WebmonAttribute attribute : WebmonAttribute.values()) {
			attributeList.add(attribute);
		}
		resultMap.put("webmonAttributes", attributeList);
		return resultMap;
	}
	
	
	
}
