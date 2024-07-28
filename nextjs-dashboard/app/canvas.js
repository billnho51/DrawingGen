import React, { useRef, useEffect } from 'react'
import {UseOnDraw} from './hooks'

var color = 'black';
var strokeWidth = 5;
const Canvas =({width,height}) => {

    const {onMouseDown, setCanvasRef} = UseOnDraw(onDraw);

    

    function onDraw(ctx, point, prevDrawPosRef){
        
        //ctx.beginPath();
        //ctx.arc(x, y, 3, 0, 2 * Math.PI);
        //ctx.fillStyle = "black";
        //ctx.fill();
        //console.log(point);
        drawLine(prevDrawPosRef, point, ctx, color, strokeWidth )

    }

    function drawLine(start ,end, ctx, color, strokeWidth){
        if(!start) {
            start = end;
        }
        //console.log("start is: " + start.canvasX);
        //console.log("end is: " + end.canvasX);
        //ctx.beginPath();
        //ctx.lineWidth = 5;
        //ctx.fillStyle = "black";
        //ctx.moveTo(prevX, prevY)
        //ctx.lineTo(x, y)
        //ctx.stroke();
        ctx.beginPath();
        //ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.strokeStyle = color; // Set line color
        ctx.lineWidth = strokeWidth ; // Set line width connecting 2 dot points
        //console.log("prev point: x: " + prevX + " y: " + prevY + " current point: x: " + x + " y: " + y );
        ctx.moveTo(start.canvasX, start.canvasY);
        ctx.lineTo(end.canvasX, end.canvasY);
        ctx.stroke();

        ctx.fillStyle = color;
        ctx.beginPath();
        //draw points at pos
        //Raddius should equal half of width to align with stroke line
        ctx.arc(start.canvasX, start.canvasY, strokeWidth * 1.0/2 ,0,2* Math.PI);
        ctx.fill();
        
    }


    return(
        <canvas
            width={width}
            height={height}
            onMouseDown = {onMouseDown}
            style={canvasStyle}
            ref={setCanvasRef}
        />
    );

};
export function updateColor(newColor){
    color = newColor;
}

export function updateWidth(newWidth){
    strokeWidth = newWidth;
}

export default Canvas

const canvasStyle ={
    border: "1px solid black"
}