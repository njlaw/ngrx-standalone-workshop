import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { provideRouter } from "@angular/router";
import { routes } from "./app/router/routes";
import { provideHttpClient } from "@angular/common/http";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { ProductEffects } from './app/product/product.effects';
import * as cartEffects from './app/cart/cart.effects';
import * as errorEffects from './app/error/error.effects';
import { CART_FEATURE_KEY, cartReducer } from './app/cart/cart.reducer';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { ROUTER_FEATURE_KEY } from './app/router/router.selectors';
import { productFeature } from './app/product/product.reducer';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    provideStore(),
    provideState(CART_FEATURE_KEY, cartReducer),
    provideState(ROUTER_FEATURE_KEY, routerReducer),
    provideState(productFeature),
    provideRouterStore({ stateKey: ROUTER_FEATURE_KEY }),
    provideEffects(ProductEffects, errorEffects, cartEffects),
    provideStoreDevtools(),
  ],
}).catch(err => console.error('Caught an unhandled error during application bootstrap:', err));
