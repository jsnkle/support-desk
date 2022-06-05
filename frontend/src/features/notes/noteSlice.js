import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import noteService from "features/notes/noteService";
import { getTicket } from "features/tickets/ticketSlice";

const initialState = {
	notes: [],
	noteError: false,
	noteSuccess: false,
	noteLoading: false,
	message: "",
};

// Get ticket notes
export const getNotes = createAsyncThunk(
	"notes/getAll",
	async (id, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await noteService.getNotes(id, token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();

			return thunkAPI.rejectWithValue(message);
		}
	}
);

// Create a ticket note
export const createNote = createAsyncThunk(
	"notes/create",
	async ({ noteText, id }, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await noteService.createNote(noteText, id, token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();

			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const noteSlice = createSlice({
	name: "note",
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(getNotes.pending, (state) => {
				state.noteLoading = true;
			})
			.addCase(getNotes.fulfilled, (state, action) => {
				state.noteLoading = false;
				state.noteSuccess = true;
				state.notes = action.payload;
			})
			.addCase(getNotes.rejected, (state, action) => {
				state.noteLoading = false;
				state.noteError = true;
				state.message = action.payload;
			})
			.addCase(createNote.pending, (state) => {
				state.noteLoading = true;
			})
			.addCase(createNote.fulfilled, (state, action) => {
				state.noteLoading = false;
				state.noteSuccess = true;
				state.notes.push(action.payload);
			})
			.addCase(createNote.rejected, (state, action) => {
				state.noteLoading = false;
				state.noteError = true;
				state.message = action.payload;
			});
	},
});

export const { reset } = noteSlice.actions;
export default noteSlice.reducer;
