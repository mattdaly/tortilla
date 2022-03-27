import React from 'react';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { useIsFormControl } from '../../hooks/useIsFormControl';
import { useMergedRef } from '../../hooks/useMergedRef';
import * as ListboxPrimitive from '../../primitives/Listbox/Listbox';
import { BubbleInput } from '../BubbleInput';
import { createKeyboardEvent } from '../../utilities/createKeyboardEvent';

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

const Trigger = React.forwardRef<HTMLDivElement, SelectTriggerProps>((externalProps, externalRef) => {
    let { tabIndex = 0, ...props } = externalProps;
    let context = React.useContext(SelectContext);
    // uncontrolled support
    let ref = useMergedRef<HTMLDivElement>(externalRef);
    let isFormControl = useIsFormControl(ref);

    let handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (context.open && context.contentRef?.current) {
            context.contentRef.current.dispatchEvent(createKeyboardEvent(event));
        }

        if (!event.isDefaultPrevented()) {
            if (event.key === 'Enter' || event.key === ' ') {
                context.setOpen(!context.open);
            } else if (!context.open && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
                context.setOpen(true);
            } else if (context.open && event.key === 'Escape') {
                context.setOpen(false);
            }
        }
    };

    return (
        <>
            <PopoverPrimitive.Trigger asChild aria-haspopup="listbox" type={undefined}>
                <div {...props} onKeyDown={handleKeyDown} ref={ref} role="combobox" tabIndex={tabIndex} />
            </PopoverPrimitive.Trigger>
            {isFormControl && <BubbleInput name={context.name} type="hidden" value={String(context.value)} />}
        </>
    );
});

type SelectContentProps = React.HTMLAttributes<HTMLDivElement> & {
    align?: 'start' | 'center' | 'end';
    children: JSX.Element[];
    offset?: number;
};

const Content = (externalProps: SelectContentProps) => {
    let { align = 'start', offset, ...props } = externalProps;
    let context = React.useContext(SelectContext);
    let handleChange = (value: SelectValue) => {
        context.setValue(value);
        context.setOpen(false);
    };
    return (
        <PopoverPrimitive.Content asChild align={align} onOpenAutoFocus={(event) => event.preventDefault()} sideOffset={offset}>
            <ListboxPrimitive.Root
                {...props}
                defaultValue={undefined}
                onChange={handleChange}
                ref={context.contentRef}
                tabIndex={-1}
                value={context.value}
            />
        </PopoverPrimitive.Content>
    );
};

type SelectOptionProps = ListboxPrimitive.ListboxOptionProps;
const Option = React.forwardRef<HTMLDivElement, SelectOptionProps>(function Option(props, ref) {
    let context = React.useContext(SelectContext);
    let handleClick = () => {
        context.setOpen(false);
    };
    return <ListboxPrimitive.Option {...props} onClick={handleClick} ref={ref} />;
});

type SelectProps = {
    defaultOpen?: boolean;
    defaultValue?: SelectValue;
    children: any;
    name?: string;
    onChange?: (value: SelectValue) => void;
    onOpenChange?: (open: boolean) => void;
    open?: boolean;
    value?: SelectValue;
};

const Root = (props: SelectProps) => {
    let { children, defaultOpen, defaultValue: defaultProp, name, onChange, onOpenChange, open: openProp, value: prop } = props;
    let contentRef = React.useRef(null);
    let [open, setOpen] = useControllableState<boolean>({
        prop: openProp,
        defaultProp: defaultOpen,
        onChange: onOpenChange,
    });
    let [value, setValue] = useControllableState<SelectValue>({
        prop,
        defaultProp,
        onChange,
    });
    let context = {
        contentRef,
        name,
        open,
        setOpen,
        setValue,
        value,
    };

    return (
        <SelectContext.Provider value={context}>
            <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
                {children}
            </PopoverPrimitive.Root>
        </SelectContext.Provider>
    );
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
