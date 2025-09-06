
export const getParams = (key: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(key);
}

export const clickOutside = (node: any, callback: any) => {
    const handleClick = (event: any) => {
        if (node && !node.contains(event.target) && !event.defaultPrevented) {
            callback();
        }
    };
    document.addEventListener('click', handleClick, true);
    return {
        update(newCallback: any) {
            callback = newCallback;
        },
        destroy() {
            document.removeEventListener('click', handleClick, true);
        }
    };
};