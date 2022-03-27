import React from 'react';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { useIsFormControl } from '../../hooks/useIsFormControl';
import { useMergedRef } from '../../hooks/useMergedRef';
import { BubbleInput } from '../BubbleInput';

const ListboxContext = React.createContext<any>({});

type ListboxValue = string | number | null;

type ListboxOptionProps = {
    children: string | JSX.Element;
    value: ListboxValue;
};

const Option = React.forwardRef<HTMLDivElement, ListboxOptionProps>(function Option(externalProps, externalRef) {
    let { value, ...props } = externalProps;
    let context = React.useContext(ListboxContext);
    let ref = useMergedRef<HTMLDivElement>(externalRef);
    let isActive = value === context.active;
    let isSelected = value === context.value;

    React.useEffect(() => {
        if (isSelected) {
            ref.current?.scrollIntoView();
        }
    }, []);

    React.useEffect(() => {
        if (isActive) {
            ref.current?.scrollIntoView({ block: 'center' });
        }
    }, [isActive]);

    return (
        <div
            {...props}
            role="option"
            aria-current={isActive}
            aria-selected={isSelected}
            onClick={() => context.setValue(value)}
            ref={ref}
        />
    );
});

const useActiveOption = (children: JSX.Element[], value: ListboxValue | undefined) => {
    let values = React.useMemo(
        () => React.Children.map(children, (child: React.ReactElement<ListboxOptionProps>) => child.props.value),
        [children]
    );

    let [activeIndex, setActiveIndex] = React.useState<number | undefined>(
        value !== undefined ? values.findIndex((v) => v === value) : undefined
    );

    let handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'End' || event.key === 'Home') {
            event.preventDefault();

            if (event.key === 'ArrowDown') {
                if (activeIndex === undefined) {
                    setActiveIndex(0);
                } else if (activeIndex < values.length - 1) {
                    setActiveIndex(activeIndex + 1);
                }
            } else if (event.key === 'ArrowUp') {
                event.preventDefault();

                if (activeIndex === undefined) {
                    setActiveIndex(values.length - 1);
                } else if (activeIndex > 0) {
                    setActiveIndex(activeIndex - 1);
                }
            } else if (event.key === 'End') {
                setActiveIndex(values.length - 1);
            } else if (event.key === 'Home') {
                setActiveIndex(0);
            }
        }
    };

    return {
        active: activeIndex !== undefined ? values[activeIndex] : undefined,
        handleKeyDown,
    };
};

type ListboxProps = {
    defaultValue?: ListboxValue;
    children: JSX.Element[];
    name?: string;
    onChange?: (value: ListboxValue) => void;
    value?: ListboxValue;
};

const Root = React.forwardRef<HTMLDivElement, ListboxProps>(function Listbox(externalProps, externalRef) {
    let { defaultValue: defaultProp, name, onChange, value: prop, ...props } = externalProps;
    let [value, setValue] = useControllableState<ListboxValue>({
        prop,
        defaultProp,
        onChange,
    });

    // active state
    let { active, handleKeyDown: handleActiveKeyDown } = useActiveOption(props.children, value);
    let handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        // selection of active option - alt+up is a strange shortcut but it's listed on WAI-ARIA patterns
        if (event.key === 'Enter' || event.key === ' ' || event.key === 'Tab' || (event.altKey && event.key === 'ArrowUp')) {
            if (event.key !== 'Tab') {
                event.preventDefault();
            }

            if (active !== undefined) {
                setValue(active);
            }
        }

        handleActiveKeyDown(event);
    };

    // uncontrolled support
    let ref = useMergedRef<HTMLDivElement>(externalRef);
    let isFormControl = useIsFormControl(ref);

    // context
    let context = {
        active,
        setValue,
        value,
    };

    return (
        <ListboxContext.Provider value={context}>
            <div {...props} onKeyDown={handleKeyDown} ref={ref} role="listbox" tabIndex={0} />
            {isFormControl && <BubbleInput name={name} value={String(value)} />}
        </ListboxContext.Provider>
    );
});

export { Root, ListboxProps, Option, ListboxOptionProps, ListboxValue };
