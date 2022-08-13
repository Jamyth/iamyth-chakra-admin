import React from "react";
import { useLocation, matchPath } from "react-router-dom";
import { Box, Accordion, AccordionButton, AccordionItem, AccordionPanel } from "@chakra-ui/react";
import { SIDEBAR_WIDTH } from "../theme";
import type { RouteModule, SubModule } from "../type";

export interface SidebarProps {
    modules: (RouteModule | SubModule)[];
    logo?: string;
}

export const SideBar = React.memo(({ modules, logo }: SidebarProps) => {
    const location = useLocation();

    const renderMenuItem = (module: RouteModule | SubModule, index: number) => {
        const isRouteModule = "subModules" in module;

        return (
            <AccordionItem key={index} hidden={isRouteModule ? module.isHidden : false}>
                <AccordionButton lineHeight="40px" paddingX="30px">
                    {module.icon && <Box marginRight="10px">{module.icon}</Box>}
                    {module.name}
                </AccordionButton>
                {isRouteModule && <AccordionPanel pl={4}>{module.subModules.map((_) => _.name)}</AccordionPanel>}
            </AccordionItem>
        );
    };

    return (
        <Box width={SIDEBAR_WIDTH}>
            {logo && <Box />}
            <Box>
                <Accordion>{modules.map(renderMenuItem)}</Accordion>
            </Box>
        </Box>
    );
});
