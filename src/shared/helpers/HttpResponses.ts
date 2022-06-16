export interface IHttpResponse {
    statusCode: number;
    body: any;
}

export const http200Success = (body: any): IHttpResponse => ({
    statusCode: 200,
    body: body,
});

export const http201Success = (body: any): IHttpResponse => ({
    statusCode: 201,
    body: body,
});

export const http400BadRequest = (body: any): IHttpResponse => ({
    statusCode: 400,
    body: body,
});

export const http500ServerError = (message: string): IHttpResponse => ({
    statusCode: 500,
    body: {
        message: message,
    },
});