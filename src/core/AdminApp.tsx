import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Header } from "../components/Header";
import type { RouteModule, SubModule } from "../type";

export interface AdminAppWithReactRouterProps {
    routeConfig: RouteModule[];
}

export interface AdminAppWithoutReactRouterProps {
    children: React.ReactNode;
}

export function AdminApp(props: AdminAppWithoutReactRouterProps): JSX.Element;
export function AdminApp(props: AdminAppWithReactRouterProps): JSX.Element;
// eslint-disable-next-line react/function-component-definition -- Function Overloading
export function AdminApp(props: AdminAppWithReactRouterProps | AdminAppWithoutReactRouterProps): JSX.Element {
    // TODO/Jamyth Added Header, SideBar, Footer

    if ("routeConfig" in props) {
        const { routeConfig } = props;
        const subModules = routeConfig.reduce((acc, curr) => [...acc, ...curr.subModules], [] as SubModule[]);

        return (
            <ChakraProvider>
                <BrowserRouter>
                    <Header />
                    <Routes>
                        {subModules.map(({ path, component: Component }, index) => {
                            return <Route key={index} element={<Component />} path={path} />;
                        })}
                    </Routes>
                </BrowserRouter>
            </ChakraProvider>
        );
    }

    return <ChakraProvider>{props.children}</ChakraProvider>;
}
