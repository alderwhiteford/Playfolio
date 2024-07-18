const errorMessages = {
    failedToSignIn: "Failed to sign in, please try again!",
    failedToSignOut: "Failed to log out, please try again!",
    failedToUpdateAbout: "Failed updaing the About section, please try again",
    failedToDeleteSkill: "Failed to all of the skills, please try again",
    failedToCreateSkill: "Failed to create a new skill, please try again",
    failedToCreateWork: "Failed to create a new work experience, please try again",
    failedToFetchWorks: "Failed to fetch work experiences, please try again",
    failedToDeleteWork: "Failed to delete the work experience, please try again",
}

const successMessages = {
    signedIn: "Signed in successfully!",
    updatedAbout: "Successfully updated About section!",
    deletedSkills: "Successfully deleted all selected skills!",
    createdSkill: "Successfully created a new skill!",
    createdWork: "Successfully created a new work experience!",
    deletedWork: "Successfully deleted the work experience!",
}

export type ErrorCode = keyof typeof errorMessages;
export type SuccessCode = keyof typeof successMessages;

export function getErrorMessage(key: ErrorCode) {
    return errorMessages[key];
}

export function getSuccessMessage(key: SuccessCode) {
    return successMessages[key];
}