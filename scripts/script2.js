'use strict'

$(document).ready(function(){ 
 
 displayText("Welcome to Dungeon! press enter to begin","Dungeon!");
 clearTextField();
 displayPicture("../images/skeleton.jpg");
 waitForInput (5,createCharacterObject(),false);

function functionSelector(input,switchNumber,character){
	var characterResult = character;

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
		if(input==="1"){
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
		waitForInput(5,characterResult,false);
	}
	if(switchNumber===6){
		clearPage();
		displayText("Your adventure begins with you walking down a winding road ending at a fork in the road. On your left you see a small village in the distance with many people gathered near the center. On your right you see a mountainous path with a small pillar of smoke based on the top of the mountain. Which path do you choose?","");
		displayList("left (village)","right (mountain)");
		waitForInput(6,characterResult,false);
	}
	if(switchNumber===7){
		if(input==="1"){
			displayText("You enter the village and find that the annual Harvet Fest is occuring. There are plenty of stands with many different wares to purchase. Do you...","Harvest Fest");
			displayList("visit the fortune telling tent?","See what is going on with the large crowd near you?","Investigate the dark alley");
			waitForInput(7,characterResult,false)
		}
		if(input==="2"){//mountain 1
			displayText()
			
		}
	}
	if(switchNumber===8){
		if(input==="1"){
			displayText('"Hello Travler" Says the fourtune Teller in a raspy voice."Would you like to have your fortune told or possibly something else...?"',"Fortune Teller");
			displayList("Ask for your fortune","Inquire about 'something else'");
			waitForInput(8,characterResult,false);
		}
	}
	if(switchNumber===8){
		if(input==="1"){
			displayText('"I see great fortune in your 
			displayList("Ask for your fortune","Inquire about 'something else'");
			waitForInput(8,characterResult,false);
		}
		if(input==="2"){
			displayText("Well I happened to have some experimental magic I've been just dying to test on a willing user. It will give you unimaginable power for a price, that is, if you are interested...");
			displayList("Accept the offer","Decline the offer");
			waitForInput(10,characterResult,false);
		}
	}
	
}

function createCharacterObject(){
	
	var character = {
		name: "",
		classType: "",
		emphesis: "",
		currentHP:"",
		totalHP: "",
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
function displayPicture(imageAdress){
        $('#displayPicture').attr('src',imageAdress);	
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

function displayList(item1,item2,item3,item4){
	
	let itemArray= [item1,item2,item3,item4];
	
	for(let i=0;i<4;i++){
		if(itemArray[i] !== undefined){
			$("#listOfOptions").append("<li>"+itemArray[i]+"</li>");	
		}
	}
}

function displayCharacterInfo(character){
	
	$("#characterStats").text("Name: "+character.name+"\nHP: "+character.currentHP+"/"+character.totalHP+
	"\nStrength: "+character.strength+"\nDexteriry: "+character.dexterity+
	"\nCharisma: "+character.charisma+"\nluck: "+character.luck);
	
	//getInventory(character);
}

function clearPage(){
	clearDescription();
	clearInput();
	clearList();
	clearTitle();
	clearMap();
}

function clearMap(){
	
	$('#displayMap').empty();
	
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
	
	return ((Math.floor(Math.random()*parseInt(upperBound)))+lowerBound);
	
}

function characterGenerator(emphesis,classType,character){
	
	if(classType==="adventurer"){
		character.totalHP= RNG(20,13);
		character.currentHP = character.totalHP;
		character.strength= RNG(20,4);
		character.dexterity= RNG(20,4);
		character.charisma= RNG(20,4);
		character.luck= RNG(10,3);
		//character.inventory = ["Healing herb","key"];
	}
	else if(classType==="brute"){
		character.totalHP= RNG(25,13);
		character.currentHP =  character.totalHP;
		character.strength= RNG(25,15);
		character.dexterity= RNG(20,1);
		character.charisma= RNG(5,1);
		character.luck= RNG(10,1);
		//character.inventory = [];
	}
	else if(classType==="spy"){
		character.totalHP= RNG(15,10);
		character.currentHP =  character.totalHP;
		character.strength= RNG(12,6);
		character.dexterity= RNG(25,5);
		character.charisma= RNG(20,15);
		character.luck= RNG(12,4);
		//character.inventory["key"];
	}
	else if(classType==="troll"){
		character.totalHP= RNG(20,1);
		character.currentHP =  character.totalHP;		
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
