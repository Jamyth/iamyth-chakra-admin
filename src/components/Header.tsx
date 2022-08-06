import React from "react";
import { Container, Box } from "@chakra-ui/react";

export interface HeaderProps {
    logo?: string;
    logoText?: string;
}

export const Header = React.memo(({}: HeaderProps) => {
    return (
        <Box as="header" borderTop="3px solid #2f2">
            <Container height="50px" maxWidth={1624} display="flex" alignItems="center">
                hahahha
            </Container>
        </Box>
    );
});
