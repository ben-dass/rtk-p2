import { useAppSelector } from "@src/app/store.ts";
import { selectPostById } from "@features/posts/postsSlice.ts";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@components/ui/card.tsx";
import { formatDistanceToNow, parseISO } from "date-fns";
import { selectAllUsers } from "@features/users/usersSlice.ts";

interface IPostProps {
	postId: number;
}

const Post = ({ postId }: IPostProps) => {
	const post = useAppSelector((state) => selectPostById(state, postId));
	const users = useAppSelector(selectAllUsers);
	const author = users.find((user) => user.id === post.userId);
	console.log(users);

	let timeago = "";
	if (post.date) {
		const dateISO = parseISO(post.date);
		const timePeriod = formatDistanceToNow(dateISO);
		timeago = `${timePeriod} ago`;
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>{post.title}</CardTitle>
			</CardHeader>
			<CardContent>
				<p>{post.body}</p>
			</CardContent>
			<CardFooter className="text-xs text-gray-500">
				{/*{author ? <p>{author.name}</p>}*/}
				{timeago}
			</CardFooter>
		</Card>
	);
};

export default Post;
