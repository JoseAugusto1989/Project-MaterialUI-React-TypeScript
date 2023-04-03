import { configureStore } from '@reduxjs/toolkit';
import testSlice from './reducers/objectTest';
import providersSlice from './reducers/providers';

const store = configureStore({
  reducer: {
    objectTest: testSlice,
    providers: providersSlice,
  }
});

export default store;