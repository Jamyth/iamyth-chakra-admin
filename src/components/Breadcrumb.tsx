import React from "react";
import { RouteContext } from "../context/RouteContext";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Breadcrumb as ChakraBreadcrumb, BreadcrumbItem, Badge, Box } from "@chakra-ui/react";

export interface BreadcrumbProps {}

export const Breadcrumb = React.memo(() => {
    const { currentModule } = React.useContext(RouteContext);
    const hasRouteName = currentModule?.routeName !== null;

    if (!currentModule) {
        return null;
    }

    return (
        <ChakraBreadcrumb paddingTop="24px" paddingBottom="24px" width="100%" separator={<ChevronRightIcon />}>
            <BreadcrumbItem>
                <Box>{currentModule.icon}</Box>
            </BreadcrumbItem>
            <BreadcrumbItem>
                <Box as={!hasRouteName ? Badge : undefined}>{currentModule.moduleName}</Box>
            </BreadcrumbItem>
            {currentModule.routeName && (
                <BreadcrumbItem>
                    <Badge colorScheme="green" size="lg">
                        {currentModule.routeName}
                    </Badge>
                </BreadcrumbItem>
            )}
        </ChakraBreadcrumb>
    );
});
