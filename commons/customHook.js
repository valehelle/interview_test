import { useEffect, useRef } from 'react'

export const usePrevious = (value) => {

    // The ref object is a generic container whose current property is mutable ...

    // ... and can hold any value, similar to an instance property on a class

    const ref = useRef();



    // Store current value in ref

    useEffect(() => {

        ref.current = value;

    }, [value]); // Only re-run if value changes



    // Return previous value (happens before update in useEffect above)

    return ref.current;

}

export const useRenderHook = ({ data = [], initialRender, finalRender, onDataChange, changedData }) => {
    const prevData = usePrevious(data)

    useEffect(() => {
        initialRender && initialRender()

        return (() => {
            finalRender && finalRender()
        })
    }, []);

    useEffect(() => {

        if (onDataChange && prevData != undefined && changedData(prevData) === null && changedData(data) != null) {
            onDataChange()
        }

    }, [data]);
}
