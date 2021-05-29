export const initialState = {productSelected: []};

export function reducer(state, action) {
  switch (action.type) {
    case 'increment':
        const productSelected = state.productSelected;
        productSelected.push(action.payload);
      return {...state, productSelected};
    default:
      throw new Error();
  }
}