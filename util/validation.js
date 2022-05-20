const isEmpty = (value) => !value || value.trim() === '';

const userCredentialsAreValid = (
    email,
    password,
) => email
    && email.includes('@')
    && password
    && password
        .trim()
        .length > 8
    && /[a-z]/.test(password)
    && /[A-Z]/.test(password)
    && /\d/.test(password)
    && !/\s/.test(password);

const userDetailsAreValid = (
    email,
    password,
    name,
    street,
    cap,
    city,
) => userCredentialsAreValid(email, password)
    && !isEmpty(name)
    && !isEmpty(street)
    && !isEmpty(cap)
    && !isEmpty(city);

const emailIsConfirmed = (
    email,
    confirmEmail,
) => email === confirmEmail;

const passwordIsConfirmed = (
    password,
    confirmPassword,
) => password === confirmPassword;

export {
    userDetailsAreValid,
    emailIsConfirmed,
    passwordIsConfirmed,
};
