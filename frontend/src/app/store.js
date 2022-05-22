import { configureStore } from "@reduxjs/toolkit";
import authReucer from "features/auth/authSlice";

export const store = configureStore({
	reducer: {
		auth: authReucer,
	},
});
