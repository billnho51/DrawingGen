import { randomColor} from '../utils/colorUtils'

let color = 'blue';


export function updateColor(newColor: string) {
    
    color = newColor;
    console.log("new color is: " + color);
}

export function getColor() {
    return color;
}

interface ColorControlsProps {
    onUpdateColor: (color: string) => void;
}

export default function ColorControls({ onUpdateColor }: ColorControlsProps) {
    
    const handleUpdateColor = () => {
        const color = randomColor();
        console.log("new color from random is: " + color);
        onUpdateColor(color);
    };

    return <button onClick={handleUpdateColor}>Random Color</button>;
}