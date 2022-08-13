import React from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { SIDEBAR_WIDTH } from "../../theme";
import { SubSidebar } from "./SubSidebar";
import type { RouteModule, SubModule } from "../../type";

export interface SidebarProps {
    modules: (RouteModule | SubModule)[];
    logo?: string;
}

export const SideBar = React.memo(({ modules, logo }: SidebarProps) => {
    const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);

    const selectMenuItem = (index: number) => {
        setSelectedIndex((selectedIndex) => (selectedIndex === index ? null : index));
    };

    const indexedModule = selectedIndex !== null ? modules[selectedIndex] : null;
    const selectedModule = indexedModule && "subModules" in indexedModule ? indexedModule : null;

    return (
        <React.Fragment>
            <Flex
                backgroundColor="#064f31"
                color="#5D937C"
                flexDirection="column"
                justifyContent="space-between"
                width={`${SIDEBAR_WIDTH}px`}
                p="16px"
            >
                <Box>
                    {logo && <Box />}
                    <Flex flexDirection="column" rowGap="8px">
                        {modules.map(({ icon }, i) => (
                            <Button
                                isActive={selectedIndex === i}
                                variant="ghost"
                                width="48px"
                                height="48px"
                                key={i}
                                onClick={() => selectMenuItem(i)}
                                _hover={{
                                    backgroundColor: "#38735A",
                                    color: "#B6CFC6",
                                }}
                                _active={{
                                    backgroundColor: "#38735A",
                                    color: "#B6CFC6",
                                }}
                            >
                                {icon}
                            </Button>
                        ))}
                    </Flex>
                </Box>
                <Box>OMG</Box>
            </Flex>
            <SubSidebar routeModule={selectedModule} />
        </React.Fragment>
    );
});
