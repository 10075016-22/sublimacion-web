export interface ApiConfig {
    headers: {
        'Content-Type': string;
        Authorization?: string;
    };
    data?: any;
}

export interface QueryParams {
    t?: string;
    [key: string]: string | undefined;
}

export interface ApiResponse {
    data: any;
    timestamp: string;
    message: string;
}

export interface ApiParams {
    path: string;
}