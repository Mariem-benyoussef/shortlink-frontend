import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createDomain,
  setDefaultDomain,
  updateDomain,
  deleteDomain,
  getDomains,
} from "@/app/api/domaines/route";

export const fetchDomains = createAsyncThunk(
  "domains/fetchDomains",
  async () => {
    const response = await getDomains();
    return response;
  }
);

export const saveDomain = createAsyncThunk(
  "domains/saveDomain",
  async (domain) => {
    const existingDomain = await getDomains();
    const foundDomain = existingDomain.find((d) => d.nom === domain.nom);
    if (foundDomain) {
      await setDefaultDomain(foundDomain.id);
      return foundDomain;
    } else {
      const newDomain = await createDomain({ nom: domain.nom });
      await setDefaultDomain(newDomain.id);
      return newDomain;
    }
  }
);

export const updateExistingDomain = createAsyncThunk(
  "domains/updateDomain",
  async (domain) => {
    return await updateDomain(domain.id, { nom: domain.nom });
  }
);

export const deleteExistingDomain = createAsyncThunk(
  "domains/deleteDomain",
  async (domainId) => {
    await deleteDomain(domainId);
    return domainId;
  }
);

const domainSlice = createSlice({
  name: "domain",
  initialState: {
    domains: [],
    currentDomain: null,
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
      })
      .addCase(fetchDomains.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(saveDomain.fulfilled, (state, action) => {
        state.domains.push(action.payload);
        state.currentDomain = action.payload.nom;
      })
      .addCase(updateExistingDomain.fulfilled, (state, action) => {
        const index = state.domains.findIndex(
          (d) => d.id === action.payload.id
        );
        if (index !== -1) {
          state.domains[index] = action.payload;
        }
      })
      .addCase(deleteExistingDomain.fulfilled, (state, action) => {
        state.domains = state.domains.filter(
          (domain) => domain.id !== action.payload
        );
      });
  },
});

export default domainSlice.reducer;
