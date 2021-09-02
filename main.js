var leftWrist_x = 0; 
var leftWrist_y = 0; 

var rightWrist_x = 0;
var rightWrist_y = 0; 

var score_rightwrist = 0;
var status = " ";

var score_leftwrist = 0;

song1 = " ";
song2 = " ";

song1_status = " ";
song2_status = " ";

function preload(){
    song1 = loadSound("History.mp3");
    song2 = loadSound("Story of my Life.mp3"); 
} 

function setup(){
    canvas = createCanvas(450, 450); 
    canvas.center(); 

    video = createCapture(VIDEO); 
    video.hide(); 

    poseNet = ml5.poseNet(video, modelLoaded); 
    poseNet.on("pose", gotPoses); 
}

function draw(){
    image(video, 0, 0, 450, 450);   
    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();

    if(score_rightwrist > 0.2){
        circle(rightWrist_x, rightWrist_y, 20);
        song2.stop();

        if(song1_status == false){
            song1.play(); 
            document.getElementById("song_name").innerHTML = "Name of Song: History (One Direction)"
        }
    } 

    if(score_leftwrist > 0.2){
        circle(leftWrist_x, leftWrist_y, 20);
        song1.stop();

        if(song2_status == false){
            song2.play(); 
            document.getElementById("song_name").innerHTML = "Name of Song: Story of my Life (One Direction)"; 
        }
    } 
} 

function modelLoaded(){
    console.log("Model loaded!"); 
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results); 
        score_rightwrist = results[0].pose.keypoints[10].score; 
        console.log("Score of right wrist = " + score_rightwrist);

        score_leftwrist = results[0].pose.keypoints[9].score;
        console.log("Score of left wrist = " + score_leftwrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("Left Wrist x = " + leftWrist_x + ", Left Wrist y = " + leftWrist_y); 

        rightWrist_x = results[0].pose.rightWrist.x; 
        rightWrist_y = results[0].pose.rightWrist.y; 
        console.log("Right wrist x = " + rightWrist_x + ", Right Wrist y = " + rightWrist_y);
    } 
} 