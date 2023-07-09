var gamePattern=[];
var userPattern=[];
var buttonColors=["red","blue","green","yellow"];
var level=0;
function nextSequence(){
    var n=Math.random();
    n=n*4;
    n=Math.floor(n);
    var randomChoosenColor=buttonColors[n];
    gamePattern.push(randomChoosenColor);
    $("#"+randomChoosenColor).fadeOut(100).fadeIn(100);
    playsound(randomChoosenColor);
    $("#level-title").text("Level "+ level);
    level=level+1;
}
function playsound(x){
    switch(x){
        case "red":
            var audio1=new Audio("sounds/red.mp3");
            audio1.play();
        case "blue":
            var audio2=new Audio("sounds/blue.mp3");
            audio2.play();
        case "green":
            var audio3=new Audio("sounds/green.mp3");
            audio3.play();
        case "yellow":
            var audio4=new Audio("sounds/yellow.mp3");
            audio4.play();
        default:
    }

}
$(".btn").click(function(){
    var userChoosenColor=this.id;
    userPattern.push(userChoosenColor);
    playsound(userChoosenColor);
    console.log(gamePattern);
    console.log(userPattern);
    $(this).addClass("pressed");
    setTimeout(function(){
        $("#"+userChoosenColor).removeClass("pressed");
    },100);
    checkanswer(userPattern.length-1);
});

$(document).keydown(function(){
    nextSequence();
});

function checkanswer(currentlevel){
    if(userPattern[currentlevel]===gamePattern[currentlevel]){
        if(userPattern.length===gamePattern.length){
            userPattern=[];
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },300);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        var audio=new Audio("sounds/wrong.mp3");
        audio.play();
        startover();
    }
}

function startover(){
    level=0;
    userPattern=[];
    gamePattern=[];
}