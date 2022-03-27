import React from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { useMergedRef } from '../../hooks/useMergedRef';
import * as SelectPrimitive from '../../primitives/Select/Select';
import './Select.css';
import { useBoundingClientRectListener } from '../../hooks/useBoundingClientRectListener';

type SelectValue = SelectPrimitive.SelectValue;
type SelectOptionProps = SelectPrimitive.SelectOptionProps;

const Option = React.forwardRef<HTMLDivElement, SelectOptionProps>(function Option(props, ref) {
    return <SelectPrimitive.Option {...props} ref={ref} />;
});

type SelectProps = SelectPrimitive.SelectProps &
    Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'defaultValue' | 'name' | 'onChange' | 'value'>;

const Select = React.forwardRef<HTMLDivElement, SelectProps>(function Select(externalProps, externalRef) {
    let { children, defaultOpen, defaultValue, name, open: openProp, onChange, onOpenChange, value, ...props } = externalProps;
    let ref = useMergedRef<HTMLDivElement>(externalRef);
    let [open, setOpen] = useControllableState<boolean>({
        prop: openProp,
        defaultProp: defaultOpen,
        onChange: onOpenChange,
    });

    let dimensions = useBoundingClientRectListener(ref, [open]);

    return (
        <SelectPrimitive.Root
            defaultOpen={defaultOpen}
            defaultValue={defaultValue}
            name={name}
            onChange={onChange}
            onOpenChange={setOpen}
            open={open}
            value={value}
        >
            <SelectPrimitive.Trigger {...props} ref={ref}>
                <SelectPrimitive.Value>
                    {(value: any) =>
                        children.find((child: React.ReactElement<SelectOptionProps>) => child.props.value === value)?.props
                            .children ?? ''
                    }
                </SelectPrimitive.Value>
                {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </SelectPrimitive.Trigger>
            <SelectPrimitive.Content align="start" offset={3} style={{ minWidth: `${dimensions?.width}px` }}>
                {children}
            </SelectPrimitive.Content>
        </SelectPrimitive.Root>
    );
}) as React.ForwardRefExoticComponent<SelectProps> & {
    Option: React.ForwardRefExoticComponent<SelectOptionProps>;
};
Select.Option = Option;

export { Select, SelectProps, SelectValue };
