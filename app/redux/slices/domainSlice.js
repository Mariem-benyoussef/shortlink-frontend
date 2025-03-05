// src/redux/domainSlice.js
import { deleteDomain, updateDomain } from "@/app/api/domaines/[id]/route";
import {
  createDomain,
  getDomains,
  setDefaultDomain,
} from "@/app/api/domaines/route";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunks
export const fetchDomains = createAsyncThunk(
  "domains/fetchDomains",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getDomains();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addDomain = createAsyncThunk(
  "domains/addDomain",
  async (domainName, { rejectWithValue }) => {
    try {
      const newDomain = await createDomain({ nom: domainName });
      return newDomain;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const setDomainAsDefault = createAsyncThunk(
  "domains/setDomainAsDefault",
  async (domainId, { rejectWithValue }) => {
    try {
      const result = await setDefaultDomain(domainId);
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editDomain = createAsyncThunk(
  "domains/editDomain",
  async ({ id, nom }, { rejectWithValue }) => {
    try {
      const result = await updateDomain(id, { nom });
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeDomain = createAsyncThunk(
  "domains/removeDomain",
  async (domainId, { rejectWithValue }) => {
    try {
      const result = await deleteDomain(domainId);
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice
const domainSlice = createSlice({
  name: "domains",
  initialState: {
    domains: [],
    currentDomain: "",
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDomains.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDomains.fulfilled, (state, action) => {
        state.isLoading = false;
        state.domains = action.payload;
        const defaultDomain = action.payload.find(
          (domain) => domain.is_default
        );
        if (defaultDomain) {
          console.log("defaultDomain", defaultDomain);
          state.currentDomain = defaultDomain.nom;
        } else if (action.payload.length > 0) {
          state.currentDomain = action.payload[0].nom;
        }
      })
      .addCase(fetchDomains.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addDomain.fulfilled, (state, action) => {
        state.domains.push(action.payload);
      })
      .addCase(setDomainAsDefault.fulfilled, (state, action) => {
        const domain = state.domains.find((d) => d.id === action.payload.id);
        if (domain && domain.is_default) {
          state.currentDomain = domain.nom;
        }
      })
      .addCase(editDomain.fulfilled, (state, action) => {
        const domain = state.domains.find((d) => d.id === action.payload.id);
        if (domain) {
          domain.nom = action.payload.nom;
          if (state.currentDomain === action.payload.oldName) {
            state.currentDomain = action.payload.nom;
          }
        }
      })
      .addCase(removeDomain.fulfilled, (state, action) => {
        state.domains = state.domains.filter((d) => d.id !== action.payload.id);
        if (state.currentDomain === action.payload.nom) {
          state.currentDomain = state.domains[0]?.nom || "";
        }
      });
  },
});

export default domainSlice.reducer;
