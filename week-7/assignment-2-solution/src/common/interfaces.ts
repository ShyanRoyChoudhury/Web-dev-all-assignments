export interface LoginResponse{
    message: string;
    token: string;
}

export interface LoginRequest{
    username: string;
    password: string;
}

export interface SignupRequest{
    username: string,
    password: string
}

export interface SignupResponse{
    message: string;
    token: string;
}

export interface TodoResponse{
    _id: string;
    title: string;
    description: string;
    userId: string;
    done: string;
}

export interface authenticate {
    username: string;
    token: string;
}

