import React from 'react';

interface WidthSliderProps {
    sliderValue: number;
    onUpdateSlider: (value: number) => void;
}

export default function WidthSlider({ sliderValue, onUpdateSlider }: WidthSliderProps) {
    return (
        <input
            type="range"
            min="1"
            max="100"
            value={sliderValue}
            onChange={(e) => onUpdateSlider(Number(e.target.value))}
        />
    );
}