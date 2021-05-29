export const initialState = { products: [] };

export function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            const products = state.products;
            products.push(action.payload);
            return { ...state, products };


        case 'clear':
            return { ...state, products: action.payload };


        default:
            throw new Error();
    }
}