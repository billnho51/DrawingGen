import React, { useRef, useEffect } from 'react'
import { UseOnDraw } from '../hooks'
//import { getColor } from './colorControl'
//import { getWidth } from './widthSlider'

//var color = 'black';
//var strokeWidth = 5;
interface CanvasProps {
    id: string;
    width: number;
    height: number;   
    lineColor: string;
    lineWidth: number;
    //mousePosition: { x: number; y: number };
}

const Canvas = ({id, width, height, lineColor, lineWidth }: CanvasProps) => {
    console.log("calling from canvas start color is:  " + lineColor);

    const { onMouseDown, setCanvasRef } = UseOnDraw(onDraw);
    
    const colorRef = useRef(lineColor);
    const widthRef = useRef(lineWidth);

    // Update refs whenever lineColor or lineWidth changes
    useEffect(() => {
        colorRef.current = lineColor;
        widthRef.current = lineWidth;
    }, [lineColor, lineWidth]);
    

    function onDraw(ctx: CanvasRenderingContext2D, point: any, prevDrawPosRef: any) {
        
        //ctx.beginPath();
        //ctx.arc(x, y, 3, 0, 2 * Math.PI);
        //ctx.fillStyle = "black";
        //ctx.fill();
        //console.log(point);
        const currentColor = colorRef.current;
        const currentWidth = widthRef.current;
        drawLine(prevDrawPosRef, point, ctx, currentColor, currentWidth)

    }

    function drawLine(start: { canvasX: any; canvasY: any; } ,end: { canvasX: any; canvasY: any; }, ctx: CanvasRenderingContext2D, color: string, strokeWidth: number){
        if(!start) {
            start = end;
        }
        //console.log("start is: " + start.canvasX);
        
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
            id={id}
            width={width}
            height={height}
            onMouseDown = {onMouseDown}
            style={canvasStyle}
            ref={setCanvasRef}
        />
    );

};
export default Canvas

const canvasStyle ={
    border: "1px solid black"
}