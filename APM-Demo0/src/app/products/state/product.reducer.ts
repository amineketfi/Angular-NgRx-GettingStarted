import { createAction, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { Product } from '../product';
import * as AppState from '../../state/app.state';
import * as ProductActions from './product.actions';
import { state } from '@angular/animations';


export interface IState extends AppState.IState {
  products: IProductState;
}

export interface IProductState {
  showProductCode: boolean;
  // currentProductId: number; used encapsulation
  currentProduct: Product;
  products : Product[];
}

const initialState: IProductState = {
  showProductCode: true,
  // currentProductId: null, used in encapsulation
  currentProduct: null,
  products: []
}

/* Selectors for Product Feature Module */
const getProductFeatureState = createFeatureSelector<IProductState>('products');

export const getShowProductCode = createSelector(
  getProductFeatureState,
  state => state.showProductCode
);

export const getProducts = createSelector(
  getProductFeatureState,
  state => state.products
);

// // Seperate every bit information of data for encapsulation and facilate futur refactoration of the code
// export const getCurrentProductId = createSelector(
//   getProductFeatureState,
//   state => state.currentProductId
// );

// export const getCurrentProduct = createSelector(
//   getProductFeatureState,
//   getCurrentProductId,
//   (state, currentProductId) =>
//     state.products.find(p => p.id === currentProductId)
// );
export const getCurrentProduct = createSelector(
  getProductFeatureState,
  state => state.currentProduct
);


/* Reducer */
export const productReducer  = createReducer<IProductState>(
  initialState, // initialazedState
  on(ProductActions.toggleProductCode, (state): IProductState => {
    // console.log('original state: ' + JSON.stringify(state));
    return {
      ...state,
      showProductCode: !state.showProductCode
    };
  }),
  on(ProductActions.setCurrentProduct, (state,action):IProductState => {
    return {
      ...state,
      currentProduct: action.product
    };
  }),
  on(ProductActions.clearCurrentProduct, (state):IProductState => {
    return {
      ...state,
      currentProduct: null
    };
  }),
  on(ProductActions.initializeCurrentProduct, (state):IProductState => {
    return {
      ...state,
      currentProduct: {
        id: 0,
        productName: '',
        productCode: '',
        description: '',
        starRating:0
      }
    };
  }),
  on(ProductActions.loadProductsSuccess, (state, action): IProductState => {
    return {
      ...state,
      products: action.products
    }
  })

);
