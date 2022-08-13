import React from "react";
import ReactDOM from "react-dom/client";
import { AdminApp } from "@iamyth/chakra-admin";
import type { RouteModule, SubModule } from "@iamyth/chakra-admin";

const routeConfig: (RouteModule | SubModule)[] = [
    {
        name: "Hello",
        icon: "OMG",
        subModules: [
            {
                component: () => null,
                path: "hahaha",
                name: "Sub Module 1 ",
                icon: "Test",
            },
            {
                component: () => null,
                path: "hahaha",
                name: "Sub Module 2 ",
                icon: "Test",
            },
            {
                component: () => null,
                path: "hahaha",
                name: "Sub Module 3",
                icon: "Test",
            },
        ],
    },
    {
        path: "/",
        component: () => null,
        name: "Hello",
        icon: "Test",
    },
    {
        path: "/",
        component: () => null,
        name: "Hello",
        icon: "Test",
    },
    {
        path: "/",
        component: () => null,
        name: "Hello",
        icon: "Test",
    },
    {
        path: "/",
        component: () => null,
        name: "Hello",
        icon: "Test",
    },
];

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- defined
const element = document.getElementById("app")!;
const root = ReactDOM.createRoot(element);
root.render(<AdminApp routeConfig={routeConfig} />);
