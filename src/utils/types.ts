export type JsonData = {
    success: boolean;
    data: any;
}

export type User = {
    date: string,
    email: string,
    name: string,
    password: string,
    _id: string
}

export type PostData = {
    content: string,
    date: string,
    liked: boolean,
    likes: number,
    title: string,
    userId: string,
    userName: string,
    _id: string
}

export type LikeData = {
    liked: boolean,
    likes: number,
    onClick: (liked: boolean) => void
}