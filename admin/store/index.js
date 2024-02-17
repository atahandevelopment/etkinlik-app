import { configureStore } from '@reduxjs/toolkit';
import metaTitleReducer from './meta-title';
import loaderReducer from './loader';

export default configureStore({
  reducer: {
    metaTitle: metaTitleReducer,
    loader: loaderReducer
  }
})