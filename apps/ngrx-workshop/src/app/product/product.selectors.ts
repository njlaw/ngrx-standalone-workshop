import { productAdapter, productFeature } from './product.reducer';
import { selectRouteParam } from '../router/router.selectors';
import { createSelector } from '@ngrx/store';

export const selectCurrentProductId = selectRouteParam('productId');

const { selectAll, selectEntities } = productAdapter.getSelectors();

export const selectProducts = createSelector(productFeature.selectProducts, selectAll);
export const selectProductEntities = createSelector(productFeature.selectProducts, selectEntities);

export const selectCurrentProduct = createSelector(selectProductEntities, selectCurrentProductId, (productEntities, id) => {
  if (id == null)
    return undefined;

  return productEntities[id];
});
