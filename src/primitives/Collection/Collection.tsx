import React from 'react';
import { useMergedRef } from '../../hooks/useMergedRef';

const isAriaSelectionKey = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ' || event.key === 'Tab' || (event.altKey && event.key === 'ArrowUp')) {
        return true;
    }

    return false;
};

type CollectionItemProps = React.HTMLAttributes<HTMLDivElement>;

const Item = React.forwardRef<HTMLDivElement, CollectionItemProps>(function Item(externalProps, ref) {
    let { ...props } = externalProps;
    return <div {...props} ref={ref} />;
});

type CollectionProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> & {
    active?: number;
    children: React.ReactElement<CollectionItemProps>[];
    onChangeActive: (index: number) => void;
};

const Collection = React.forwardRef<HTMLDivElement, CollectionProps>(function Collection(externalProps, externalRef) {
    let { children, active = 0, onChangeActive, onKeyDown, tabIndex = 0, ...props } = externalProps;
    let ref = useMergedRef<HTMLDivElement>(externalRef);

    let handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (typeof onKeyDown === 'function') {
            onKeyDown(event);
        }

        const nextActive = getNextEnabledItem(event, children, active);

        if (nextActive !== undefined && nextActive !== active) {
            event.preventDefault();
            onChangeActive(nextActive);
        }
    };

    React.useEffect(() => {
        ref.current?.children.item(active)?.scrollIntoView({ block: 'nearest' });
    }, [active]);

    let createClickHandler =
        (index: number, child: React.ReactElement<CollectionItemProps>) => (event: React.MouseEvent<HTMLDivElement>) => {
            if (typeof child.props.onClick === 'function') {
                child.props.onClick(event);
            }

            if (!event.isDefaultPrevented()) {
                onChangeActive(index);
            }
        };

    return (
        <div {...props} onKeyDown={handleKeyDown} ref={ref} tabIndex={tabIndex}>
            {React.Children.map(children, (child: React.ReactElement<CollectionItemProps>, index: number) =>
                React.cloneElement(child, {
                    'aria-current': active === index ? true : undefined,
                    onClick: createClickHandler(index, child),
                })
            )}
        </div>
    );
});

export { Collection, Item, isAriaSelectionKey };

export const getNextIndexFromKeycode = (
    event: React.KeyboardEvent,
    length: number,
    active: number | undefined
): number | undefined => {
    switch (event.key) {
        case 'ArrowUp':
            return active === undefined ? length - 1 : active > 0 ? active - 1 : active;

        case 'ArrowDown':
            return active === undefined ? 0 : active < length - 1 ? active + 1 : active;

        case 'Home':
            return 0;

        case 'End':
            return length - 1;

        default:
            return;
    }
};

const getNextEnabledItem = (
    event: React.KeyboardEvent<HTMLElement>,
    data: React.ReactElement[],
    index: number | undefined
): number | undefined => {
    const nextIndex = getNextIndexFromKeycode(event, data.length, index);

    if (nextIndex) {
        if (nextIndex === index) {
            return index;
        } else if (data[nextIndex] && (!!data[nextIndex].props.disabled || !!data[nextIndex].props['aria-disabled'])) {
            return getNextEnabledItem(event, data, nextIndex);
        }
    }

    return nextIndex;
};
