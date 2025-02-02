export type PostDBType = {
    id: string;
    title: string;
    shortDescription: string;
    content: string;
    blogId: string;
    blogName: string;
}

export type PostViewModel = {
    id: string;
    title: string;
    shortDescription: string;
    content: string;
    blogId: string;
    blogName: string;
}

export type PostInputModel = {
    title: string; //maxLength: 30
    shortDescription: string; //maxLength: 100
    content: string; //maxLength: 1000
    blogId: string;

}



