import * as React from 'react';

export function defaultProps<T, P = {}>(
    element: React.FunctionComponent<P> | React.ComponentClass<P> | string,
    props: Partial<P>
): React.ForwardRefExoticComponent<React.PropsWithoutRef<P> & React.RefAttributes<T>> {
    return React.forwardRef<T, P>((externalProps, externalRef) => {
        const forwardProps = {
            ...externalProps,
            ...props,
            ref: externalRef,
        };
        return React.createElement(element, forwardProps);
    });
}
