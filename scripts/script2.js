'use strict'

$(document).ready(function(){ 
 
 displayText("Welcome to Dungeon! press enter to begin","Dungeon!");
 clearTextField();
 waitForInput (0,createCharacterObject(),false);

function functionSelector(input,switchNumber,character){
	var characterResult = character;
	console.log(characterResult);
/*	switch (switchNumber){
		
		case 1:
			displayText("What would you like to name yourself?","Name");
			waitForInput();
			break;
		case 2:
			characterResult.name= input;
			clearPage();
			displayTitleText("Choose your class");
			displayList("Adventurer(Pretty good at everything)", "Brute(MOAR STRENGTH! NO TALK)","Spy(an international man/woman of mystery)","Troll(Hue Hue Hue)");
			waitForInput(1,characterResult);
			break;
		case 3:
			characterResult.classType= getClassType(input);
			clearPage();
			displayTitleText("Choose a emphesis");
			displayList("Strength", "dexterity","charisma","luck");
			waitForInput(2,characterResult);
			break;		
		case 4:
			characterResult.emphesis= getEmphesis(input);
			let characterResult = characterGenerator(characterResult.emphesis,characterResult.classType);
			if(reRollCharacter(characterResult)){
				let characterResult = characterGenerator(characterResult.emphesis,characterResult.classType);
			}
			functionNumber++;
			break;
		
	}*/

	if(switchNumber===1){
		displayText("What would you like to name yourself?","Name");
		displayTextField();
		waitForInput(1,characterResult,false);
	}
	if(switchNumber===2){
		characterResult.name= input;
		clearPage();
		displayTitleText("Choose your class");
		displayList("Adventurer(Pretty good at everything)", "Brute(MOAR STRENGTH! NO TALK)","Spy(an international man/woman of mystery)","Troll(Hue Hue Hue)");
		waitForInput(2,characterResult,false);		
	}
	if(switchNumber===3){
		characterResult.classType= getClassType(input);
		clearPage();
		displayTitleText("Choose a emphesis");
		displayList("Strength", "dexterity","charisma","luck");
		waitForInput(3,characterResult,false);		
	}
	if(switchNumber===4){
		characterResult.emphesis= getEmphesis(input);
		clearPage();
		characterResult = characterGenerator(characterResult.emphesis,characterResult.classType,character);
		displayCharacterInfo(characterResult);
		displayText("Would you like to reroll your character? (You only get one reroll)","Confirm");
		displayList("Yes","No");
		waitForInput(4,characterResult,false);	
	}	
	if(switchNumber===5){
		if(parseInt(input===1)){
			clearPage();
			clearTextField();
			characterResult = characterGenerator(characterResult.emphesis,characterResult.classType,character);
			displayCharacterInfo(characterResult);
		}
		else{
			clearPage();
			clearTextField();
		}
		displayText("press enter to continue","Final Character");
		waitForInput(5,characterResult);
	}

}

function createCharacterObject(){
	
	var character = {
		name: "",
		classType: "",
		emphesis: "",
		hp: "",
		strength: "",
		dexterity: "",
		charisma: "",
		luck: ""
		//inventory = [];
	};
	
	return character;
	
}

function waitForInput(switchNumber,character,ranOnce){
	$("#submitButton").on("click",function(){
		if(ranOnce===false){
			ranOnce=true;	
			switchNumber++;
			functionSelector($("#input").val(),switchNumber,character);
		}
	});	
}

function dataValidation(data,message){
/*	
	if(Number.isInteger(parseInt(data)) && parseInt(data)>0 && parseInt(data)<5){
		return data;
	}
	else{
		alert("please enter a valid number");
		getUserInput(message,title);
	}
*/


}

function displayText(description,title){
	
	displayTitleText(title);
	displayDescriptionText(description);
	
}

function displayTitleText(title){
	
	$(".encounterTitle").text(title);
}

function displayTextField(){
	
	$('#textField').append('<input type="text" class="form-control" id="input">');
}

function displayDescriptionText(description){
	
	$(".descriptionText").text(description);
}

function displayList(item1,item2,item3,item4,seed){
	
	let itemArray= [item1,item2,item3,item4];
	
	for(let i=0;i<4;i++){
		if(itemArray[i] !== undefined){
			$("#listOfOptions").append("<li>"+itemArray[i]+"</li>");	
		}
	}
}

function displayCharacterInfo(character){
	
	$("#characterStats").text("Name: "+character.name+"\nHP: "+character.hp+
	"\nStrength: "+character.strength+"\nDexteriry: "+character.dexterity+
	"\nCharisma: "+character.charisma+"\nluck: "+character.luck);
	
	//getInventory(character);
}

function clearPage(){
	clearDescription();
	clearInput();
	clearList();
	clearTitle();
}

function clearTextField(){
	
	$('#textField').empty();	
}

function clearTitle(){
	$('.encounterTitle').text("");	
	
}

function clearDescription(){
	$('.descriptionText').text("");
	
}
function clearInput(){
	
	$('#input').val("");
}

function clearList(){
	$('#listOfOptions').empty();

}

function getEmphesis(userChoice){
	
	if(userChoice!==undefined){
		
		if (parseInt(userChoice)===1){
			return "strength";
		}
		if (parseInt(userChoice)===2){
			return "dexterity";		
		}
		if (parseInt(userChoice)===3){
			return "charisma";
		}
		if (parseInt(userChoice)===4){
			return "luck"
		}
	}
}

function getClassType(userChoice){
	
	if(userChoice!==undefined){
		
		if (parseInt(userChoice)===1){
			return "adventurer";
		}
		if (parseInt(userChoice)===2){
			return "brute";		
		}
		if (parseInt(userChoice)===3){
			return "spy";
		}
		if (parseInt(userChoice)===4){
			return "troll"
		}
	
	}
}

function RNG(upperBound,lowerBound){
	
	return ((Math.floor(Math.random()*parseInt(upperBound))+1)+lowerBound);
	
}

function characterGenerator(emphesis,classType,character){
	
	if(classType==="adventurer"){
		character.hp= RNG(20,13);
		character.strength= RNG(20,4);
		character.dexterity= RNG(20,4);
		character.charisma= RNG(20,4);
		character.luck= RNG(10,3);
		//character.inventory = ["Healing herb","key"];
	}
	else if(classType==="brute"){
		character.hp= RNG(25,13);
		character.strength= RNG(25,15);
		character.dexterity= RNG(20,1);
		character.charisma= RNG(5,1);
		character.luck= RNG(10,1);
		//character.inventory = [];
	}
	else if(classType==="spy"){
		character.hp= RNG(15,10);
		character.strength= RNG(12,6);
		character.dexterity= RNG(25,5);
		character.charisma= RNG(20,15);
		character.luck= RNG(12,4);
		//character.inventory["key"];
	}
	else if(classType==="troll"){
		character.hp= RNG(20,1);
		character.strength= RNG(20,1);
		character.dexterity= RNG(20,1);
		character.charisma= RNG(20,1);
		character.luck= RNG(20,1);
		//character.inventory[];		
	}
	
	return applyStrengths(character,emphesis);
}
function applyStrengths(character,emphesis){
		
	if(emphesis==="strength"){
		character.strength +=5;
	}
	else if(emphesis==="dexterity"){
		character.dexterity +=5;
	}
	else if(emphesis==="charisma"){
		character.charisma +=5;
	}
	else if(emphesis==="luck"){
		character.luck +=5;
	}
		
	return character;
}

function getInventory(character){}
});