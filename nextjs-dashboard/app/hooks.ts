import { useEffect, useRef } from "react";

export function UseOnDraw(sth: any){
    console.log("hallo");

    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const isDrawingRef = useRef(false);
    
    //store refference to function to still have access to function after window rerenders
    //const mouseMoveListenerRef = useRef(null);
    //not using anymore since passing straigh from canvas ref
    //const mouseDownListenerRef = useRef(null);
    //const mouseUpListenerRef = useRef(null);
    //const prevDrawPosRef = useRef(null);

    // store reference to function to still have access to function after window rerenders
    const mouseMoveListenerRef = useRef<((event: MouseEvent) => void) | null>(null);
    const mouseUpListenerRef = useRef<(() => void) | null>(null);
    const prevDrawPosRef = useRef<{ canvasX: number; canvasY: number } | null>(null);


    //clean up listener after use
    useEffect(() => {
        //Initial set up after cleaning
        function onMouseUp(){
            if (!canvasRef.current) return;
            const mouseUpListener = () => {
                isDrawingRef.current = false;
                prevDrawPosRef.current = null;
            }
            //save refference to function
            mouseUpListenerRef.current = mouseUpListener
            //add window to allow to stop drawing when outside of window and mouse up
            window.addEventListener("mouseup", mouseUpListener);
        }
    
        function onMouseMove(){
            if (!canvasRef.current) return;
            const mouseMoveListener = (event: any) => {
                if (!isDrawingRef.current) return;
                const point = computeCanvasPos(event.x, event.y);
                
                //const ctx = canvasRef.current.getContext('2d');
                //ctx.fillStyle ='lightBLue'
                //ctx.beginPath();
                //ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI)
                //ctx.fill();
                
                //const myCanvas = document.getElementById("myCanvas")
                const ctx = canvasRef.current?.getContext("2d");
                //console.log(prevDrawPosRef);
                if (sth) sth( ctx, point, prevDrawPosRef.current)
                
                prevDrawPosRef.current = point;
                
            }
            mouseMoveListenerRef.current = mouseMoveListener;
            window.addEventListener("mousemove", mouseMoveListener);
    
        }

        function computeCanvasPos(x: number,y: number){
            if(canvasRef.current){
                const boundingRect = canvasRef.current.getBoundingClientRect();
                return {
                    canvasX : x- boundingRect.left,
                    canvasY : y- boundingRect.top 
                }
            } else{
                return null;
            }
        }

        function removeListener(){
            if (mouseMoveListenerRef.current){
                window.removeEventListener("mousemove", mouseMoveListenerRef.current)
            }
            if (mouseUpListenerRef.current){
                window.removeEventListener("mouseup", mouseUpListenerRef.current)
            }
        }
        //should only initialized listener when canvas is set
        //initialized listener - need to cleanup later
        onMouseMove();
        //onMouseDown();
        onMouseUp();


        console.log("cleaning");
        return () =>{
            removeListener();
        }

    },[]);

    function setCanvasRef(ref: any){
        canvasRef.current = ref;
    }

    function onMouseDown(){
        console.log("mouseDown call from canvas ref");
        isDrawingRef.current = true;
        //mouseDownListenerRef.current = mouseDownListener
        //add to canvas
        //canvasRef.current.addEventListener("mousedown", mouseDownListener);
    }
    return {
        setCanvasRef,
        onMouseDown
    }
};