import { createSlice } from '@reduxjs/toolkit';

export type IReduxProps = {
 name: string;
 thumbnail: string;
 header: string;
 id: number;
 description: string;
}

const initialState = [{
  name: 'Teste',
  thumbnail: 'teste',
  header: 'Teste automotive',
  id: 1,
  description: 'Teste redux',
}];

const testSlice = createSlice({
  name: 'testRedux',
  initialState,
  reducers: {

  }
});

export default testSlice.reducer;
