export const validateInputs = (values) => {
    const errors = {};

    Object.keys(values).forEach((value) => {
        if (values[value].trim() === "") {
            errors[value] = `${value} is required`;
        }
    })

    return errors;
}