import React from 'react';
import { jwtDecode} from "jwt-decode";

interface UserPayload {email: string};

export const getUserEmailFromToken = (token: string) => {
    try {
        const decoded = jwtDecode<UserPayload>(token);
        return decoded.email;
    } 
    catch (error) {
        console.error("Invalid token", error);
        return null;
    }
}

