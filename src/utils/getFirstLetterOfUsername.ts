import { UserDTO } from 'gatherly-types';

export const getFirstLetterOfUsername = (user: UserDTO) => {
	return user.username[0].toUpperCase();
};
