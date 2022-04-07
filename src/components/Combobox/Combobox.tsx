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

type ComboboxValue = string | number | null;

type ComboboxOptionProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'value'> & {
    children: string | JSX.Element;
    disabled?: boolean;
    textValue?: string;
    value: ComboboxValue;
};

const Option = React.forwardRef<HTMLDivElement, ComboboxOptionProps>(function Option(externalProps, ref) {
    let { disabled, textValue, value, ...props } = externalProps;
    return <CollectionPrimitive.Item {...props} aria-disabled={disabled ? true : undefined} ref={ref} role="option" />;
});

type ComboboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'children' | 'defaultValue' | 'onChange' | 'value'> & {
    children: React.ReactElement<ComboboxOptionProps>[];
    defaultValue?: ComboboxValue;
    disabled?: boolean;
    onChange?: (value: ComboboxValue) => void;
    value?: ComboboxValue;
};

const Combobox = React.forwardRef<HTMLInputElement, ComboboxProps>(function Combobox(externalProps, externalRef) {
    let {
        children,
        defaultValue: defaultProp,
        disabled,
        id: nativeId,
        name,
        onChange,
        tabIndex = disabled ? -1 : 0,
        value: prop,
        ...props
    } = externalProps;
    let id = nativeId ?? React.useId();
    let inputRef = useMergedRef<HTMLInputElement>(externalRef);
    let collectionRef = React.useRef<HTMLDivElement>(null);
    // active option in the collection
    let [active, setActive] = React.useState<number>(0);
    // value of the combobox
    let [value, setValue] = useControllableState<ComboboxValue>({
        prop,
        defaultProp,
        onChange,
    });
    let [query, setQuery] = React.useState(
        value !== undefined ? children.find((child) => child.props.value === value)?.props.children.toString() ?? '' : ''
    );
    let [open, setOpen] = React.useState(false);
    // align the listbox min width with the width of the input - it should never be smaller
    let dimensions = useBoundingClientRectListener(inputRef);

    // uncontrolled support
    let isFormControl = useIsFormControl(inputRef, () => {
        setValue(undefined);
        // ends up in the combobox opening because of line 96
    });

    let data = React.useMemo(() => {
        let _data = children;

        if (query?.length) {
            _data = children.filter(filterByQuery(query));
        }

        return _data;
    }, [query]);

    let handleChange = (child: React.ReactElement<ComboboxOptionProps>) => {
        setActive(0);
        setValue(child.props.value);

        setQuery(child.props.textValue ?? String(child.props.children));
        setOpen(false);
    };

    let handleInputChange = (q: string) => {
        setQuery(q);

        // annoying that we have to do this
        let items = children.filter(filterByQuery(q));

        if (items.length) {
            setActive(0);
            setOpen(true);

            // if the typed query matches a value, set that as the value
            // unsure if we want this, or at least maybe it should be case sensitive
            if (items.length === 1 && filterByQuery(q, 'matches')(items[0])) {
                setValue(items[0].props.value);
            } else {
                setValue(q);
            }
        } else {
            setValue(q);
        }
    };

    // shortcuts follow the the WAI-ARIA recommendations for textbox
    // at https://www.w3.org/TR/wai-aria-practices/examples/combobox/combobox-autocomplete-list.html
    let handleInputKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (disabled) {
            event.preventDefault();
            return;
        }

        // backspace bubbles up to the browser back functionality, we don't want that
        if (event.key === 'Backspace') {
            return;
        }

        // enter bubbles up to submit forms, we don't want that
        if (event.key === 'Enter') {
            event.preventDefault();
        }

        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();

            if (!open) {
                setOpen(true);

                if (event.key === 'ArrowUp') {
                    setActive(data.length - 1);
                } else {
                    // there is a recommended shortcut for alt + arrow down that opens the listbox with no active option
                    // but it's annoying to support undefined as well as number, so skipped it for now
                    setActive(0);
                }
            }
        } else if (event.key === 'Escape') {
            if (open) {
                setOpen(false);
            } else {
                setQuery('');
            }
        }

        // the focus should always remain on the input, so we forward events on to the listbox
        collectionRef.current?.dispatchEvent(createKeyboardEvent(event));
    };

    // shortcuts follow the the WAI-ARIA recommendations for listbox
    // at https://www.w3.org/TR/wai-aria-practices/examples/combobox/combobox-autocomplete-list.html
    // the collection itself controls directional key shortcuts internally
    let handleCollectionKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (disabled) {
            event.preventDefault();
            return;
        }

        if (CollectionPrimitive.isAriaSelectionKey(event)) {
            if (event.key !== 'Tab') {
                event.preventDefault();
            }

            handleChange(data[active]);
        }
    };

    let createClickHandler = (child: React.ReactElement<ComboboxOptionProps>) => {
        if (disabled || child.props.disabled) {
            return;
        }

        return (event: React.MouseEvent<HTMLDivElement>) => {
            event.preventDefault();
            handleChange(child);
        };
    };

    return (
        <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
            {isFormControl && <BubbleInput name={name} value={String(value)} />}
            <PopoverPrimitive.Trigger asChild type={undefined}>
                <Input
                    {...props}
                    aria-activedescendant={open && active ? getOptionId(id, data[active]) : undefined}
                    aria-haspopup={undefined}
                    aria-autocomplete="none"
                    disabled={disabled}
                    id={id}
                    icon={open ? 'ChevronUpIcon' : 'ChevronDownIcon'}
                    onChange={handleInputChange}
                    onKeyDown={handleInputKeyDown}
                    ref={inputRef}
                    role="combobox"
                    tabIndex={tabIndex}
                    value={query}
                />
            </PopoverPrimitive.Trigger>
            <PopoverPrimitive.Content asChild align="start" onOpenAutoFocus={(event) => event.preventDefault()} sideOffset={3}>
                {data.length ? (
                    <CollectionPrimitive.Collection
                        active={active}
                        onChangeActive={setActive}
                        onKeyDown={handleCollectionKeyDown}
                        ref={collectionRef}
                        role="listbox"
                        style={{ minWidth: dimensions?.width ? `${dimensions.width}px` : undefined }}
                        tabIndex={-1}
                    >
                        {data.map((child) =>
                            React.cloneElement(child, {
                                'aria-selected': child.props.value === value ? true : undefined,
                                id: getOptionId(id, child),
                                onClick: createClickHandler(child),
                            })
                        )}
                    </CollectionPrimitive.Collection>
                ) : null}
            </PopoverPrimitive.Content>
        </PopoverPrimitive.Root>
    );
}) as React.ForwardRefExoticComponent<ComboboxProps> & {
    Option: React.ForwardRefExoticComponent<ComboboxOptionProps>;
};
Combobox.Option = Option;

export { Combobox, ComboboxProps, ComboboxOptionProps, ComboboxValue };

const filterByQuery =
    (query: string, strategy: 'startsWith' | 'matches' = 'startsWith') =>
    (child: React.ReactElement<ComboboxOptionProps>) => {
        let value;

        if (child.props.disabled) {
            return false;
        }

        if (child.props.textValue) {
            value = child.props.textValue.toLowerCase();
        } else {
            value = String(child.props.children).toLowerCase();
        }

        if (strategy === 'matches') {
            return value === query.toLowerCase();
        }

        return value.startsWith(query.toLowerCase());
    };

const getOptionId = (id: string, child: React.ReactElement<ComboboxOptionProps>) =>
    `${id}-${child.props.id ?? child.props.value}`;
