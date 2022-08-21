import React from "react";
import { FormControl, FormErrorMessage, FormHelperText, FormLabel } from "@chakra-ui/react";
import { FormValidationContext } from "./context";
import type { FormValidationContextType } from "./context";

export interface FormItemProps {
    children: React.ReactNode;
    required?: boolean;
    readonly?: boolean;
    validator?: () => string | null | Promise<string> | Promise<null>;
    label?: React.ReactNode;
    extra?: React.ReactNode;
}

interface State {
    errorMessage: string | null;
}

export class Item extends React.PureComponent<FormItemProps, State> {
    static contextType = FormValidationContext;
    declare context: FormValidationContextType;

    constructor(props: FormItemProps) {
        super(props);
        this.state = { errorMessage: null };
    }

    componentDidMount() {
        this.context.registerValidator(this.validate);
    }

    componentWillUnMount() {
        this.context.unregisterValidator(this.validate);
    }

    validate = async () => {
        const { validator } = this.props;
        if (validator) {
            const result = await validator();
            this.setState({ errorMessage: result });
            return result === null;
        } else {
            return true;
        }
    };

    override render() {
        const { label, children, extra, required, readonly } = this.props;
        const { errorMessage } = this.state;
        const hasError = errorMessage !== null;
        return (
            <FormControl
                isInvalid={hasError}
                isRequired={required}
                isReadOnly={readonly}
                className="iamyth-chakra-form-item"
            >
                {label && <FormLabel className="iamyth-chakra-form-item-label">{label}</FormLabel>}
                {children}
                {hasError ? (
                    <FormErrorMessage className="iamyth-chakra-form-error-message">{errorMessage}</FormErrorMessage>
                ) : extra ? (
                    <FormHelperText className="iamyth-chakra-form-item-extra">{extra}</FormHelperText>
                ) : null}
            </FormControl>
        );
    }
}
