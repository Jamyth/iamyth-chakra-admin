import React from "react";

export interface FormValidationContextType {
    registerValidator: (validator: () => Promise<boolean>) => void;
    unregisterValidator: (validator: () => Promise<boolean>) => void;
}

export const FormValidationContext = React.createContext<FormValidationContextType>({
    registerValidator: () => {},
    unregisterValidator: () => {},
});
