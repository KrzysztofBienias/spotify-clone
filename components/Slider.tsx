'use client';

import * as RadixSlider from '@radix-ui/react-slider';

interface Props {
    value?: number;
    onChange?: (value: number) => void;
}

const Slider: React.FC<Props> = ({ value = 1, onChange }) => {
    const handleChange = (newValue: number[]) => {
        onChange?.(newValue[0]);
    };

    return (
        <RadixSlider.Root
            className="group relative flex items-center select-none touch-none w-full h-10"
            defaultValue={[1]}
            value={[value]}
            onValueChange={handleChange}
            max={1}
            step={0.01}
            aria-label="Volume"
        >
            <RadixSlider.Track className="bg-neutral-600 relative grow rounded-full h-[3px]">
                <RadixSlider.Range className="absolute rounded-full h-full bg-white group-hover:bg-green-500" />
            </RadixSlider.Track>

            <RadixSlider.Thumb className="hidden w-2 h-2 rounded-full bg-white group-hover:block" />
        </RadixSlider.Root>
    );
};

export default Slider;
