export const validateStructure = (values) => {
    const errors = {};

    let noteObj = {};
    let quoteObj = {};

    Object.keys(values).forEach((value) => {
        if (value === "note") { noteObj[value] = values[value]; }
        if (value === "quote") { quoteObj[value] = values[value]; }
    })

    Object.keys(noteObj).forEach((value) => { if (noteObj[value].includes(",")) { errors[value] = "Please separate note by a new line"; } })
    Object.keys(quoteObj).forEach((value) => { if (quoteObj[value].includes(",")) { errors[value] = "Please separate quote by a new line"; } })

    if (!values.img.startsWith("http") && !values.img.startsWith("https")) {
        errors.img = "Image URL must start with http or https";
    }

    return errors;

}