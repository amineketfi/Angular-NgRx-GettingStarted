import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import * as ProductActions from '../state/product.actions';
import { getCurrentProduct, getProducts, getShowProductCode, IState } from '../state/product.reducer';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products$: Observable<Product[]>;

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  // sub: Subscription;

  constructor(
    private productService: ProductService,
    private store: Store<IState>
    ) { }

  ngOnInit(): void {
    // Using Services:
    // this.sub = this.productService.selectedProductChanges$.subscribe(
    //   currentProduct => this.selectedProduct = currentProduct
    // );

    /* Using NgRx: */
    //TODO: Unsubscribe
    this.store.select(getCurrentProduct).subscribe(
      currentProduct => this.selectedProduct = currentProduct
    );


    // // Using services and behaviour shubjects to load data
    // this.productService.getProducts().subscribe({
    //   next: (products: Product[]) => this.products = products,
    //   error: err => this.errorMessage = err
    // });

    // Using NgRx Effects:
    this.products$ = this.store.select(getProducts);
    this.store.dispatch(ProductActions.loadProducts());


    // TODO: Unsubscribe
    /* this.store.pipe(select('products')) */
    this.store.select(getShowProductCode).subscribe(
      showProductCode => this.displayCode = showProductCode
    );
  }
  // Unsbscribe from a service Obsevable
  // ngOnDestroy(): void {
  //   this.sub.unsubscribe();
  // }

  checkChanged(): void {
    // this.displayCode = !this.displayCode;
    this.store.dispatch(ProductActions.toggleProductCode());
  }

  newProduct(): void {
    // Component communication using a Service
    // this.productService.changeSelectedProduct(this.productService.newProduct());

     // Component communication using NgRx
     this.store.dispatch(ProductActions.initializeCurrentProduct());

  }

  productSelected(product: Product): void {
    // Component communication using a Service
    // this.productService.changeSelectedProduct(product);

    // Component communication using NgRx
    this.store.dispatch(ProductActions.setCurrentProduct({ product }));
  }

}
