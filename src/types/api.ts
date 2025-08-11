export type SuccessResponse<T> = { success: true; data: T; message?: string };
export type ErrorResponse = { success: false; error: { code?: string; message: string; details?: any } };

export type LoginResponse = SuccessResponse<{ token: string; user: any }> | ErrorResponse;
export type RegisterResponse = SuccessResponse<{ user_id: string; username?: string; email: string }> | ErrorResponse;

