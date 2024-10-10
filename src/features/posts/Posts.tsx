import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@components/ui/form.tsx";
import { Input } from "@components/ui/input.tsx";
import { Textarea } from "@components/ui/textarea.tsx";
import { Button } from "@components/ui/button.tsx";
import { useGetPostsQuery } from "@features/posts/postsSlice.ts";
import { useAppSelector } from "@src/app/store.ts";

const formSchema = z.object({
	title: z.string().min(2).max(50),
	content: z.string().min(2).max(50),
});

const Posts = () => {
	const { isLoading, isSuccess, isError, error } = useGetPostsQuery({});
	const orderedPostsIDs = useAppSelector(selectPostIDs);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			content: "",
		},
	});

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		console.log(values);
	};

	let posts;
	if (isLoading) {
		posts = <p>Loading...</p>;
	} else if (isError) {
		console.log(error);
	} else if (isSuccess) {
		posts = J;
	}

	return (
		<section className="w-[80%]">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<p className="mb-4 text-2xl font-bold uppercase">
						New Post
					</p>
					<hr className="-mt-3 mb-5" />
					<FormField
						name="title"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input
										placeholder="Title"
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						name="content"
						control={form.control}
						render={({ field }) => (
							<FormItem className="mt-2">
								<FormLabel>Content</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Content"
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<Button
						className="mt-4 w-full"
						type="submit"
					>
						Post
					</Button>
				</form>
			</Form>

			<p className="mb-4 mt-12 text-2xl font-bold uppercase">Posts</p>
			<hr className="-mt-3 mb-5" />
			{posts}
		</section>
	);
};

export default Posts;
