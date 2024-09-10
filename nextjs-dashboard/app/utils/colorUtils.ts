import React from 'react'

export function randomColor() {
    
    const r = Math.floor(Math.random() * 256); // Random value between 0 and 255 for red
    const g = Math.floor(Math.random() * 256); // Random value between 0 and 255 for green
    const b = Math.floor(Math.random() * 256); // Random value between 0 and 255 for blue
    console.log("heloo, new color is: " + r +g+b);
    return `rgb(${r}, ${g}, ${b})`; // Construct a CSS RGB color string
}