import React from "react";
import { Container, Box } from "@chakra-ui/react";
import { SIDEBAR_WIDTH } from "../theme";

export interface HeaderProps {}

export const Header = React.memo((props: HeaderProps) => {
    const maxWidth = window.innerWidth - SIDEBAR_WIDTH;

    return (
        <Box as="header">
            <Container height="50px" maxWidth={maxWidth} display="flex" alignItems="center">
                hahahha
            </Container>
        </Box>
    );
});
