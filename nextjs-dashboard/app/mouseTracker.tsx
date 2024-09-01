'use client'
import React, { useRef, useEffect } from 'react';


let globalPos: any
let mouseClicked: any
let ctx
let isDrawingOnCanvas

export const useMousePosition = () => { 
  const [mousePosition,setMousePosition] = React.useState({ x: null, y: null });
  React.useEffect(() => {
    const updateMousePosition = (ev: { clientX: any; clientY: any; }) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  globalPos = mousePosition;
  return mousePosition;
};

export const checkMouseDown = () =>{
  const [mouseClick, setMouseDown] = React.useState(false);

  function handleMouseDown(event: any){
    if (event.detail ===2){
      //console.log("something");
    }
    setMouseDown(true);
    mouseClicked = true;
    
    //console.log("mouse down - set to "+ mouseClick );
    
  }

  function mouseMoveHandler(){
    if(mouseClicked){
      drawAtPos(globalPos.x, globalPos.y -75);
      //console.log("printing - current mouse is " + mouseClicked );
    }
    else{
      //console.log("why false");
    }
    
  }


  function handleMouseUp(){
    setMouseClicked(false);
    mouseClicked = false;
    //console.log("mouse up - set to " + mouseClick);
  }

  React.useEffect(() =>{
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', mouseMoveHandler);
    window.addEventListener('mouseup', handleMouseUp)
    return() =>{ 
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', mouseMoveHandler);
      window.removeEventListener('mouseup', handleMouseUp)

    };
  }, []);
  return mouseClick;

};



const drawAtPos = (x,y) => {
  console.log("drawing");
  ctx = document.getElementById("myCanvas").getContext("2d");
  ctx.beginPath();
  ctx.arc(x, y, 1, 0, 2 * Math.PI);
  ctx.fillStyle = "rgb(0 0 200 / 50%)";
  ctx.fill();
  ctx.lineWidth = 5;
  ctx.strokeStyle = '#003300';
  ctx.stroke(); 
}


export const MyCanvasFunction = () => {
  React.useEffect(() => {
    const c = document.getElementById("myCanvas");
    ctx = c.getContext("2d");
    ctx.fillStyle = "lightBlue"
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

  }, []);

  return (
    <div>
      <h1>HTML5 Canvas + React.js</h1>
      <canvas
        id="myCanvas"
        width="1500"
        height="500"
        style={{ border: "1px solid #d3d3d3" }}
      >
        Your browser does not support the HTML canvas tag.
      </canvas>
    </div>
  );
}

//export default useMousePosition;



