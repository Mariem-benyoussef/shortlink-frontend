import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchShortlinks = createAsyncThunk(
  "shortlink/fetchShortlinks",
  async () => {
    const response = await fetch(`${API_URL}/api/shortlinks`);
    const data = await response.json();
    return data;
  }
);

const shortlinkSlice = createSlice({
  name: "shortlink",
  initialState: {
    shortlinks: [],
    loading: false,
    error: null,
  },
  reducers: {
    addShortlink: (state, action) => {
      state.shortlinks.push(action.payload);
    },
    removeShortlink: (state, action) => {
      state.shortlinks = state.shortlinks.filter(
        (link) => link.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShortlinks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShortlinks.fulfilled, (state, action) => {
        state.loading = false;
        state.shortlinks = action.payload;
      })
      .addCase(fetchShortlinks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addShortlink, removeShortlink } = shortlinkSlice.actions;

export default shortlinkSlice.reducer;
