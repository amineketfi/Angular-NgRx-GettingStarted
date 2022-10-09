import { Injectable } from "@angular/core";
import { ProductService } from "../product.service";
import  { createEffect, Actions, ofType } from "@ngrx/effects";
import { map, mergeMap } from "rxjs/operators";
import * as ProductActions from "../state/product.actions";



@Injectable()
export class ProductEffects {

  constructor(
    private productService: ProductService,
    private actions$: Actions
  ){}

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      mergeMap(()=> this.productService.getProducts().pipe(
        map(products=> ProductActions.loadProductsSuccess({ products }))
      ))
    )
  })

}
