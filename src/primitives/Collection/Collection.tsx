import React, { MouseEventHandler } from 'react';
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
    let length = children.length;

    let handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (typeof onKeyDown === 'function') {
            onKeyDown(event);
        }

        if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'End' || event.key === 'Home') {
            event.preventDefault();
            let nextActive = active;

            if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'End' || event.key === 'Home') {
                if (event.key === 'ArrowDown') {
                    if (active !== undefined && active < length - 1) {
                        nextActive = active + 1;
                    }
                } else if (event.key === 'ArrowUp') {
                    if (active === undefined) {
                        nextActive = length - 1;
                    } else if (active > 0) {
                        nextActive = active - 1;
                    }
                } else if (event.key === 'End') {
                    nextActive = length - 1;
                } else if (event.key === 'Home') {
                    nextActive = 0;
                }
            }

            onChangeActive(nextActive);
        }
    };

    React.useEffect(() => {
        ref.current?.children.item(active)?.scrollIntoView({ block: 'nearest' });
    }, [active]);

    let createClickHandler =
        (index: number, onClick: MouseEventHandler<HTMLDivElement> | undefined) => (event: React.MouseEvent<HTMLDivElement>) => {
            if (typeof onClick === 'function') {
                onClick(event);
            }

            onChangeActive(index);
        };

    return (
        <div {...props} onKeyDown={handleKeyDown} ref={ref} tabIndex={tabIndex}>
            {React.Children.map(children, (child: React.ReactElement<CollectionItemProps>, index: number) =>
                React.cloneElement(child, {
                    'aria-current': active === index ? true : undefined,
                    onClick: createClickHandler(index, child.props.onClick),
                })
            )}
        </div>
    );
});

export { Collection, Item, isAriaSelectionKey };
