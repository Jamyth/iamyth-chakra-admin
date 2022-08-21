import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box, ChakraProvider, Flex } from "@chakra-ui/react";
import { Header } from "../components/Header";
import { SideBar } from "../components/Sidebar";
import { RouteContext } from "../context/RouteContext";
import { HeaderChildrenContext } from "../context/HeaderChildrenContext";
import type { RouteModule, SubModule } from "../type";
import type { RouteContextType, RouteInformation } from "../context/RouteContext";
import type { HeaderChildrenContextType } from "../context/HeaderChildrenContext";

export interface AdminAppBaseProps {
    /**
     * Match with url and notification number
     * create badges
     */
    badges?: Record<string, number>;
}

export interface AdminAppWithReactRouterProps extends AdminAppBaseProps {
    routeConfig: (RouteModule | SubModule)[];
}

export interface AdminAppWithoutReactRouterProps extends AdminAppBaseProps {
    children: React.ReactNode;
}

export function AdminApp(props: AdminAppWithoutReactRouterProps): JSX.Element;
export function AdminApp(props: AdminAppWithReactRouterProps): JSX.Element;
// eslint-disable-next-line react/function-component-definition -- Function Overloading
export function AdminApp(props: AdminAppWithReactRouterProps | AdminAppWithoutReactRouterProps): JSX.Element {
    const { badges } = props;
    // TODO/Jamyth Added Header, SideBar, Footer

    const [currentModule, setCurrentModule] = React.useState<RouteInformation | null>(null);
    const [headerChildren, setHeaderChildren] = React.useState<React.ReactNode>(null);

    const routeContextValue: RouteContextType = {
        currentModule,
        setCurrentModule,
    };

    const headerChildrenContextValue: HeaderChildrenContextType = {
        children: headerChildren,
        setChildren: setHeaderChildren,
    };

    if ("routeConfig" in props) {
        const { routeConfig } = props;
        const subModules = routeConfig.reduce(
            (acc, curr) => [...acc, ...("subModules" in curr ? curr.subModules : [curr])],
            [] as SubModule[],
        );
        const height = window.innerHeight;

        return (
            <ChakraProvider>
                <RouteContext.Provider value={routeContextValue}>
                    <HeaderChildrenContext.Provider value={headerChildrenContextValue}>
                        <BrowserRouter>
                            <Flex minHeight={height}>
                                <SideBar modules={routeConfig} badges={badges} />
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
                    </HeaderChildrenContext.Provider>
                </RouteContext.Provider>
            </ChakraProvider>
        );
    }

    return <ChakraProvider>{props.children}</ChakraProvider>;
}
