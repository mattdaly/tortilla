import {
    Button as ButtonPrimitive,
    ButtonProps as PrimitiveButtonProps,
} from '../../primitives/Button/Button';
import { className } from '../../utilities/className';

type ButtonProps = PrimitiveButtonProps & {
    appearance?: 'primary' | 'secondary';
};

const Button = className<HTMLButtonElement, ButtonProps>(
    ButtonPrimitive,
    (props: ButtonProps) => {
        const common = 'text-sm rounded leading-7 px-3 focus:outline-2';

        switch (props.appearance) {
            case 'primary':
                return [
                    'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white focus:outline-purple-800',
                    common,
                ].join(' ');

            case 'secondary':
            default:
                return [
                    'bg-gradient-to-r from-sky-200 to-blue-200 hover:from-sky-100 hover:to-blue-100 focus:outline-blue-400',
                    common,
                ].join(' ');
        }
    }
);

export { Button, ButtonProps };
