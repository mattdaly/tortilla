import { useControllableState } from '@radix-ui/react-use-controllable-state';
import React from 'react';
import { useIsFormControl } from '../../hooks/useIsFormControl';
import { useMergedRef } from '../../hooks/useMergedRef';
import * as ListboxPrimitive from '../../primitives/Listbox/Listbox';
import { BubbleInput } from '../BubbleInput';

type SelectValue = ListboxPrimitive.ListboxValue;

const SelectContext = React.createContext<any>({});

type SelectValueProps = {
    children?: (value: SelectValue) => React.ReactNode;
};

const Value = (props: SelectValueProps) => {
    const { value } = React.useContext(SelectContext);

    let output;

    if (typeof props.children === 'function') {
        output = props.children(value);
    } else {
        output = value;
    }

    return <span>{output}</span>;
};

type SelectTriggerProps = React.HTMLAttributes<HTMLDivElement>;

const Trigger = React.forwardRef<HTMLDivElement, SelectTriggerProps>((props, externalRef) => {
    let context = React.useContext(SelectContext);
    // uncontrolled support
    let ref = useMergedRef<HTMLDivElement>(externalRef);
    let isFormControl = useIsFormControl(ref);

    return (
        <>
            <div {...props} ref={ref} role="combobox" />
            {isFormControl && <BubbleInput name={context.name} value={String(context.value)} />}
        </>
    );
});

type SelectContentProps = {
    children: JSX.Element[];
};

const Content = (props: SelectContentProps) => {
    let context = React.useContext(SelectContext);
    return <ListboxPrimitive.Root {...props} onChange={context.setValue} value={context.value} />;
};

type SelectOptionProps = ListboxPrimitive.ListboxOptionProps;
const Option = React.forwardRef<HTMLDivElement, SelectOptionProps>(function Option(props, ref) {
    return <ListboxPrimitive.Option {...props} ref={ref} />;
});

type SelectProps = {
    defaultValue?: SelectValue;
    children: any;
    name?: string;
    onChange?: (value: SelectValue) => void;
    value?: SelectValue;
};

const Root = (props: SelectProps) => {
    let { children, defaultValue: defaultProp, name, onChange, value: prop } = props;
    let [value, setValue] = useControllableState<SelectValue>({
        prop,
        defaultProp,
        onChange,
    });
    let context = {
        name,
        setValue,
        value,
    };

    return <SelectContext.Provider value={context}>{children}</SelectContext.Provider>;
};

export {
    Root,
    SelectProps,
    Trigger,
    SelectTriggerProps,
    Content,
    SelectContentProps,
    Option,
    SelectOptionProps,
    Value,
    SelectValueProps,
    SelectValue,
};
