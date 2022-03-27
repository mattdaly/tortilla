import React from 'react';
import * as ListboxPrimitive from '../../primitives/Listbox/Listbox';
import './Listbox.css';

type ListboxValue = ListboxPrimitive.ListboxValue;

type ListboxOptionProps = ListboxPrimitive.ListboxOptionProps;

const Option = React.forwardRef<HTMLDivElement, ListboxOptionProps>(function Option(props, ref) {
    return <ListboxPrimitive.Option {...props} ref={ref} />;
});

type ListboxProps = Omit<ListboxPrimitive.ListboxProps, 'changeOnActive'>;

const Listbox = React.forwardRef<HTMLDivElement, ListboxProps>(function Listbox(props, ref) {
    return <ListboxPrimitive.Root {...props} changeOnActive ref={ref} />;
}) as React.ForwardRefExoticComponent<ListboxProps> & {
    Option: React.ForwardRefExoticComponent<ListboxOptionProps>;
};
Listbox.Option = Option;

export { Listbox, ListboxProps, ListboxValue };
