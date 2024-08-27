import { UserDTO } from '@/types/user';

export const getFirstLetterOfUsername = (user: UserDTO) => {
	return user.username[0].toUpperCase();
};
