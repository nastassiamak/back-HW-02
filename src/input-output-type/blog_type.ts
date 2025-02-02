export type BlogBDType = {
    id: string;
    name: string;
    description: string;
    websiteUrl: string;
}

export type BlogViewModel = {
    id: string;
    name: string;
    description: string;
    websiteUrl: string;
}

export type BlogInputModel = {
    name: string; //maxLength: 15
    description: string; //maxLength: 500
    websiteUrl: string; //maxLength: 100 pattern: ^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$
}