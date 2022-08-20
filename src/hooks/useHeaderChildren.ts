import React from "react";
import { HeaderChildrenContext } from "../context/HeaderChildrenContext";

export function useHeaderChildren(children: React.ReactNode) {
    const { setChildren } = React.useContext(HeaderChildrenContext);

    React.useEffect(() => {
        setChildren(children);

        return () => {
            setChildren(null);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps -- Only didMount
    }, []);
}
