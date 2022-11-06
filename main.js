video_canvas = "";
status = "";
objects = [];
input_text = "";
speak_library=window.speechSynthesis;



function setup() {
    canvas = createCanvas(350, 280);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function draw() {
    image(video, 0, 0, 350, 280);
    if (status != "") {
        object_detector.detect(video, get_results);

        for (i = 0; i < objects.length; i++) {

            object_name = objects[i].label;
            if (object_name == input_text) {
                video.stop();
                object_detector.detect(get_results);
                document.getElementById("no_of_objects").innerHTML = object_name + " found";
                document.getElementById("status").innerHTML = "status: objects detected";
                utter_this=SpeechSynthesisUtterance(object_name + " found");
                speak_library.speak(utter_this);
            }
            else{
                document.getElementById("no_of_objects").innerHTML = object_name + " not found";
                document.getElementById("status").innerHTML = "status: objects detected";
            }
        }
    }
}

function start_video() {
    object_detector = ml5.objectDetector("cocossd", model_loaded);
    document.getElementById("status").innerHTML = "Status: Detecting objects";
    input_text = document.getElementById("input_object").value;
}

function model_loaded() {
    status = true;
    console.log("model loaded");
    video_canvas.loop();
    video_canvas.speed(1);
    video_canvas.volume(0);
}

function get_results(e, r) {
    if (e) {
        console.error(e);
    } else {
        console.log(r);
        objects = r;
    }
}