import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CommentDTO } from '@/types/post';
import { UserDTO } from '@/types/user';
import { localStorageUserIdKey } from '@/utils/accessToken';
import { getFirstLetterOfUsername } from '@/utils/getFirstLetterOfUsername';
import { Separator } from '@radix-ui/react-separator';
import { DeleteButton } from './DeleteButton';

interface Props {
	comment: CommentDTO;
}

export const Comment = ({ comment }: Props) => {
	const storedUserId = localStorage.getItem(localStorageUserIdKey);

	const isCommentCreatedByCurrentLoggedInUser = Number(storedUserId) === comment.user.id;

	return (
		<div className="my-5 relative group hover:bg-gray-50 rounded-xl px-3 py-1">
			<div className="flex items-center my-1">
				<Avatar className="w-8 h-8 mr-2">
					<AvatarImage src={comment?.user?.avatarSignedURL ?? ''} alt="@shadcn" />
					<AvatarFallback className="text-xl">
						{getFirstLetterOfUsername(comment?.user as UserDTO)}
					</AvatarFallback>
				</Avatar>
				<span className="font-light">{comment.user.username}</span>
			</div>
			<span className="break-all">{comment.text}</span>
			<Separator />
			{isCommentCreatedByCurrentLoggedInUser && <DeleteButton comment={comment} />}
		</div>
	);
};
