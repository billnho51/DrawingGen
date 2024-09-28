'use client'
import React , {useState} from "react";
import { Console } from "console";
import Canvas from './components/canvas'
import ColorControls from './components/colorControl'
import WidthSlider from './components/widthSlider'
import WeatherControl from './components/API'
import TextInputComponent from './components/TextInputComponent'


export default function page(){

    const [sliderValue, setSliderValue] = useState(1);
    const [color, setColor] = useState('black');
    const [width, setWidth] = useState(1);
    //const [imageData, setImageData] = useState<string>(''); // State to hold the image data

    function SaveFile() {
        var canvasData = document.getElementById("canvas") as HTMLCanvasElement;
        var dataURL = canvasData.toDataURL("image/jpeg");
        var base64Image = dataURL.split(',')[1];
        // Create a temporary anchor element
        const downloadLink = document.createElement('a');
        downloadLink.href = dataURL;

        // Prompt the user for a file name
        //const fileName = prompt("Enter the name for your file:", "canvas-image");
        downloadLink.download = `${"untitled"}.jpg`; // Set the filename for the download

        // Trigger the download
        downloadLink.click();
    }

    function Imagedata() {
        var canvasData = document.getElementById("canvas") as HTMLCanvasElement;
        var dataURL = canvasData.toDataURL("image/jpeg");
        var base64Image = dataURL.split(',')[1];
        //setImageData(base64Image);
        return base64Image;
        
    }


    const callSendPic = async () => {
        //try {
        //    // Make a POST request to the C# backend with the input text
        //    const response = await axios.post('http://localhost:5049/image/generate', { input: inputText });
        //    setResponseText(response.data);  // Store the response from the backend
        //    console.log(response.data);      // Log the data received from the backend (Hugging Face API response)
        //} catch (error) {
        //    console.error('Error calling Hugging Face API from app', error);
        //}
        var picData = Imagedata();
        console.log("trying to send: " + picData);
        try {
            const response = await fetch('http://localhost:5049/imageSent/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(picData),
            });
            if (response.ok) {
                console.log("it went through")
                const temp = await response.text();
                // Parse the text to JSON
                const jsonResponse = JSON.parse(temp);

                // Extract the generated_text from the first object in the array
                const extractedString = jsonResponse[0].generated_text;

                console.log("recieved: ", extractedString);
                //const imageBytes = await response.arrayBuffer();
                //const blob = new Blob([imageBytes], { type: "image/jpeg" });
                //console.log(blob);
                //const imageUrl = URL.createObjectURL(response); // Base64-encoded image from the backend
                //setGeneratedImage(data);

            } else {
                console.error('Error sending image image:', response.statusText);
            }

            //console.log("hello: "+ data);
        } catch (error) {
            console.error('Error calling the backend for image sending', error);
        }
    };

    return (
        <div>
            <p>hallo somebody</p>
            <ColorControls onUpdateColor={setColor} />
            <WeatherControl />
            <TextInputComponent />
            <WidthSlider sliderValue={width} onUpdateSlider={setWidth} />
            <Canvas id={"canvas"} width={1500} height={500} lineColor={color} lineWidth={width} />
            <button onClick={callSendPic}>SendPic</button>
            <button onClick={SaveFile}>Download</button>
        </div>
    
    );
}
//styling and css
const buttonStyle = {
    backgroundColor: 'gray',
    padding: 10, 
    // Apply borderRadius to the button 
    borderTopLeftRadius: 15, 
    borderTopRightRadius: 15, 
    borderBottomLeftRadius: 15, 
    borderBottomRightRadius: 15, 
    justifyContent: "center", 
    alignItems: "center", 
    //width: "60%", 
    // Add other styles as needed
};
