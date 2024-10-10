import { apiSlice } from "@src/api/apiSlice.ts";
import { sub } from "date-fns";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

interface IPost {
	id: number;
	title: string;
	body: string;
	userId: number;
	date: string;
	reactions: {
		thumbsUp: number;
		wow: number;
		heart: number;
		rocket: number;
		coffee: number;
	};
}

const postsAdapter = createEntityAdapter<IPost>({
	sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = postsAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getPosts: builder.query({
			query: () => "/posts",
			transformResponse: (res: IPost[]) => {
				let min = 1;
				const loadedPosts = res.map((post) => {
					if (!post?.date) {
						post.date = sub(new Date(), {
							minutes: min++,
						}).toISOString();
					}

					if (!post?.reactions) {
						post.reactions = {
							thumbsUp: 0,
							wow: 0,
							heart: 0,
							rocket: 0,
							coffee: 0,
						};
					}

					return post;
				});

				return postsAdapter.setAll(initialState, loadedPosts);
			},
		}),
	}),
});

export const { useGetPostsQuery } = extendedApiSlice;

export const selectPostsResult = extendedApiSlice.endpoints.getPosts.select({});
const selectPostsData = createSelector(
	selectPostsResult,
	(postsResult) => postsResult.data,
);
export const { selectIDs: selectPostsIDs } = postsAdapter.getSelectors(
	(state) => selectPostsData(state) ?? initialState,
);
