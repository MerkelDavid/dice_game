'use strict'

$(document).ready(function(){ 
 init();
function init(){
	displayText("Welcome to Dungeon! press enter to begin","Dungeon!");
	clearTextField();
	displayPicture("../images/skeleton.jpg");
 	clearBattleButtons();
	waitForInput (0,createCharacterObject(),false);
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

function RNG(upperBound,lowerBound){
	
	return ((Math.floor(Math.random()*parseInt(upperBound)))+lowerBound);
}

function functionSelector(input,switchNumber,character){
	var characterResult = character;

	if(switchNumber===1){
		clearBattleButtons();
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
	//path decision
	if(switchNumber===6){
		clearPage();
		displayTextField();
		displayText("Your adventure begins with you walking down a winding road ending at a fork in the road. On your left you see a small village in the distance with many people gathered near the center. On your right you see a mountainous path with a small pillar of smoke based on the top of the mountain. Which path do you choose?","");
		displayList("left (village)","right (mountain)");
		waitForInput(6,characterResult,false);
	}
	//village decision
	if(switchNumber===7){
		clearPage();
		if(input==="1"){
			displayText("You enter the village and find that the annual Harvet Fest is occuring. There are plenty of stands with many different wares to purchase. Do you...","Harvest Fest");
			displayList("visit the fortune telling tent?","See what is going on with the large crowd near you?","Investigate the dark alley");
			waitForInput(7,characterResult,false)
		}
		if(input==="2"){//mountain 1
			displayText()
			
		}
	}
	//village split
	if(switchNumber===8){
		clearPage();
		if(input==="1"){
			displayText('"Hello Travler" Says the fourtune Teller in a raspy voice."Would you like to have your fortune told or possibly something else...?"',"Fortune Teller");
			if(isCharismaticEnough(characterResult.charisma,10)){
				displayList("Ask for your fortune","Inquire about 'something else'");
			}
			else{
				displayList("Ask for your fortune");
			}
			waitForInput(8,characterResult,false);
		}
		if(input==="2"){
			displayText('You make your way over to the crowd and notice a large man holding up the lifeless corpse of a man."NOH ONE CAN DEFEET IGOR! IGOR IS CHAMPION!" the man states, while the crowd roars with excitement."WHO WILL BE NEXT TO FACE IGOR?!?!" What do you do?',"Street Fighting");
			displayList('Make your way over to the betting table','Walk into the ring');
			waitForInput(10,characterResult,false);
		}
	}
	
	//fortune split
	if(switchNumber===9){
		clearPage();
		if(input==="1"){
			displayText('"When Yee pass the Tree all you need is three and fortune will be upon thee,Hehe!" Admiring her admirable alliteration you actively abondon her establishment and head out of town',"Fortune");
			clearInput();
			clearTextField();
			displayList("press enter to continue");
			waitForInput(20,characterResult,false);
		}
		if(input==="2"){
			displayText("Well I happened to have some experimental magic I've been just dying to test on a willing user. It will give you unimaginable power for a price, that is, if you are interested...");
			displayList("Accept the offer","Decline the offer");
			waitForInput(9,characterResult,false);
		}
	}
	//curse resolution 
	if(switchNumber===10){
		clearPage();
		if(input==="1"){
			displayText('"AHH HA! You will soon see that fortune favors the bold travler!" The old witch pours a strang elixir on your head."RICKY TICKY TICK TICK TICK TICK TICK....." This goes on for about an hour and right as your patience and sanity begins to leave you she ends the spell with a loud "BOOM!" and pushes you out of her tent closing it behind  you. You feel powerful but also empty inside.Regardless you continue on your journey past the village.','The Curse');
			clearInput();
			clearTextField();
			characterResult = applyCurse(characterResult);
			refreshCharacterInfo(characterResult);
			displayList("Press enter to continue");
			waitForInput(20,characterResult,false);
		}
		if(input==="2"){
			clearInput();
			displayText('"So be it travler, I have nothing more to offer you." You nod and make your way out of the village');
			clearTextField();
			displayList("Press enter to continue");
			waitForInput(20,characterResult,false);
		}
	}
	//fight pit split
	if(switchNumber===11){
		clearPage();
		if(input==="1"){
			displayText('you walk up to a showded man behind a table surrounded by stacks of money. He simply asks "Any Bets?"');
			displayList("bet on Igor", "Bet on yourself and step into the ring");
			waitForInput(20,characterResult,false);
		}
		if(input==="2"){
			displayText('"YOU WEESH TO CHALANGE IGOR?" He takes a step forward and the groundshakes under you."THEN YOU ARE WISHING TO DIE!"',"IGOR");
			clearInput();
			displayBattleButtons();
			clearTextField();
			let outcome = battle(characterResult, getEnemyStats("Igor"),false,false);
			if (outcome==="1"){
				displayDescriptionText("you won!");
				waitForInput(20,characterResult,false);
			}
			else if (outcome ==="2"){
				switchNumber=1000;
			}
			else if (outcome=== "3"){
				displayDescriptionText("You Fled");
				waitForInput(20,characterResult,false);				
			}
		}
	}
	
	//game over
	if(switchNumber===1000){
		
			alert("Game Over");
		
	}
}

function battle(character,enemy,playerTurn,flee){
	
	clearPage();
	
	if(isDead(character) && playerTurn ===true){
		return 1;
	}
	else if(isDead(character) && playerTurn === false){
		return 2;
	}
	if(flee){
		return 3;	
	}
	
	if(playerTurn===true){playerTurn=false;}
	else if(playerTurn===false){playerTurn=true;}
	
	
	if(playerTurn){
		refreshCharacterInfo(character);
		refreshEnemyInfo(enemy);
		let didFlee = getPlayerTurn(character,enemy,false);
		console.log(didFlee);
			if (didFlee===true){
			return battle(enemy,character,playerTurn,didFlee);
		}
	}
	else if(playerTurn===false) {
		refreshCharacterInfo(enemy);
		refreshEnemyInfo(character);
		attack(character,enemy);
		return battle(enemy,character,playerTurn);
	}
	
	
}

function getPlayerTurn(character,enemy,ranOnce){
	
	document.getElementById("attackButton").onclick = function(){
		if(ranOnce===false){
			ranOnce=true;	
			attack(character,enemy);
			return false;
		}
	};
	document.getElementById("attackButton").onclick = function(){
		if(ranOnce===false){
			ranOnce=true;	
			return true;
		}
	};
	
	$("#attackButton").on("click",function(){
		if(ranOnce===false){
			ranOnce=true;	
			attack(character,enemy);
			return false;
		}
	});	
	$("#fleeButton").on("click",function(){
		if(ranOnce===false){
			ranOnce=true;	
			return true;
		}
	});		
}

function attack(character,enemy){
	
	let attackDisplay= "";
	
	if(isHit(character,enemy)){
		let damageDealt = dealDamage(character,enemy);
		if(isCrit(character)){
			damageDealt *=2;
			attackDisplay += "it's a Critial Hit!";
		}
		attackDisplay += damageDealt + "damage";
		calculateHealth(enemy,damageDealt);
		displayDescriptionText(attackDisplay);
	}
	else{displayDescriptionText("The attack missed!");}
	
}

function isHit(character,enemy){
	
	let hitChance = character.dexterity - enemy.dexterity + 35;
	
	if(hitChance>RNG(50,1)){
		return true;
	}
	
	return false;
}

function dealDamage(character,enemy){
	
	let damage= character.strength - enemy.strength;
	
	if(damage<1){damage=1;}
	
	return RNG(3,damage);
}

function calculateHealth(enemy,damageDealt){
	
	enemy.currentHP -= damageDealt;
	
}

function isDead(character){
	if(character.currentHP<=0){
		return true;
	}
	
	return false;
}

function getEnemyStats(enemy){
	
	if(enemy==="Igor"){
		var enemyStats={
			name: "Igor",
			classType: "Brute",
			emphesis: "Strength",
			currentHP:30,
			totalHP:30,
			strength:15,
			dexterity:1,
			charisma:4,
			luck: 2
			//inventory = [];
		};	
	}
		
	return enemyStats;
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

function displayEnemyHealth(enemy){
	$('#enemyInfo').append("<p>Enemy health: "+enemy.currentHP+"/"+enemy.totalHP);
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
	"\nStrength: "+character.strength+"\nDexterity: "+character.dexterity+
	"\nCharisma: "+character.charisma+"\nluck: "+character.luck);
	
	//getInventory(character);
}

function displayBattleButtons(){
	
	$('#battleButtons').append('<button type="button" class="btn btn-primary btn-group-justified" id="attackButton">Attack</button><br><button type="button" class="btn btn-primary btn-group-justified" id="fleeButton">Flee</button>)');
	
}

function clearPage(){
	clearDescription();
	clearInput();
	clearList();
	clearTitle();
	clearMap();
}

function clearCharacterInfo(){
	
	$("#characterStats").text("");
}

function clearMap(){
	
	$('#displayMap').empty();
	
}

function clearTextField(){
	
	$('#textField').empty();	
}

function clearBattleButtons(){
	
	$('#battleButtons').empty();
	
}

function clearEnemyHealth(){
	$('#enemyInfo').empty();
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

function refreshCharacterInfo(character){
	clearCharacterInfo();
	displayCharacterInfo(character);
}

function refreshEnemyInfo(enemy){
	
	clearEnemyHealth(enemy);
	displayEnemyHealth(enemy);
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
		character.totalHP= RNG(50,1);
		character.currentHP =  character.totalHP;		
		character.strength= RNG(30,1);
		character.dexterity= RNG(30,1);
		character.charisma= RNG(30,1);
		character.luck= RNG(30,1);
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

function isCharismaticEnough(charisma,check){
	
	if(charisma>=check){
		return true;
	}
		
	return false;
}

function isDexterousEnough(dexterity,check){
	
	if(dexterity>=check){
		return true;
	}
		
	return false;
}

function isStrongEnough(strength,check){
	
	if(strength>=check){
		return true;
	}
		
	return false;
}

function isLuckyEnough(luck,check){
	
	if(luck>=check){
		return true;
	}
		
	return false;
}	

function isCrit(luck){
	
	if(luck>=RNG(100,1)){
		return true;
	}
return false;
}

function applyCurse (character){
	
	character.strength = parseInt(character.strength)*3;
	character.totalHP =1;
	character.currentHP =1;
	
	return character;
	
}

});
