song="";
left_WristX = "";
left_WristY = "";
right_WristX = "";
right_WristY = "";

function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on('pose' , gotPoses);
}

function modelLoaded(){
    console.log("PoseNet is intialized");
}

function draw(){
    image(video , 0 ,0, 600 , 500);

    fill("#FF0000");
    stroke("#FF0000");

    circle(right_WristX , right_WristY , 20);

    if(right_WristY > 0 && right_WristY <= 100){
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5); 
    }
    else if(right_WristY > 100 && right_WristY <= 200){
        document.getElementById("speed").innerHTML = "Speed = 1x";
        song.rate(1);
    }
    else if(right_WristY > 200 && right_WristY <= 300){
        document.getElementById("speed").innerHTML = " Sped = 1.5x";
        song.rate(1.5);   
    }
    else if(right_WristY > 300 && right_WristY <= 400){
        document.getElementById("speed").innerHTML = "Speed = 2x";
        song.rate(2);
    }
    else if(right_WristY > 400 && right_WristY <= 500){
        document.getElementById("speed").innerHTML = "Speed = 2.5x";
        song.rate(2.5);
    }

    if(scoreLeftWrist > 0.2){
        circle(left_WristX , left_WristY , 20);
        in_Number_leftWristY  = Number(left_WristY);
        remove_decimals = floor(in_Number_leftWristY);
        volume = remove_decimals/500;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }
    
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results){
    if(results.length >0){
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist + "scoreRightWrist = " + scoreRightWrist); 

        left_WristX = results[0].pose.leftWrist.x;
        left_WristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X = " + left_WristX + "left Wrist Y = " + left_WristY);

        right_WristX = results[0].pose.rightWrist.x;
        right_WristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X = " + right_WristX + "Right Wrist Y = " + right_WristY);
    }
}