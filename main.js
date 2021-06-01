Webcam.set({
    height: 360,
    width:300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach( camera );

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'">'
    });
}

console.log('ml5 version: ' , ml5.version)
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/80qudUNrO/model.json',modelLoaded)

function modelLoaded(){
    console.log("Model Loaded!")
}

//Function called when clicked on Identify image button
function check(){
    //storing the captured image in an img variable
    img = document.getElementById("captured_image");
    //Calling the function gotResults
    //Runing the loaded model
    classifier.classify(img, gotResults);
}
//function called in check function
function gotResults(error , results)
{
    //checking if there is an error
    if(error){
        //putting the error on the console panel
        console.error(error);
    }
    else{
        //if no error setting the results on the console panel
            console.log(results);
            //Showing the results in its span tag in the html page
            document.getElementById("result_object_name").innerHTML = results[0].label;
            //Same for the accuracy
            document.getElementById("result_object_accuracy").innerHTML = results[0].confidence.toFixed(3);
    }
}
