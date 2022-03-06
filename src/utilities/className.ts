import * as React from 'react';

export function className<T, P = {}>(
    element: React.FunctionComponent<P> | React.ComponentClass<P> | string,
    className: string | ((props: P) => string)
): React.ForwardRefExoticComponent<
    React.PropsWithoutRef<P> & React.RefAttributes<T>
> {
    return React.forwardRef<T, P>((props, ref) => {
        const forwardProps = {
            ...props,
            className: [
                typeof className === 'function' ? className(props) : className,
                props.className ?? '',
            ].join(' '),
            ref,
        };
        return React.createElement(element, forwardProps);
    });
}
