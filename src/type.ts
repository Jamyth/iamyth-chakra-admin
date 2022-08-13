import type React from "react";

export interface RouteModule {
    name: string;
    subModules: SubModule[];
    icon?: React.ReactNode;
    isHidden?: boolean;
}

export interface SubModule {
    path: string;
    component: React.ComponentType;
    name: string;
    icon?: React.ReactNode;
}
