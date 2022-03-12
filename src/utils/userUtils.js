
export const dontShowAgain = (type, choice) => {
    window.localStorage.setItem(`dontshow_${type}`, JSON.stringify({type: type, choice: choice}));
}
