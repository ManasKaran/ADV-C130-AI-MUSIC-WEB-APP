song1 = "";
song2 = "";
left_wrist_x = 0;
left_wrist_y = 0;
right_wrist_x = 0;
right_wrist_y = 0;
leftWrist_score = 0;
rightWrist_score = 0;
song_1_status = "";
song_2_status = "";


function setup() {
    canvas = createCanvas(600, 450);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(600, 450)
    video.hide();
    pose_Net = ml5.poseNet(video, modelloaded);
    pose_Net.on('pose', gotPoses);
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        left_wrist_x = results[0].pose.leftWrist.x;
        left_wrist_y = results[0].pose.leftWrist.y;
        right_wrist_x = results[0].pose.rightWrist.x;
        right_wrist_y = results[0].pose.rightWrist.y;

        console.log("Left wrist x= " + left_wrist_x);
        console.log("Left wrist y= " + left_wrist_y);
        console.log("Right wrist x= " + right_wrist_x);
        console.log("Right wrist y= " + right_wrist_y);

        leftWrist_score = results[0].pose.keypoints[9].score;
        rightWrist_score = results[0].pose.keypoints[10].score;
        console.log(leftWrist_score);
    }
}

function modelloaded() {
    console.log("PoseNet is loaded!!!");
}

function preload() {
    song1 = loadSound("Heat_Waves.mp3");
    song2 = loadSound("Night-Changes.mp3");
}

function draw() {
    image(video, 0, 0, 600, 450);
    song_1_status = song1.isPlaying();
    song_2_status = song2.isPlaying();

    console.log(song_1_status);

    if (leftWrist_score > 0.2) {
        fill("red");
        stroke("white");
        strokeWeight(4);
        circle(left_wrist_x, left_wrist_y, 20);
        song2.stop();

        if (song_1_status == false) {
            song1.play();
            document.getElementById("song_name").innerHTML = "Heat_Waves";
        }
    }

    if (rightWrist_score > 0.2) {
        fill("red");
        stroke("white");
        strokeWeight(4);
        circle(right_wrist_x, right_wrist_y, 20);
        song1.stop();

        if (song_2_status == false) {
            song2.play();
            document.getElementById("song_name").innerHTML = "Night Changes";
        }
    }

    if (rightWrist_score > 0.2 && leftWrist_score > 0.2) {
        song1.stop();
        song2.stop();
        document.getElementById("song_name").innerHTML = "Please remove one hand from the screen";
    }


}