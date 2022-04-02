import React from 'react';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { useMergedRef } from '../../hooks/useMergedRef';
import { createKeyboardEvent } from '../../utilities/createKeyboardEvent';
import * as CollectionPrimitive from '../../primitives/Collection/Collection';
import { useIsFormControl } from '../../hooks/useIsFormControl';
import { BubbleInput } from '../../primitives/BubbleInput';
import { useBoundingClientRectListener } from '../../hooks/useBoundingClientRectListener';
import { Input } from '../Input/Input';
import './Listbox.css';

type ListboxValue = string | number | null;

type ListboxOptionProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'value'> & {
    children: string | JSX.Element;
    textValue?: string;
    value: ListboxValue;
};

const Option = React.forwardRef<HTMLDivElement, ListboxOptionProps>(function Option(externalProps, ref) {
    let { textValue, value, ...props } = externalProps;

    return <CollectionPrimitive.Item {...props} ref={ref} role="option" />;
});

const getOptionId = (id: string, child: React.ReactElement<ListboxOptionProps>) => `${id}-${child.props.id ?? child.props.value}`;

type ListboxProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'defaultValue' | 'onChange' | 'value'> & {
    children: React.ReactElement<ListboxOptionProps>[];
    defaultValue?: ListboxValue;
    name?: string;
    onChange?: (value: ListboxValue) => void;
    value?: ListboxValue;
};

const Listbox = React.forwardRef<HTMLDivElement, ListboxProps>(function Listbox(externalProps, externalRef) {
    let {
        children,
        defaultValue: defaultProp,
        id: nativeId,
        name,
        onChange,
        tabIndex = 0,
        value: prop,
        ...props
    } = externalProps;
    let id = nativeId ?? React.useId();
    let collectionRef = useMergedRef<HTMLDivElement>(externalRef);
    // value of the combobox
    let [value, setValue] = useControllableState<any>({
        prop,
        defaultProp,
        onChange,
    });
    // active option in the collection
    let [active, setActive] = React.useState<number>(
        value !== undefined ? children.findIndex((child) => child.props.value === value) : 0
    );
    // uncontrolled support
    let isFormControl = useIsFormControl(collectionRef);

    let handleChange = (child: React.ReactElement<ListboxOptionProps>) => {
        setValue(child.props.value);
    };
    // shortcuts follow the the WAI-ARIA recommendations for listbox
    // at https://www.w3.org/TR/wai-aria-practices/examples/combobox/combobox-autocomplete-list.html
    // the collection itself controls directional key shortcuts internally
    let handleCollectionKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (CollectionPrimitive.isAriaSelectionKey(event)) {
            if (event.key !== 'Tab') {
                event.preventDefault();
            }

            handleChange(children[active]);
        }
    };

    return (
        <>
            {isFormControl && <BubbleInput name={name} type="hidden" value={String(value)} />}
            <CollectionPrimitive.Collection
                {...props}
                active={active}
                aria-activedescendant={getOptionId(id, children[active])}
                id={id}
                onChangeActive={setActive}
                onKeyDown={handleCollectionKeyDown}
                ref={collectionRef}
                role="listbox"
                tabIndex={tabIndex}
            >
                {children.map((child) =>
                    React.cloneElement(child, {
                        'aria-selected': child.props.value === value ? true : undefined,
                        id: getOptionId(id, child),
                        onClick: () => handleChange(child),
                    })
                )}
            </CollectionPrimitive.Collection>
        </>
    );
}) as React.ForwardRefExoticComponent<ListboxProps> & {
    Option: React.ForwardRefExoticComponent<ListboxOptionProps>;
};
Listbox.Option = Option;

export { Listbox, ListboxProps, ListboxValue };
