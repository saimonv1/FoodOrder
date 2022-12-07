import { getUserData } from "../storage/auth.storage";

export default function authHeader() {
    const user = getUserData();

    if(user && user.accessToken) {
        return { Authorization: `Bearer ${user.accessToken}`, "Content-Type": "application/json" };
    } else {
        return {};
    }
}