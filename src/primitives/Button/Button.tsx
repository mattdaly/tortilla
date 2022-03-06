import * as React from 'react';

type ButtonProps = React.HTMLAttributes<HTMLButtonElement>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
    externalProps,
    externalRef
) {
    return <button {...externalProps} ref={externalRef} />;
});

export { Button, ButtonProps };
