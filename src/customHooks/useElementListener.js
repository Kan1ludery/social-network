import {useEffect} from "react";

const useEventListener = (eventName, handler, element = document) => {
    useEffect(() => {
        const eventListener = (event) => handler(event);
        element.addEventListener(eventName, eventListener);
        return () => {
            element.removeEventListener(eventName, eventListener);
        };
    }, [eventName, handler, element]);
};
export default useEventListener