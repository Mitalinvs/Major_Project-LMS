export function isEmail(string) {
    return string.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

export function isspecialcharacter(string) {
    return string.match(/[@_!#$%^&*()<>?/\|}{~:]/);
}
export function isupper(string) {
    return string.match(/[A-Z]/);
}
export function isdigit(string) {
    return string.match(/\d/);
}
export function islower(string) {
    return string.match(/[a-z]/);
}
export function isspace(string) {
    return string.match(/\s/);
}