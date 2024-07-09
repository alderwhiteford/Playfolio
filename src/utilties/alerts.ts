const errorMessages = {
    failedToSignIn: "Failed to sign in, please try again!",
    failedToSignOut: "Failed to log out, please try again!"
}

const successMessages = {
    signedIn: "Signed in successfully!"
}

export type ErrorCode = keyof typeof errorMessages;
export type SuccessCode = keyof typeof successMessages;

export function getErrorMessage(key: ErrorCode) {
    return errorMessages[key];
}

export function getSuccessMessage(key: SuccessCode) {
    return successMessages[key];
}