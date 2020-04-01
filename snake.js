const mR= 3/2;//vmin
const sR=5;//vmin
var step=0.1;
var nibba=0;
var rand=0;
var x=0;

var vmin=0;
var vw=window.innerWidth;
var vh=window.innerHeight;
vh < vw ? vmin=vh : vmin=vw
var temp=0;
var times=0;
var game={
	nib:0,
	score:0,
	pause:true,
	loss:false,
	start:false,
	result:[],
	abs:0,
	messi:0
}
var a=0;
var mL=0; 
var rolls=0;
var snake=document.querySelector(".snake");
var snakeX=0;
var snakeY=0;
var snakeLastPress=0;
var obstacleUP=[];
var obstacleDOWN=[];
var meal=document.querySelector(".meal");
nibba = Math.floor(Math.random()*5+1);
rand=Math.random()
meal.x = (vw*(7.5+17*nibba)-1.5*vmin)/vw
// meal.x = (vw*(7.5+17*nibba)-3*vmin)/100
meal.y=Math.floor(Math.random()*97);
meal.style.marginLeft=meal.x+"vw"
meal.style.marginTop=meal.y+"vh"
document.querySelector("#continue").addEventListener("click",function()
{
check(32)
})
window.addEventListener('keydown',this.move,false)
function move(e)
{  
	check(e.keyCode);
	 if(game.start && !game.loss)
	{
		snakeLastPress=e.keyCode
		snake.style.marginLeft=snakeX+"vw"
		snake.style.marginTop=snakeY+"vh"
	}
}
setInterval(updateSnake,1)
setInterval(checkScore,1)
function updateSnake()
{	
	game.abs=0;
	for(x=0;x<game.score;x++)
	{
		game.abs+=game.result[x]
	}
	game.messi=Math.floor(game.abs*10);

	if(!game.loss)
	{
		document.querySelector("p").innerHTML="<strong>your score is</strong> "+game.messi;
	}	
	else
	{
		document.querySelector("p").innerHTML="<strong>LOSS</strong> "
	}
	if(!game.loss && game.start)
	{
		if(snakeLastPress!=32)
		{
			check(snakeLastPress)
		}
		snake.style.marginLeft=snakeX+"vw"
		snake.style.marginTop=snakeY+"vh"
	}
}
function check(direc)
{	
	if (!game.pause)
	{
		if(direc==38) snakeY-=step //up
		else if(direc==40) snakeY+=step //down
		else if(direc==37) snakeX-=step //left
		else if(direc==39) snakeX+=step //right
	}
	if(direc==32)
	{
		console.log("pressed")
		if(!game.start)
		{	
			document.querySelector("html").classList.add("nC")
			document.querySelector(".in").style.display="none"

			game.start=true
			game.pause=false
			document.querySelector(".pause").style.opacity=0
		}
		else
		{
			game.pause === true ? game.pause=false : game.pause=true
			if(game.pause)
			{
				document.querySelector("html").classList.remove("nC")
				document.querySelector(".in").style.display="block"
				document.querySelector("#shabby").style.display="none"
				document.querySelector("#continue").style.display="block"
				document.querySelector(".pause").style.opacity=1
				document.querySelector("#reset").addEventListener("click",function()
				{
					game.score=0;
				document.querySelector("html").classList.add("nC")
				document.querySelector(".in").style.display="none"
				document.querySelector(".pause").style.opacity=0
					game.pause=false;
					game.loss=false;
					document.querySelector(".obs").innerHTML=""
					document.querySelector("p").innerHTML=""
				})
			}
			else
			{
				document.querySelector("html").classList.add("nC")
				document.querySelector(".in").style.display="none"
				document.querySelector(".pause").style.opacity=0
			}
		}	
	}	
}
function checkScore()
{
	if(!game.loss)
	{
		vh=window.innerHeight;
		vw=window.innerWidth;
		vh < vw ? vmin=vh : vmin=vw
		if(snakeX<-10) snakeX=100
		if(snakeX>100) snakeX=-10
		if(snakeY<-10) snakeY=100
		if(snakeY>100) snakeY=-10
		if(Math.pow((vw*(snakeX-meal.x)/100+vmin*0.035),2)+Math.pow((vh*(snakeY-meal.y)/100+vmin*0.035),2)<=0.004225*vmin*vmin)
		{
			console.log("touch")
			if(game.score<5)
			{
				document.querySelector(".obs").innerHTML+="<div class=\"obstacle\" id=\"obstacleUP"+ (game.score%5) +"\"></div>"
				document.querySelector(".obs").innerHTML+="<div class=\"obstacle\" id=\"obstacleDOWN"+ (game.score%5) +"\"></div>"
			}
			obstacleUP[(game.score%5)]={}
			obstacleUP[(game.score%5)].dom=document.querySelector("#obstacleUP"+ (game.score%5))
			obstacleUP[(game.score%5)].height=0;
			obstacleDOWN[(game.score%5)]={}
			obstacleDOWN[(game.score%5)].dom=document.querySelector("#obstacleDOWN"+ (game.score%5))
			for(i=0;i<=game.score%5;i++)
			{
				temp=Math.floor(Math.random()*75)
				obstacleUP[(game.score%5)].height=temp;
				obstacleUP[game.score%5].dom.style.height=temp+"vh"
				obstacleDOWN[game.score%5].dom.style.height=100-temp-25+"vh"
				obstacleDOWN[game.score%5].dom.style.marginTop=temp+25+"vh"
				obstacleUP[game.score%5].dom.style.marginLeft=15*(5-game.score%5)+2*((5-game.score%5)-1)+"vw"
				obstacleDOWN[game.score%5].dom.style.marginLeft=15*(5-game.score%5)+2*((5-game.score%5)-1)+"vw"
			}
			snake=document.querySelector(".snake");
			meal=document.querySelector(".meal");
			nibba = Math.floor(Math.random()*6);
			rand=Math.random()
			if(game.score<5)
			{
				meal.x = (vw*(7.5+17*nibba)-1.5*vmin)/vw
			}
			else
			{
				meal.x = (rand*12+nibba*15+nibba*2)
			}
			meal.y=Math.floor(Math.random()*97);
			meal.style.marginLeft=meal.x+"vw"
			meal.style.marginTop=meal.y+"vh"
			game.result[game.score]=step
			game.score++
		}
		game.score < 5 ? rolls=game.score%5-1 : rolls=4
		for (a=0;a<=rolls;a++)
		{
			mL=15*(5-a)+2*((5-a)-1)
			if(snakeX*vw+sR*vmin<=(mL+2)*vw && snakeX*vw+sR*vmin>=mL*vw && (snakeY*vh<=obstacleUP[a].height*vh || snakeY*vh+2*sR*vmin>=(25+obstacleUP[a].height)*vh))
			{
					console.log(" vertical touch")	
					game.loss=true;		
			}
			else if(snakeX*vw<=(mL+2)*vw && snakeX*vw+2*sR*vmin>=mL*vw && (snakeY*vh+sR*vmin<=obstacleUP[a].height*vh || snakeY*vh+sR*vmin>=(obstacleUP[a].height+25)*vh))
			{
					console.log(" horizental touch")	
					game.loss=true;								
			}
			else if(snakeY*vh+2*sR*vmin>=obstacleUP[a].height*vh && snakeY*vh<=obstacleUP[a].height*vh)
			{
				if(Math.pow(snakeX*vw+sR*vmin-(mL+2)*vw,2)+Math.pow(snakeY*vh+sR*vmin-obstacleUP[a].height*vh,2)<=sR*sR*vmin*vmin)
				{
					console.log("top right corner touch")	
					game.loss=true;		
				}
				else if(Math.pow(snakeX*vw+sR*vmin-mL*vw,2)+Math.pow(snakeY*vh+sR*vmin-obstacleUP[a].height*vh,2)<=sR*sR*vmin*vmin)
				{
					console.log("top left corner touch")	
					game.loss=true;		
				}
			}
			else if(snakeY*vh+2*sR*vmin>=(25+obstacleUP[a].height)*vh && snakeY*vh<=(25+obstacleUP[a].height)*vh)
			{
				if(Math.pow(snakeX*vw+sR*vmin-(mL+2)*vw,2)+Math.pow(snakeY*vh+sR*vmin-(25+obstacleUP[a].height)*vh,2)<=sR*sR*vmin*vmin)
				{
					console.log("bottom right corner touch")	
					game.loss=true;		
				}
				else if(Math.pow(snakeX*vw+sR*vmin-mL*vw,2)+Math.pow(snakeY*vh+sR*vmin-(25+obstacleUP[a].height)*vh,2)<=sR*sR*vmin*vmin)
				{
					console.log("bottom left corner touch")	
					game.loss=true;		
				}
			}
		}
	}
	else
	{
		document.querySelector("#reset").addEventListener("click",function()
				{
					game.score=0;
				document.querySelector("html").classList.add("nC")
				document.querySelector(".in").style.display="none"
				document.querySelector(".pause").style.opacity=0
					game.pause=false;
					game.loss=false;
					document.querySelector(".obs").innerHTML=""
					document.querySelector("p").innerHTML=""
				})
		document.querySelector("html").classList.remove("nC")
		document.querySelector(".in").style.display="block"
		document.querySelector("#shabby").style.display="block"
		document.querySelector("#continue").style.display="none"
		document.querySelector(".pause").style.opacity=1
		document.querySelector("p").innerHTML="<strong>LOSS</strong>"
		if (game.messi<10)
		{
			document.querySelector("#shabby").innerHTML="<p><strong> NOOB </strong> your score is :  <br>"+game.messi+"<br> get good son</p>"
		}
		else if(game.messi<20)
		{
			document.querySelector("#shabby").innerHTML="<p><strong> GOOD </strong><br> your score is :  <br>"+game.messi+"<br> not too shabby </p>"
		}
		else
		{
			document.querySelector("#shabby").innerHTML="<p style=\"font-size:4vmin;\"><strong> GREAT </strong><br> your score is :  <br>"+game.messi+"<br> thanks for wasting your time </p>"
		}
	}
}
document.getElementById("myRange").oninput = function() {
  step=this.value*0.01
}
