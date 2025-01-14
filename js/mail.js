//-------------------
var mailGroup;
var m;

var stage=1;
//an integer that denotes the current stage

//-------------------
var letter;
var message;
//--------------------------------------------------------------------------
//depending on the stage time load the notes with different sets of text then assign them a value

var mail = function(game,key){
Phaser.Sprite.call(this,game,game.camera.x+game.camera.width/2,game.camera.y+game.camera.height/2,key,null);
	console.log("Make my mailBag");
	this.scale.setTo(30,20);
	this.anchor.setTo(.5,.5);
	this.smoothed=false;
}

mail.prototype= Object.create(Phaser.Sprite.prototype);
mail.prototype.constructor=mail;


mail.prototype.makeGrid=function(){
	//when mail is made visible this function will be called
	//it orients the actual mail on the mailbag in a set grid
	//mailGroup.createMultiple(5,'mail',true);
	//mailGroup.scale.setTo(10,10);
	//mailGroup.align(game.world.centerX,game.world.centerY, 500, 500);

	for (var i=0;i<mailGroup.length;i++) {
		if(i<6){
			mailGroup.children[i].y=game.camera.y+game.camera.height/2-150;
			mailGroup.children[i].x=game.camera.x+game.camera.width/2-(375)+((i)*150);
		}else{
			mailGroup.children[i].y=game.camera.y+game.camera.height/2+125;
			mailGroup.children[i].x=game.camera.x+game.camera.width/2-(375)+((i-6)*150);
		}
	}
}
mail.prototype.addToGroup=function(object){
	if(!mailGroup){
		mailGroup=game.add.group();
	}
	var fuckYou=game.add.sprite(game.world.centerX,game.world.centerY,'mail');
	fuckYou.inputEnabled = true;
	fuckYou.scale.setTo(8,8);
	fuckYou.anchor.setTo(.5,.5);
	fuckYou.smoothed=false;
	fuckYou.events.onInputDown.add(
		function(){
			console.log("clicked");
			//check the stage nad the index of the object clicked
			//then display a new sprite on the screen with the text overlaying it
			//depending on fuckYous current pos print different text to the box
			console.log(fuckYou.x);
			console.log(fuckYou.y);
			if(letter){
				letter.kill();
				if(message){
					message.kill();
				}
			}

			letter=game.add.sprite(game.camera.x+game.camera.width/2,game.camera.y+game.camera.height/2,'letter');
			letter.smoothed=false;
			letter.anchor.setTo(.5,.5);
			letter.scale.setTo(20,20);
			game.add.existing(letter);
			var printText=function(string){
				var style = { font: "16px Arial", fill: "#000", 
		        align: "left", // the alignment of the text is independent of the bounds, try changing to 'center' or 'right'
		        boundsAlignH: "left", 
		        boundsAlignV: "top", 
		        wordWrap: true, wordWrapWidth: 300 };
        		message=game.add.text(game.camera.x+game.camera.width/2,game.camera.y+game.camera.height/2,string,style);
				message.setTextBounds(0, 0, 300, 568);
				message.anchor.setTo(.5,.5);
			}
			switch(stage){
				case 1:
					if(fuckYou.x==game.camera.x+game.camera.width/2-(375)&&fuckYou.y==game.camera.y+game.camera.height/2-150){
						printText("LETTER1\n\nDear Josh,\n    I have figured out how to make text work in game for our mail system."+
							"Its actually quite a simple system that will read the day and display the required text"+
							"in a bounded text box.\n\n\nLove, Cole");
					}else if(fuckYou.x==game.camera.x+game.camera.width/2-(375)+150&&fuckYou.y==game.camera.y+game.camera.height/2-150){
						printText("LETTER2");
					}else if(fuckYou.x==game.camera.x+game.camera.width/2-(375)+(2*150)&&fuckYou.y==game.camera.y+game.camera.height/2-150){
						printText("Letter3");
					}else if(fuckYou.x==game.camera.x+game.camera.width/2-(375)+(3*150)&&fuckYou.y==game.camera.y+game.camera.height/2-150){
						printText("randomText");
					}else if(fuckYou.x==game.camera.x+game.camera.width/2-(375)+(4*150)&&fuckYou.y==game.camera.y+game.camera.height/2-150){
						printText("randomText");
					}else if(fuckYou.x==game.camera.x+game.camera.width/2-(375)+(5*150)&&fuckYou.y==game.camera.y+game.camera.height/2-150){
						printText("randomText");
					}else if(fuckYou.x==game.camera.x+game.camera.width/2-(375)+(0*150)&&fuckYou.y==game.camera.y+game.camera.height/2+125){
						printText("killme");
					}
					break;
			}

		}, this);
	mailGroup.add(fuckYou);
	console.log(mailGroup.length);
}
mail.prototype.center=function(){
	this.x=game.camera.x+game.camera.width/2;
	this.y=game.camera.y+game.camera.height/2;
}
mail.prototype.makeVisible=function(){
	this.visible=true;
	mailGroup.visible=true;
	//place the group
	this.center();
	this.makeGrid();
}
mail.prototype.checkUp=function(){
	if(this.visible==true){
		//its visible
		return true;
	}
}
mail.prototype.makeInvisible=function(){
	this.visible=false;
	mailGroup.visible=false;
}

mail.prototype.deleteFromGroup=function(object){
	//destroy an object from a group

	//MAKE THE OBJECT INVISIBLE INSTEAD OF DELETING IT.
}
mail.prototype.update=function(){
	if(game.input.keyboard.justPressed(Phaser.Keyboard.ESC)){
		//letter.kill();
		console.log("esc");
		if(letter){
			letter.kill();
		}
		if(message){
			message.kill();
		}

	}
	for(var i=0;i<mailGroup.length;i++){
		if(mailGroup.children[i].input.pointerOver()){
			//check for click event
			mailGroup.children[i].scale.setTo(7,7);
		}else{
			mailGroup.children[i].scale.setTo(6,6);
		}	
	}
}
