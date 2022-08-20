import React from "react";
import type { SubModule, RouteModule } from "../type";

export type RouteInformation = {
    icon: RouteModule["icon"];
    moduleName: SubModule["name"];
    routeName: RouteModule["name"] | null;
};

export interface RouteContextType {
    currentModule: RouteInformation | null;
    setCurrentModule: (currentModule: RouteInformation | null) => void;
}

export const RouteContext = React.createContext<RouteContextType>({
    currentModule: null,
    setCurrentModule: () => {},
});
