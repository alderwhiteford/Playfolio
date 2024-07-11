const errorMessages = {
    failedToSignIn: "Failed to sign in, please try again!",
    failedToSignOut: "Failed to log out, please try again!",
    failedToUpdateAbout: "Failed updaing the About section, please try again",
    failedToDeleteSkill: "Failed to all of the skills, please try again",
}

const successMessages = {
    signedIn: "Signed in successfully!",
    updatedAbout: "Successfully updated About section!",
    deletedSkills: "Successfully deleted all selected skills!",
}

export type ErrorCode = keyof typeof errorMessages;
export type SuccessCode = keyof typeof successMessages;

export function getErrorMessage(key: ErrorCode) {
    return errorMessages[key];
}

export function getSuccessMessage(key: SuccessCode) {
    return successMessages[key];
}