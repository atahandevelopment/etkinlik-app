import { createSlice } from '@reduxjs/toolkit'

export const metaTitleSlice = createSlice({
    name: 'metaTitle',
    initialState: {
        title: 'Dream Telekom'
    },
    reducers: {
        getTitle: (state, action) => {
            state.title = action.payload
          }
    }
})

export const { getTitle } = metaTitleSlice.actions;

export default metaTitleSlice.reducer;