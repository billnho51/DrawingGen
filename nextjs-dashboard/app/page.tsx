'use client'
import React , {useState} from "react";
import Canvas, { updateWidth } from "./canvas";
import { Console } from "console";
import { updateColor } from "./canvas";


export default function page(){

    const [sliderValue, setSliderValue] = useState(1);

    function randomColor() {
        const r = Math.floor(Math.random() * 256); // Random value between 0 and 255 for red
        const g = Math.floor(Math.random() * 256); // Random value between 0 and 255 for green
        const b = Math.floor(Math.random() * 256); // Random value between 0 and 255 for blue
        return `rgb(${r}, ${g}, ${b})`; // Construct a CSS RGB color string
    }
    const handleUpdateColor = () => {
        updateColor(randomColor());
    };

    const handleUpdateSlider = (event: React.ChangeEvent<HTMLInputElement>) =>{
        const value = event.target.value;
        setSliderValue(Number(value));
        updateWidth(Number(value));
    }

    return (
    <div>
        <p>hallo somebody</p>
        &nbsp;&nbsp;&nbsp;
        <button type="button" onClick={handleUpdateColor} style={buttonStyle} >Random Color</button>
        &nbsp;&nbsp;&nbsp;
        <input id="typeinp" type="range" min="1" max="100" value={sliderValue} onChange= {handleUpdateSlider} step="1"/>

        <Canvas
            width={1500} height={500}
        />
        
        
        
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
