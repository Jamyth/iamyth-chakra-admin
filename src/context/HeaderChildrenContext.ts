import React from "react";

export interface HeaderChildrenContextType {
    children: React.ReactNode;
    setChildren: (children: React.ReactNode) => void;
}

export const HeaderChildrenContext = React.createContext<HeaderChildrenContextType>({
    children: null,
    setChildren: () => {},
});
