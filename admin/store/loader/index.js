import { createSlice } from '@reduxjs/toolkit'

export const loaderSlice = createSlice({
    name: 'loader',
    initialState: {
        loader: true,
    },
    reducers: {
        getLoader: (state, action) => {
            state.loader = action.payload
          }
    }
})

export const { getLoader } = loaderSlice.actions;

export default loaderSlice.reducer;