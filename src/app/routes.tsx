import { createBrowserRouter } from "react-router-dom";
import App from "@src/App.tsx";
import NotFound from "@features/NotFound.tsx";
import Posts from "@features/posts/Posts.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				children: [
					{
						index: true,
						element: <Posts />,
					},
				],
			},
			{
				path: "*",
				element: <NotFound />,
			},
		],
	},
]);

export default router;
