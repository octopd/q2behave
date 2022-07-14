
export const passwordIsNotValid = (password: string) => {
    const hasSpecialCharacters = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/
    const hasLowercase = /^(?=.*[a-z])/
    const hasUppercase = /^(?=.*[A-Z])/
    const hasNumber = /\d/

    let error = ''

    if (!hasLowercase.test(password)) {
        error = 'Password must contain at least one lowercase letter'
    }
    if (!hasUppercase.test(password)) {
        error = 'Password must contain at least one uppercase letter'
    }
    if (!hasSpecialCharacters.test(password)) {
        error = 'Must contain at least one special character'
    }
    if (!hasNumber.test(password)) {
        error = 'Must contain at least one number'
    }
    if (password.length < 8) {
        error = 'Password must be at least 8 characters long'
    }

    return error
}