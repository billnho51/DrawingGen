import React, { useState } from 'react';
import axios from 'axios';

export default function TextInputComponent() {
    // State to store user input
    const [inputText, setInputText] = useState('');
    const [responseText, setResponseText] = useState('');
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);

    // Function to handle the API call to the backend
    const callHuggingFaceModel = async () => {
        //try {
        //    // Make a POST request to the C# backend with the input text
        //    const response = await axios.post('http://localhost:5049/image/generate', { input: inputText });
        //    setResponseText(response.data);  // Store the response from the backend
        //    console.log(response.data);      // Log the data received from the backend (Hugging Face API response)
        //} catch (error) {
        //    console.error('Error calling Hugging Face API from app', error);
        //}

        try {
            const response = await fetch('http://localhost:5049/image/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inputText),
            });
            if (response.ok) {
                console.log("it went through")
                const temp = await response.json();
                console.log("recieved: "+ temp);
                const data = `data:image/jpeg;base64,${temp}`;
                //const imageBytes = await response.arrayBuffer();
                //const blob = new Blob([imageBytes], { type: "image/jpeg" });
                //console.log(blob);
                //const imageUrl = URL.createObjectURL(response); // Base64-encoded image from the backend
                setGeneratedImage(data);

            } else {
                console.error('Error generating image:', response.statusText);
            }
            
            //console.log("hello: "+ data);
        } catch (error) {
            console.error('Error calling the backend', error);
        }
    };

    return (
        <div>
            {/* Text input field */}
            <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter text to send to Hugging Face model"
            />
            <button onClick={callHuggingFaceModel}>Send to Model</button>
            {generatedImage && <img src={generatedImage} alt="Generated" />}
        </div>
    );
}
