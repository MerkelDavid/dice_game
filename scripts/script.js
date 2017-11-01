'use strict'
$(document).ready(function(){

 var functionNumber=1;
 getTextInput("Welcome to Dungeon! press enter to begin","Dungeon!");
	
//characterCreation();

function displayText(description,title){
	
	displayTitleText(title);
	displayDescriptionText(description);
	
	getInput();
}

function getInput(){
	
	$("#submitButton").on("click",function(){
		functionSelector(dataValidation($("#input").text()));
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

function displayTitleText(title){
	
	$(".encounterTitle").text(title);
}

function displayDescriptionText(description){
	
	$(".descriptionText").text(description);
}
function RNG(UpperBound,lowerBound){
	
	return (Math.floor(Math.random()*parseInt(upperBound))+lowerBound);
	
}


function displayList(item1,item2,item3,item4,seed){
	
	let itemArray= [item1,item2,item3,item4];
	
	for(let i=0;i<4;i++){
		if(itemArray[i] !== undefined){
			$("#listOfOptions").append("<li>"+itemArray[i]+"</li>");	
		}
	}
	
	getInput();
	
}


function clearPage(){
	clearDescription();
	clearInput();
	clearList();
	clearTitle();
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

function functionSelector(input){
	
	clearPage();
	
	switch (functionNumber){
		
		case 1:
			getTextInput("What would you like to name yourself?","Name");
			let name = getInput();
			functionNumber++;
			break;
		case 2:
			let classType = getClassType();	
			functionNumber++;
			break;
		case 3:
			let strength = getStrength();
			functionNumber++;
			break;		
		case 4:
			let character = characterGenerator(strength,classType,name);
			if(reRollCharacter(character)){
				let character = characterGenerator(strength,classType,name);
			}
			functionNumber++;
			break;
		
	}
}

function getStrength(){
	
	let strength = displayList("strength(how much damage you do)","dexterity(how often you dodge)","Charisma(effects shop prices and gives more dialog options)","luck(How often you get a critical hit)");
	getInput();
	if (strength===1){
		return "strength";
	}
	if (strength===2){
		return "dexterity";		
	}
	if (strength===3){
		return "charisma";
	}
	if (strength===4){
		return "luck"
	}
}

function getClassType(){
	
	let classType= displayList("Adventurer(Pretty good at everything)", "Brute(MOAR STRENGTH! NO TALK)","Spy(an international man/woman of mystery)","Troll(Hue Hue Hue)");
	getInput();
	
	if (classType===1){
		return "adventurer";
	}
	if (classType===2){
		return "brute";		
	}
	if (classType===3){
		return "spy";
	}
	if (classType===4){
		return "troll"
	}
	
}

function characterGenerator(strength,classType,title){
	
	if(classType==="adventurer"){
		let character = {
			name: title,
			hp: RNG(20,13),
			strength: RNG(20,4),
			dexterity: RNG(20,4),
			charisma: RNG(20,4),
			luck: RNG(10,3)
			//inventory = ["Healing herb","key"];
		};
	}
	else if(classType==="brute"){
		let character = {
			name: title,
			hp: RNG(25,13),
			strength: RNG(25,15),
			dexterity: RNG(20,1),
			charisma: RNG(5,1),
			luck: RNG(10,1)
			//inventory = [];
		}
	}
	else if(classType==="spy"){
		let character = {
			name: title,
			hp:RNG(15,10),
			strength: RNG(12,6),
			dexterity: RNG(25,5),
			charisma: RNG(20,15),
			luck: RNG(12,4)
			//inventory["key"];
		}
	}
	else if(classType==="troll"){
		let character = {
			name: title,
			hp: RNG(20,1),
			strength: RNG(20,1),
			dexterity: RNG(20,1),
			charisma: RNG(20,1),
			luck: RNG(20,1)
			//inventory[];
		}		
	}
	
	return applyStrengths(character,strength);
}
function applyStrengths(character,strength){
		
	if(strength==="strength"){
		character.strength +=5;
	}
	else if(strength==="dexterity"){
		character.dexterity +=5;
	}
	else if(strength==="charisma"){
		character.charisma +=5;
	}
	else if(strength==="luck"){
		character.luck +=5;
	}
		
	return character;
}

function reRollCharacter(character){
	
	displayCharacterInfo(character);
	
	return getUserInput("Would you like to reroll your character?\n1.Yes\n2.No;",Confirm);
}

function displayCharacterInfo(character){
	
	$("#descriptionText").text("Name: "+character.name+"\nHP: "+character.hp+
	"\nStrength: "+character.strength+"\nDexteriry: "+character.dexterity+
	"\nCharisma: "+character.charisma+"\nluck: "+character.luck+"\nInventory");
	
	//getInventory(character);
}

function getInventory(character){}
});