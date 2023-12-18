import { useEffect, useMemo, useState } from "react";

export const useForm = (initialform = {}, formValidations = {}) => {

    const [formState, setFormState] = useState(initialform);
    const [formValidation, setFormValidation] = useState({});

    useEffect(() => {
        createValidators();
    }, [formState]);

    useEffect(() => {
        setFormState(initialform);
    }, [initialform]);

    const isFormValid = useMemo( () => {
        for (const formValue of Object.keys( formValidation )) {
            if (formValidation[formValue] !== null) {
                return false;
            }
        }
            return true;
    }, [ formValidation ]);

    const onInputChange = ({ target }) => {
        const { value, name } = target;
        setFormState({
            ...formState,
            [name]: value
        })
    }

    const onResetForm = () => {
        setFormState(initialform)
    }

    const createValidators = () => {

        const formCheckedValues = {};

        for (const formField of Object.keys(formValidations)) {
            const [ fn, errorMessage = 'Error de validación'] = formValidations[formField];
            formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
        }
        setFormValidation(formCheckedValues);
    }

    return {
        formState, onInputChange, onResetForm, ...formState, ...formValidation, isFormValid
    }
}
