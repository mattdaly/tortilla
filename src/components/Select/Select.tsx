import React from 'react';
import * as SelectPrimitive from '../../primitives/Select/Select';
import './Select.css';

type SelectValue = SelectPrimitive.SelectValue;
type SelectOptionProps = SelectPrimitive.SelectOptionProps;

const Option = React.forwardRef<HTMLDivElement, SelectOptionProps>(function Option(props, ref) {
    return <SelectPrimitive.Option {...props} ref={ref} />;
});

type SelectProps = SelectPrimitive.SelectProps;

const Select = React.forwardRef<HTMLDivElement, SelectProps>(function Select(externalProps, ref) {
    const { children, ...props } = externalProps;

    return (
        <SelectPrimitive.Root {...props}>
            <SelectPrimitive.Trigger>
                <SelectPrimitive.Value>
                    {(value: any) =>
                        children.find((child: React.ReactElement<SelectOptionProps>) => child.props.value === value)?.props
                            .children ?? ''
                    }
                </SelectPrimitive.Value>
            </SelectPrimitive.Trigger>
            <SelectPrimitive.Content>{children}</SelectPrimitive.Content>
        </SelectPrimitive.Root>
    );
}) as React.ForwardRefExoticComponent<SelectProps> & {
    Option: React.ForwardRefExoticComponent<SelectOptionProps>;
};
Select.Option = Option;

export { Select, SelectProps, SelectValue };
