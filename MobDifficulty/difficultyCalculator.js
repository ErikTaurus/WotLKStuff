/**
 * Version 1.00.006 
 * Last code edit: 2026-02-28 16:09
 * Author: Erik Taurus
 */
const GREY = "#C0C0C0";
const GREEN = "#00FF00";
const YELLOW = "#FFFF00";
const RED = "#FF0000";
const SKULL = "#000000";
const DIFF_ERROR = "#FFB3B3";
const calcBox = document.getElementById('calcBox');
const objTf = document.getElementsByTagName('label')
const objTx = document.getElementsByClassName('input'); 
let IS_SKULL = false;
function calculate(plrLvl,mobLvl){
	let objPl = document.getElementById(plrLvl);
	let objMl = document.getElementById(mobLvl);
	let pl = objPl.value;
	let ml = objMl.value;
	
	if(!validateInput(pl,ml)){
		alert("Only integers greater than 0!");
		Array.from(objTx).forEach((that) => {
					that.value = "";
				});
		return;
	}
	
	//let lvlDiff = Math.abs(ml - pl);
	let lvlDiff = ml - pl;
	let difficulty = "";
	if(pl < 10){
		difficulty = validate1to9(lvlDiff);
	}else if(pl >= 10 && pl <=19){
		//do 10 - 19 stuff, only grey and green changes for all level ranges
		difficulty = validate10to19(lvlDiff);		
	}else if(pl >= 20 && pl <=29){
		difficulty = validate20to29(lvlDiff);
	}else if(pl >= 30 && pl <=39){
		difficulty = validate30to39(lvlDiff);
	}else if(pl >= 40 && pl <=49){ //or add || (pl>=60)
			difficulty = validate40to49(lvlDiff);
	}else if(pl == 50){
		difficulty = validate50(lvlDiff);
	}else if(pl >= 51 && pl <=54){
			difficulty = validate51to54(lvlDiff);
	}else if(pl >= 55 && pl <=59){
			difficulty = validate55to59(lvlDiff);
	}else if(pl >= 60 && pl <= 80){
		difficulty = validate40to49(lvlDiff);
	}else if(pl >80){
		alert("Not in this exansion you wont!");
		return;
	}else{
		alert("Invalid level?");
	}
	calcBox.style.backgroundColor = difficulty;
	//Last
	handleSkull();
}
function validate1to9(lvlDiff){
	console.log(lvlDiff);
	if(lvlDiff <= -5){
		return GREY; 
	}else if(lvlDiff >=-4 && lvlDiff <=-3){
		return GREEN;
	}else{
		return validateDefault(lvlDiff);	
	}
}
function validate10to19(lvlDiff){
	/*
	10 - 19
	Gray:	<=(pl - 6)
	Green:	>=(pl - 5) <= (pl - 3)
	Yellow:	>=(pl - 2) <= (pl + 2)
	Orange:	>=(pl + 3) <= (pl + 4)
	Red:	>=(pl + 5) <= (pl + 9)
	Skull:	>=(pl + 10)
	*/
	if(lvlDiff <= -6){
		//Grey
		return GREY; 
	}else if(lvlDiff >= -5 && lvlDiff <= -3){ 
		return GREEN;	
	}else{
		return validateDefault(lvlDiff);	
	}
}

function validate20to29(lvlDiff){
	/*
	20 - 29
	Gray:	<=(pl - 7)		-1 previous
	Green:	>=(pl - 6) <= (pl - 3)	-1 previous, 0
	*/
	if(lvlDiff <= -7){
		//Grey
		return GREY; 
	}else if(lvlDiff >= -6 && lvlDiff <= -3){ 
		return GREEN;	
	}else{
		return validateDefault(lvlDiff);	
	}
}

function validate30to39(lvlDiff){
	/*
	30 - 39
	Gray:	<=(pl - 8)		-1 previous
	Green:	>=(pl - 7) <= (pl - 3)	-1 previous, 0
	*/
	if(lvlDiff <= -8){
		//Grey
		return GREY; 
	}else if(lvlDiff >= -7 && lvlDiff <= -3){ 
		return GREEN;	
	}else{
		return validateDefault(lvlDiff);	
	}
}

function validate40to49(lvlDiff){
	/*
	40 - 49 [Reused @ 60+]
	Gray:	<=(pl - 9)		-1 previous
	Green:	>=(pl - 8) <= (pl - 3)	-1 previous, 0
	*/
	if(lvlDiff <= -9){
		//Grey
		return GREY; 
	}else if(lvlDiff >= -8 && lvlDiff <= -3){ 
		return GREEN;	
	}else{
		return validateDefault(lvlDiff);	
	}	
}

function validate50(lvlDiff){
	/*
	50
	Gray:	<=(pl - 10)		-1 previous
	Green:	>=(pl - 9) <= (pl - 3)	-1 previous, 0
	*/
	if(lvlDiff <= -10){
		//Grey
		return GREY; 
	}else if(lvlDiff >= -9 && lvlDiff <= -3){ 
		return GREEN;	
	}else{
		return validateDefault(lvlDiff);	
	}	
}

function validate51to54(lvlDiff){
	/*
	51 - 54
	Gray:	<=(pl - 11)		-1 previous
	Green:	>=(pl - 10) <= (pl - 3)	-1 previous, 0
	*/
	if(lvlDiff <= -11){
		//Grey
		return GREY; 
	}else if(lvlDiff >= -10 && lvlDiff <= -3){ 
		return GREEN;	
	}else{
		return validateDefault(lvlDiff);	
	}	
}

function validate55to59(lvlDiff){
	/*
	55 - 59
	Gray:	<=(pl - 12)		-1 previous
	Green:	>=(pl - 11) <= (pl - 3)	-1 previous, 0
	*/
	if(lvlDiff <= -12){
		//Grey
		return GREY; 
	}else if(lvlDiff >= -11 && lvlDiff <= -3){
		return GREEN;	
	}else{
		return validateDefault(lvlDiff);	
	}	
}

function validateDefault(lvlDiff){
	if(lvlDiff >= -2 && lvlDiff <= 2){
		return YELLOW;
	}else if(lvlDiff >= 3 && lvlDiff <=4){
		return "Orange";
	}else if(lvlDiff >= 5 && lvlDiff <=9){
			return RED;
	}else if (lvlDiff >= 10){
		//
		IS_SKULL = true;
		return SKULL;
	}else{
		//WTH?!
		return DIFF_ERROR;
	}
}

function handleSkull(){
	//Switch colour of text so it's visible if IS_SKULL
	if(IS_SKULL){
		IS_SKULL = false;
		Array.from(objTf).forEach((thing) => {
			thing.style.color = "#FFFFFF";
		});
	}else{
		Array.from(objTf).forEach((thing) => {
		  thing.style.color = "#000000";
		});
	}
}

function validateInput(pl,ml){
	console.log(`${pl}, ${ml}`);
	let plChk = (/^\d+$/.test(pl));
	let mlChk = (/^\d+$/.test(ml));
	if(!plChk || !mlChk){
		return false;
	}
	//Is a number
	if(pl <= 0 || ml <= 0){
		return false;
	}
	return true;
}