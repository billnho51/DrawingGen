'use client'
import React , {useState} from "react";
import Canvas, { updateWidth } from "./components/canvas";
import { Console } from "console";
import { updateColor } from "./components/canvas";
import ColorControls from './components/colorControl'
import WidthSlider from './components/widthSlider'


export default function page(){

    const [sliderValue, setSliderValue] = useState(1);
    const [color, setColor] = useState('black');
    const [width, setWidth] = useState(1);

    return (
    <div>
        <p>hallo somebody</p>


        <ColorControls onUpdateColor={setColor} />
        <WidthSlider sliderValue={width} onUpdateSlider={setWidth} />
        <Canvas width={1500} height={500} lineColor={color} lineWidth={width} />
        
        
        
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
