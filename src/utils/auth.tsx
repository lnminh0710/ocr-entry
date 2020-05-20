import { JWT_THE_KEY_OF_THE_LIFE } from "../constants/common";

export function setToken(token: string) {
    // localStorage.setItem(JWT_THE_KEY_OF_THE_LIFE, JSON.stringify(data));
    localStorage.setItem(JWT_THE_KEY_OF_THE_LIFE, token);
}

export function removeToken() {
    localStorage.removeItem(JWT_THE_KEY_OF_THE_LIFE);
}

export function getToken() {
    return (
        localStorage.getItem(JWT_THE_KEY_OF_THE_LIFE) ||
        "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGY2Yjg0Yzg3Zjk0YzA1YTQ0ZWI0MDMiLCJ1c2VybmFtZSI6Im1pbmhsbSIsImlzUm9vdCI6dHJ1ZSwiYWN0aXZlIjp0cnVlLCJlbWFpbCI6Im1pbmhiZW9AZ21haWwuY29tIiwiZnVsbE5hbWUiOiJNaW5oIExhbSIsInNlY3JldEtleSI6ImppYXB1dGVzdDEyMzQ1NiIsIm9yZ2FuaXphdGlvbiI6eyJfaWQiOiI1ZGQzOWMyZjBhOGYwMDAwMWQzY2YyYzMiLCJuYW1lIjoiTmlrZSJ9LCJyb2xlSWRzIjpbIjVlMWU4MDNjYWMwYzRlMDAxZWZlZjY5MSIsIjVlMjEyZTk2MTZmZjQzMDAxZTY2YjQ1NiIsIjVlNjNhNDAxZjAzYjAxMDAxZWY3MDI0MSIsIjVlOGQyZjVmOTU2NTMxMDAxZTA5NmM4NCIsIjVlNjNhNWNmMDU5MDQwMDg4ZmE5MDE4OCIsIjVkZDM5YzQ0MGE4ZjAwMDAxZDNjZjJjNCJdLCJpYXQiOjE1ODkyNzQ3NDgsImF1ZCI6ImppYXB1LmNvbSIsImlzcyI6ImppYXB1Iiwic3ViIjoiamlhcHVAZ21haWwuY29tIn0.Rv_0zxJptcPRZT07kKU5CG8Jnkqm-17kPvoVpvDJB0VsTuRWjYe0Sy4aFAgdzuEik9QRH84CJ-eH0DE2pkKQ2A"
    );
}

export function getUser(): any {
    let user = null;
    try {
        const token = getToken();
        if (token) {
            user = JSON.parse(atob(token.split(".")[1]));
            user.firstString = user.username.charAt(0);
        }
    } catch (error) {
        console.log(error);
    }

    return user;
}
