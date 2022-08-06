import path from "path";
import { ViteRunner } from "vite-runner";

new ViteRunner({
    projectDirectory: path.join(__dirname, "../test"),
    tsconfigPath: path.join(__dirname, "../config/tsconfig.test.json"),
    useReact: true,
    pathResolver: [
        {
            pattern: "@iamyth/chakra-admin",
            resolver: () => path.join(__dirname, "../src"),
        },
    ],
}).startServer();
