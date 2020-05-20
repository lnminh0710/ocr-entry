import { API_ENDPOINT } from "constants/common";

export function signIn(user: { username: string; password: string }) {
    return fetch(API_ENDPOINT + "/auth/login", {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        method: "post",
        body: JSON.stringify(user)
    });
}
