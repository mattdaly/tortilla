import {
    Input as InputPrimitive,
    InputProps,
} from '../../primitives/Input/Input';
import { className } from '../../utilities/className';

const Input = className<HTMLInputElement, InputProps>(
    InputPrimitive,
    'border-2 border-grey-500 text-sm rounded leading-8 px-2'
);

export { Input, InputProps };
