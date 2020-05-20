import { API_ENDPOINT } from "constants/common";

export function spellCheck(text: any) {
    return fetch(API_ENDPOINT + "/check?language=en-US&text=" + text, {
        method: "post"
    });
}
