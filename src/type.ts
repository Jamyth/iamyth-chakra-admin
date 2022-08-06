import type React from "react";

export interface RouteModule {
    title: string;
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
