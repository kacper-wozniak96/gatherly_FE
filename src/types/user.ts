export interface CreateUserDTO {
	userName: string;
	password: string;
	confirmPassword: string;
}

export interface LoginUserDTO {
	username: string;
	password: string;
}

export interface LoginUserResponseDTO {
	accessToken: string;
}

export interface UserDTO {
	id: number;
	username: string;
}
