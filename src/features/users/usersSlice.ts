import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "@src/api/apiSlice.ts";
import { RootState } from "@src/app/store.ts";

interface IUser {
	id: number;
	name: string;
	username: string;
	email: string;
	address: {
		street: string;
		suite: string;
		city: string;
		zipcode: string;
		geo: {
			lat: number;
			lng: number;
		};
	};
	phone: string;
	website: string;
	company: {
		name: string;
		catchPhrase: string;
		bs: string;
	};
}

const usersAdapter = createEntityAdapter<IUser>();
const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getUsers: builder.query({
			query: () => "/users",
			transformResponse: (res: IUser[]) => {
				return usersAdapter.setAll(initialState, res);
			},
			providesTags: (result) =>
				result
					? [
							{ type: "User", id: "LIST" },
							...result.ids.map((id) => ({
								type: "User" as const,
								id,
							})),
						]
					: [{ type: "User", id: "LIST" }],
		}),
	}),
});

export const { useGetUsersQuery } = usersApiSlice;

export const selectUsersResult = usersApiSlice.endpoints.getUsers.select({});
const selectUsersData = createSelector(
	selectUsersResult,
	(users) => users.data,
);
export const {
	selectAll: selectAllUsers,
	selectById: selectUserById,
	selectIds: selectUserIds,
} = usersAdapter.getSelectors(
	(state: RootState) => selectUsersData(state) ?? initialState,
);
