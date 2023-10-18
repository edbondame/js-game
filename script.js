const score=document.querySelector('.Score');
const startScreen=document.querySelector('.startScreen');
const gameArea=document.querySelector('.gameArea');
let player={ speed:5,score:0};
let highest=0;
startScreen.addEventListener('click',start);

function start(){
    //gameArea.classList.remove('hide');
    startScreen.classList.add('hide');
    gameArea.innerHTML="";

    player.start=true;
    player.score=0;
    window.requestAnimationFrame(gamePlay);

   for(x=0;x<5;x++){
        let roadline=document.createElement('div');
        roadline.setAttribute('class','lines');
        roadline.y=(x*150);
        roadline.style.top=roadline.y+'px';
        gameArea.appendChild(roadline);
    }
    
    let car=document.createElement('div');
    car.setAttribute('class','car');
    gameArea.appendChild(car);

    player.x=car.offsetLeft;
    player.y=car.offsetTop;

    for(x=0;x<3;x++){
        let othercar=document.createElement('div');
        othercar.setAttribute('class','car2');
        othercar.y=((x+1)*350)* -1;
        othercar.style.top=othercar.y+'px';
        othercar.style.left=Math.floor(Math.random()*350) + 'px';
        gameArea.appendChild(othercar);
    }
}



let keys={ArrowUp: false, ArrowDown: false, ArrowRight: false, ArrowLeft: false};

document.addEventListener('keydown',keyDown);
document.addEventListener('keyup',keyUp);
function keyDown(ev){
    ev.preventDefault();
    keys[ev.key]=true;

}
function keyUp(ev){
    ev.preventDefault();
    keys[ev.key]=false;
    
}



function moveLines(){
    let lines=document.querySelectorAll('.lines');
    lines.forEach(function(item){
        if(item.y>=700){
            item.y-=750;
        }
        item.y+=player.speed;
        item.style.top=item.y+'px';

    })
}

function endGame(){
    player.start=false;
    startScreen.classList.remove('hide');
}

function gamePlay(){

    let car=document.querySelector('.car');
    let road=gameArea.getBoundingClientRect();

    if(player.start){

        moveLines();
        moveCar(car);
        if(keys.ArrowUp && player.y>(road.top+70)){
            player.y-=player.speed;
        }
        if(keys.ArrowDown && player.y<(road.bottom-70)){
            player.y+=player.speed;
        }
        if(keys.ArrowLeft && player.x>0){
            player.x-=player.speed;
        }
        if(keys.ArrowRight && player.x<(road.width-50)){
            player.x+=player.speed;
        }

        car.style.top=player.y + 'px';
        car.style.left=player.x + 'px';

        window.requestAnimationFrame(gamePlay);
        //console.log(player.score++);
        player.score++;
        if(player.score>=highest)
        {
            highest=player.score;
        }
        score.innerHTML="Your Score:"+ player.score+"<br><br>"+"Highest Score:"+highest;


    }
    
}


function moveCar(car){
    let other=document.querySelectorAll('.car2');
    other.forEach(function(item){
        if(isCollide(car,item)){
            console.log('HIT');
            endGame();
        }
        if(item.y>=750){
            item.y=-300;
            item.style.left=Math.floor(Math.random()*350) + 'px';
        }
        item.y+=player.speed;
        item.style.top=item.y+'px';

    })
}


function isCollide(a,b){
    aRect=a.getBoundingClientRect();
    bRect=b.getBoundingClientRect();

    return !((aRect.bottom<bRect.top)||(aRect.top>bRect.bottom)||(aRect.right<bRect.left)||(aRect.left>bRect.right));
}


function Reset(){
    highest=0;
}


