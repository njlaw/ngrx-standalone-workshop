import { createFeatureSelector } from '@ngrx/store';
import { getRouterSelectors, MinimalRouterStateSnapshot, RouterReducerState } from '@ngrx/router-store';

export const ROUTER_FEATURE_KEY = 'router';

export const routerFeatureState = createFeatureSelector<RouterReducerState<MinimalRouterStateSnapshot>>(ROUTER_FEATURE_KEY);

export const {
  selectQueryParams,
  selectQueryParam,
  selectRouteParams,
  selectRouteParam,
  selectRouteData,
  selectUrl,
} = getRouterSelectors(routerFeatureState);
