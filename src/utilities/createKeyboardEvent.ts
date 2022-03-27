// returns a custom keyboard event compatible with all browsers
export const createKeyboardEvent = (event: React.KeyboardEvent<HTMLElement>) => {
    let customKeyboardEvent;

    if (typeof KeyboardEvent === 'function') {
        customKeyboardEvent = new KeyboardEvent(event.type, event as any);
    } else {
        customKeyboardEvent = document.createEvent('Event') as any;
        customKeyboardEvent.initEvent(event.type, true, true);
        customKeyboardEvent.key = event.key;
        customKeyboardEvent.keyCode = event.keyCode;
        customKeyboardEvent.charCode = event.charCode;
    }

    return customKeyboardEvent;
};
