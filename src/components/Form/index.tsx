import React from "react";
import { Box } from "@chakra-ui/react";
import { FormValidationContext } from "./context";
import type { FormValidationContextType } from "./context";

export interface Props {
    children: React.ReactNode;
    onFinish: () => void;
    id?: string;
    className?: string;
    layout?: "horizontal" | "vertical" | "inline";
    loading?: boolean;
    buttonText?: string;
    buttonDisabled?: boolean;
    buttonRenderer?:
        | ((button: React.ReactElement, isValidating: boolean, loading?: boolean) => React.ReactElement)
        | null;
}

interface State {
    isValidating: boolean;
}

export class Form extends React.PureComponent<Props, State> {
    private validators: (() => Promise<boolean>)[];
    private readonly validationContext: FormValidationContextType;

    constructor(props: Props) {
        super(props);
        this.state = { isValidating: false };
        this.validators = [];
        this.validationContext = {
            registerValidator: (validator) => this.validators.push(validator),
            unregisterValidator: (validator) => {
                const index = this.validators.indexOf(validator);
                if (index >= 0) {
                    this.validators.splice(index, 1);
                }
            },
        };
    }

    triggerSubmit = async () => {
        const { onFinish } = this.props;
        try {
            this.setState({ isValidating: true });
            const validationResults = await Promise.all(this.validators.map((_) => _()));
            if (validationResults.every(Boolean)) {
                onFinish();
                return true;
            }
            return false;
        } finally {
            this.setState({ isValidating: false });
        }
    };

    onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        e.stopPropagation();
        await this.triggerSubmit();
    };

    renderSubmitButton() {
        return null;
    }

    override render() {
        const { children, id, className = "" } = this.props;

        return (
            <Box as="form" onSubmit={this.onSubmit} id={id} className={`iamyth-chakra-form ${className}`}>
                <FormValidationContext.Provider value={this.validationContext}>
                    {children}
                </FormValidationContext.Provider>
                {this.renderSubmitButton()}
            </Box>
        );
    }
}
