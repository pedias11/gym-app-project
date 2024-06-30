export interface User {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    subscription?: string;
}

export interface Credentials {
    email: string;
    password: string;
}

export interface LoggedInUser {
    fullname: string;
    email: string;
}
