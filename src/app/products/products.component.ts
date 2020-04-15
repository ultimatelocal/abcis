import { ProductsServiceApi } from './facade/products-service-api';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { map, takeUntil } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { Product } from './facade/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  destroy$ = new Subject();
  columnsToDisplay = ['plu', 'ordercode', 'desc40', 'deptcode', 'deptname', 'supplier', 'cost', 'ctnqty', 'sell'];
  products$;

  constructor(private productsApi: ProductsServiceApi) { }

  ngOnInit(): void {
    this.productsApi.getProducts()
      .pipe(
        takeUntil(this.destroy$),
        map(data => data)
      ).subscribe((products: Product[]) => {
        this.products$ = new MatTableDataSource(products);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  filter(event: Event) {
    console.log("test");
    const filterValue = (event.target as HTMLInputElement).value;
    this.products$.filter = filterValue.trim().toLowerCase();
  }
}
