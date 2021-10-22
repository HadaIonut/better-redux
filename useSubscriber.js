import React, {useEffect, useState} from "react";
import {store, subscribe} from "./store";

export default function useSubscriber(event) {
    const [display, setDisplay] = useState(store[event])

    useEffect(() => subscribe(event, (event, updatedState) => setDisplay(updatedState[event])))

    return display
}
