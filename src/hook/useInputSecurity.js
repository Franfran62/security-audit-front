
function isCorrectMail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !isBannedWord(email) && emailRegex.test(email);
}

function isCorrectPassword(password) {
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /\W/.test(password);
    const hasMinLength = password.length >= 8;

    return !isBannedWord(password) && hasLowerCase && hasUpperCase && hasNumber && hasSpecialChar && hasMinLength;
}

function isBannedWord(input) {
    const bannedWords = ["<script>", "alert(", "onerror", "onload", "import ", "include(", "</", "/>", "<?", "?>", "<%", "%>", "<svg", "javascript:", "document.", "window.", "location.", "eval(", "prompt(", "confirm(", "localStorage.", "sessionStorage.", "cookie.", "indexedDB.", "fetch(", "XMLHttpRequest.", "http://", "https://", "ftp://", "ws://", "wss://", "tcp://", "udp://", "smtp://", "telnet://", "ssh://", "sftp://", "data:", "blob:", "file:", "chrome:", "chrome-extension:", "chrome-untrusted:", "chrome-search:", "chrome-search:", "chrome-devtools:", "chrome-extension-resource:", "chrome://favicon/", "chrome://newtab"];
    return bannedWords.some(word => input.includes(word));
}

function isCorrectString(input) {
    const hasNoSpaces = !/\s/.test(input);
    const isNotEmpty = input.length > 0;
    return isNotEmpty && hasNoSpaces && !isBannedWord(input);
}

export function useInputSecurity() {
    return { isCorrectMail, isCorrectPassword, isCorrectString };
}