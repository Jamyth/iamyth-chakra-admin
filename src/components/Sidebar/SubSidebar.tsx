import { Box, Flex, Button } from "@chakra-ui/react";
import React from "react";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import type { RouteModule } from "../../type";

export interface Props {
    routeModule: RouteModule | null;
}

/**
 * The transition logic is like this:
 * when Open
 * 1. dom rendered the cloned sub-modules
 * 2. starts the animation
 *
 * when Close
 * 1. starts the animation
 * 2. clear the cloned sub-modules
 */
export const SubSidebar = React.memo(({ routeModule }: Props) => {
    // Animating used to track when user fast double click the menu, it will breaks the animation
    const [isAnimating, setIsAnimating] = React.useState(false);
    const [isOpened, setIsOpened] = React.useState(false);
    const [controlledRouteModule, setControlledRouteModule] = React.useState(routeModule);
    const [container, setContainer] = React.useState<HTMLDivElement | null>(null);
    const location = useLocation();
    const navigate = useNavigate();
    const width = container?.scrollWidth;

    const onTransitionEnd = () => {
        if (!isOpened) {
            setControlledRouteModule(null);
        }
    };

    const isLocationMatched = (path: string) => {
        return matchPath(path, location.pathname) !== null;
    };

    React.useEffect(() => {
        if (isAnimating) {
            setIsAnimating(false);
            setIsOpened(false);
        }
        if (routeModule !== null) {
            // We need to set the array first before triggering transition
            setControlledRouteModule(routeModule ?? []);
            setIsAnimating(true);
        } else {
            setIsOpened(false);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps -- only listen to props change
    }, [routeModule]);

    React.useEffect(() => {
        // We need to set the route module state first
        // so the dom will render the content, then trigger this side-effect
        setIsOpened(controlledRouteModule !== null);
    }, [controlledRouteModule]);

    return (
        <Flex
            ref={setContainer}
            width={`${width}px`}
            maxWidth={isOpened ? `${width}px` : "0px"}
            transition="all 0.3s ease-in-out"
            overflowX="hidden"
            onTransitionEnd={onTransitionEnd}
            backgroundColor="#06603b"
        >
            <Flex flexDirection="column" justifyContent="space-between" padding="15px">
                <Box whiteSpace="nowrap">
                    <Box as="h2" color="#9CC9B7" paddingY="10px">
                        {controlledRouteModule?.name}
                    </Box>
                    {controlledRouteModule?.subModules.map((_) => (
                        <Button
                            isActive={isLocationMatched(_.path)}
                            _hover={{
                                backgroundColor: "#2A7857",
                                color: "#91CEB5",
                            }}
                            _active={{
                                backgroundColor: "#2A7857",
                                color: "#91CEB5",
                            }}
                            display="block"
                            color="#9CC9B7"
                            variant="ghost"
                            key={_.name}
                            whiteSpace="nowrap"
                            onClick={() => navigate(_.path)}
                        >
                            {_.name}
                        </Button>
                    ))}
                </Box>
                <Box>???</Box>
            </Flex>
        </Flex>
    );
});
