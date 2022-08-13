import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box, ChakraProvider, Flex } from "@chakra-ui/react";
import { Header } from "../components/Header";
import { SideBar } from "../components/Sidebar";
import type { RouteModule, SubModule } from "../type";

export interface AdminAppWithReactRouterProps {
    routeConfig: (RouteModule | SubModule)[];
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
        const subModules = routeConfig.reduce(
            (acc, curr) => [...acc, ...("subModules" in curr ? curr.subModules : [curr])],
            [] as SubModule[],
        );
        const height = window.innerHeight;

        return (
            <ChakraProvider>
                <BrowserRouter>
                    <Flex minHeight={height}>
                        <SideBar modules={routeConfig} />
                        <Box flex="1">
                            <Header />
                            <Routes>
                                {subModules.map(({ path, component: Component }, index) => {
                                    return <Route key={index} element={<Component />} path={path} />;
                                })}
                            </Routes>
                        </Box>
                    </Flex>
                </BrowserRouter>
            </ChakraProvider>
        );
    }

    return <ChakraProvider>{props.children}</ChakraProvider>;
}
