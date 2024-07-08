import { useState } from "react";

import { validateInputs } from "../utils/validateFieldsUtil";

export default function useForm(submitHandler, initialValues) {
    const [values, setValues] = useState(initialValues);
    const [inputErrors, setInputErrors] = useState({});
    const [submitError, setSubmitError] = useState(null);

    const onChange = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value,
        }));

        setInputErrors(state => ({
            ...state,
            [e.target.name]: null
        }));

        setSubmitError(null);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        
        const errors = validateInputs(values);

        if (Object.keys(errors).length === 0) {
            const { result, error } = await submitHandler(values);

            if (error) {
                setSubmitError(error);
            } else {
                setSubmitError(null);
            }
        } else {
            setInputErrors(errors);
        }
    };

    const resetField = () => {
        setValues(initialValues);
    };

    return {
        values,
        inputErrors,
        submitError,
        onChange,
        onSubmit,
        resetField
    }
}