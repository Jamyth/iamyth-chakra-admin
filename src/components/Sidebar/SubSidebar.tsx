import { Box, Flex, Button } from "@chakra-ui/react";
import React from "react";
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
// TODO/Jamyth add subsidebar name
export const SubSidebar = React.memo(({ routeModule }: Props) => {
    // Animating used to track when user fast double click the menu, it will breaks the animation
    const [isAnimating, setIsAnimating] = React.useState(false);
    const [isOpened, setIsOpened] = React.useState(false);
    const [controlledSubModules, setControlledSubModules] = React.useState(routeModule);
    const [container, setContainer] = React.useState<HTMLDivElement | null>(null);

    const onTransitionEnd = () => {
        if (!isOpened) {
            setControlledSubModules(null);
        }
    };

    React.useEffect(() => {
        if (isAnimating) {
            setIsAnimating(false);
            setIsOpened(false);
        }
        if (routeModule !== null) {
            // We need to set the array first before triggering transition
            setControlledSubModules(routeModule ?? []);
        } else {
            setIsOpened(false);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps -- only listen to props change
    }, [routeModule]);

    React.useEffect(() => {
        setIsOpened(controlledSubModules !== null);
        setIsAnimating(true);
    }, [controlledSubModules]);

    return (
        <Flex
            ref={setContainer}
            justifyContent="space-between"
            maxWidth={isOpened ? `${container?.scrollWidth}px` : "0px"}
            transition="all 0.3s ease-in-out"
            overflowX="hidden"
            onTransitionEnd={onTransitionEnd}
            backgroundColor="#06603b"
        >
            <Box padding="15px">
                <Box whiteSpace="nowrap">
                    {controlledSubModules?.subModules.map((_) => (
                        <Button
                            display="block"
                            _hover={{
                                backgroundColor: "#2A7857",
                                color: "#91CEB5",
                            }}
                            _active={{
                                backgroundColor: "#2A7857",
                                color: "#91CEB5",
                            }}
                            color="#9CC9B7"
                            variant="ghost"
                            key={_.name}
                            whiteSpace="nowrap"
                        >
                            {_.name}
                        </Button>
                    ))}
                </Box>
            </Box>
        </Flex>
    );
});
