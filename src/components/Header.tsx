import React from "react";
import { Container, Box, Flex, Heading } from "@chakra-ui/react";
import { SIDEBAR_WIDTH } from "../theme";
import { Breadcrumb } from "./Breadcrumb";
import { RouteContext } from "../context/RouteContext";
import { HeaderChildrenContext } from "../context/HeaderChildrenContext";

export interface HeaderProps {}

export const Header = React.memo((props: HeaderProps) => {
    const { currentModule } = React.useContext(RouteContext);
    const { children } = React.useContext(HeaderChildrenContext);
    const maxWidth = window.innerWidth - SIDEBAR_WIDTH;
    const routeName = currentModule?.routeName ?? currentModule?.moduleName;

    return (
        <Box as="header">
            <Container paddingX="24px" flexDirection="column" maxWidth={maxWidth} display="flex" alignItems="center">
                <Breadcrumb />
                <Flex width="100%" alignItems="space-between">
                    <Heading fontSize="3xl">{routeName}</Heading>
                    {children}
                </Flex>
            </Container>
        </Box>
    );
});
