import React from "react";
import ReactDOM from "react-dom/client";
import { AdminApp } from "@iamyth/chakra-admin";

const element = document.getElementById("app")!;
const root = ReactDOM.createRoot(element);
root.render(<AdminApp routeConfig={[]} />);
