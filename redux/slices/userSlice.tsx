import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction, Draft } from '@reduxjs/toolkit'
import axios from 'axios';
import { idle, loading } from '../../types/redux'
import type { TIDLE, TLOADING } from '../../types/redux'


export interface UserState {
  users: any[]
  name: string | null,
  family: string | null,
  age?: number | null,
  error: null | any,
  loading: TIDLE | TLOADING,
}

const internalInitialState: UserState = {
  users: [],
  name: null,
  family: null,
  age: 25,
  error: null,
  loading: idle
}


export const getUsers = createAsyncThunk<any[]>(
  // export const getUsers = createAsyncThunk(
  'users/getall',
  async (_: any, thunkAPI) => {
    try {
      const res = await axios.get('/api/users/');
      const data: any[] = await res.data
      // const data = await res.data as any[]
      return data

    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  });


export const userSlice = createSlice({
  name: 'user',
  initialState: internalInitialState,
  reducers: {
    reset: () => internalInitialState,

    setName: (state: Draft<typeof internalInitialState>, action: PayloadAction<typeof internalInitialState.name>) => {
      state.name = action.payload;
    },
  },
  extraReducers(builder) {
    // get Users
    builder.addCase(getUsers.pending, (state, action) => {
      state.loading = loading;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.loading = idle;
      state.error = action.error
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.loading = idle;
      state.users = action.payload;
    });
  },
})

// Action creators are generated for each case reducer function
export const { setName } = userSlice.actions

export default userSlice.reducer