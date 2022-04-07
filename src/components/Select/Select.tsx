import React from 'react';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { useMergedRef } from '../../hooks/useMergedRef';
import { createKeyboardEvent } from '../../utilities/createKeyboardEvent';
import * as CollectionPrimitive from '../../primitives/Collection/Collection';
import { useIsFormControl } from '../../hooks/useIsFormControl';
import { BubbleInput } from '../../primitives/BubbleInput';
import { useBoundingClientRectListener } from '../../hooks/useBoundingClientRectListener';
import './Select.css';
import { Icon } from '../Icon/Icon';
import { BubbleSelect } from '../../primitives/BubbleSelect';

const filterByQuery =
    (query: string, strategy: 'startsWith' | 'matches' = 'startsWith') =>
    (child: React.ReactElement<SelectOptionProps>) => {
        let value;

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

type SelectValue = string | number | null;

type SelectOptionProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'value'> & {
    children: string | JSX.Element;
    disabled?: boolean;
    textValue?: string;
    value: SelectValue;
};

const Option = React.forwardRef<HTMLDivElement, SelectOptionProps>(function Option(externalProps, ref) {
    let { children, disabled, textValue, value, ...props } = externalProps;
    let isSelected = !!props['aria-selected'];

    return (
        <CollectionPrimitive.Item {...props} aria-disabled={disabled ? true : undefined} ref={ref} role="option">
            {children}
            {isSelected ? <Icon name="CheckIcon" data-selected-icon /> : null}
        </CollectionPrimitive.Item>
    );
});

const getOptionId = (id: string, child: React.ReactElement<SelectOptionProps>) => `${id}-${child.props.id ?? child.props.value}`;

type SelectProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'defaultValue' | 'onChange' | 'value'> & {
    children: React.ReactElement<SelectOptionProps>[];
    defaultValue?: SelectValue | SelectValue[];
    disabled?: boolean;
    multiple?: boolean;
    name?: string;
    onChange?: (value: SelectValue | SelectValue[]) => void;
    readOnly?: boolean;
    tags?: boolean;
    value?: SelectValue | SelectValue[];
};

const Select = React.forwardRef<HTMLInputElement, SelectProps>(function Select(externalProps, externalRef) {
    let {
        children,
        defaultValue: defaultProp,
        disabled,
        id: nativeId,
        multiple = false,
        name,
        onChange,
        readOnly,
        tabIndex = disabled ? -1 : 0,
        tags,
        value: prop,
        ...props
    } = externalProps;
    let id = nativeId ?? React.useId();
    let buttonRef = useMergedRef<HTMLDivElement>(externalRef);
    let collectionRef = React.useRef<HTMLDivElement>(null);

    // value of the Select
    let [value, setValue] = useControllableState<SelectValue | SelectValue[]>({
        prop,
        defaultProp,
        onChange,
    });
    // active option in the collection
    let [active, setActive] = React.useState<number>(
        value !== undefined
            ? children.findIndex((child) => child.props.value === (Array.isArray(value) ? value[0] ?? 0 : value)) ?? 0
            : 0
    );
    let [open, setOpen] = React.useState(false);
    // align the listbox min width with the width of the input - it should never be smaller
    let dimensions = useBoundingClientRectListener(buttonRef);

    // uncontrolled support
    let isFormControl = useIsFormControl(buttonRef);

    let handleChange = (child: React.ReactElement<SelectOptionProps>) => {
        if (multiple) {
            if (value === undefined) {
                setValue([child.props.value]);
            } else if (Array.isArray(value)) {
                if (value.includes(child.props.value)) {
                    setValue(value.filter((v) => v !== child.props.value));
                } else {
                    setValue([...value, child.props.value]);
                }
            } else {
                if (value === child.props.value) {
                    setValue([]);
                } else {
                    setValue([value, child.props.value]);
                }
            }
        } else {
            setValue(child.props.value);
        }

        if (!multiple) {
            setOpen(false);
        }
    };

    // shortcuts follow the the WAI-ARIA recommendations for textbox
    // at https://www.w3.org/TR/wai-aria-practices/examples/Select/Select-autocomplete-list.html
    let handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (disabled) {
            event.preventDefault();
            return;
        }

        if (event.key === 'Enter' || event.key === ' ') {
            if (multiple && event.key === ' ') {
                if (!open) {
                    setOpen(true);
                }
            } else {
                setOpen(!open);
            }
        } else if (!open && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
            setOpen(true);

            if (event.key === 'ArrowUp') {
                setActive(children.length - 1);
            } else {
                // there is a recommended shortcut for alt + arrow down that opens the listbox with no active option
                // but it's annoying to support undefined as well as number, so skipped it for now
                setActive(0);
            }
        } else if (event.key === 'Escape' && open) {
            setOpen(false);
        }

        // the focus should always remain on the input, so we forward events on to the listbox
        collectionRef.current?.dispatchEvent(createKeyboardEvent(event));
    };

    // shortcuts follow the the WAI-ARIA recommendations for listbox
    // at https://www.w3.org/TR/wai-aria-practices/examples/Select/Select-autocomplete-list.html
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

            handleChange(children[active]);
        }
    };

    let createClickHandler = (child: React.ReactElement<SelectOptionProps>) => {
        if (disabled || child.props.disabled) {
            return;
        }

        return (event: React.MouseEvent<HTMLDivElement>) => {
            handleChange(child);
        };
    };

    let getValue = () => {
        if (value !== undefined) {
            if (multiple) {
                return Array.isArray(value) ? value.map(String) : [String(value)];
            } else {
                return String(value);
            }
        }
    };

    let removeValue = (v: SelectValue) => {
        if (Array.isArray(value)) {
            setValue(value.filter((z) => z !== v));
        }
    };

    return (
        <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
            {isFormControl && (
                <BubbleSelect aria-hidden multiple={multiple} name={name} value={getValue()}>
                    {children.map((child) => (
                        <option key={String(child.props.value)} value={String(child.props.value)} />
                    ))}
                </BubbleSelect>
            )}
            <PopoverPrimitive.Trigger asChild type={undefined}>
                <div
                    {...props}
                    aria-activedescendant={open ? getOptionId(id, children[active]) : undefined}
                    aria-disabled={disabled ? true : undefined}
                    aria-haspopup="listbox"
                    aria-readonly={readOnly ? true : undefined}
                    id={id}
                    onKeyDown={handleKeyDown}
                    ref={buttonRef}
                    role="combobox"
                    tabIndex={tabIndex}
                >
                    {Array.isArray(value) && value.length ? (
                        tags ? (
                            <div className="flex gap-1 py-1 flex-wrap -ml-1">
                                {value.map((v) => (
                                    <span key={v}>
                                        {children.find((c) => c.props.value === v)?.props.children}{' '}
                                        <Icon name="XIcon" onClick={() => removeValue(v)} />
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <>
                                <div className="truncate flex-grow">{children.find(matchesValue(value[0]))?.props.children}</div>
                                {value.length > 1 ? <span>+{value.length - 1}</span> : null}
                            </>
                        )
                    ) : (
                        <div>{children.find(matchesValue(value))?.props.children}</div>
                    )}
                    <Icon name={open ? 'ChevronUpIcon' : 'ChevronDownIcon'} />
                </div>
            </PopoverPrimitive.Trigger>
            <PopoverPrimitive.Content asChild align="start" onOpenAutoFocus={(event) => event.preventDefault()} sideOffset={3}>
                {children.length ? (
                    <CollectionPrimitive.Collection
                        aria-multiselectable={multiple ? true : undefined}
                        active={active}
                        onChangeActive={setActive}
                        onKeyDown={handleCollectionKeyDown}
                        ref={collectionRef}
                        role="listbox"
                        style={{ minWidth: dimensions?.width ? `${dimensions.width}px` : undefined }}
                        tabIndex={-1}
                    >
                        {children.map((child) =>
                            React.cloneElement(child, {
                                'aria-selected': matchesValue(value)(child) ? true : undefined,
                                id: getOptionId(id, child),
                                onClick: createClickHandler(child),
                            })
                        )}
                    </CollectionPrimitive.Collection>
                ) : null}
            </PopoverPrimitive.Content>
        </PopoverPrimitive.Root>
    );
}) as React.ForwardRefExoticComponent<SelectProps> & {
    Option: React.ForwardRefExoticComponent<SelectOptionProps>;
};
Select.Option = Option;

export { Select, SelectProps, SelectOptionProps, SelectValue };

const matchesValue = (value: undefined | SelectValue | SelectValue[]) => (child: React.ReactElement<SelectOptionProps>) => {
    if (Array.isArray(value)) {
        return value.includes(child.props.value);
    }

    return child.props.value === value;
};
