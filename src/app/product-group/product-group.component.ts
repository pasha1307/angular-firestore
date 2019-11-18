import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductsService} from '../services/products.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ItemDialogComponent} from '../item-dialog/item-dialog.component';

@Component({
  selector: 'app-product-group',
  templateUrl: './product-group.component.html',
  styleUrls: ['./product-group.component.css']
})
export class ProductGroupComponent implements OnInit {
group;
products;
loading = false;
loadedPage = 0;
  constructor(private route: ActivatedRoute,
              private db: ProductsService,
              private dialog: MatDialog
              ) { }

  ngOnInit() {
    this.group = this.route.snapshot.data.group;
    this.db.findProducts(this.group.id).subscribe(res => this.products = res);
  }
loadMore() {
    this.loadedPage++;
    this.db.findProducts(this.group.id, 'asc')
    .subscribe(res => {
    this.products = this.products.concat(res)
  })
}
editProduct(product) {
    const dc = new MatDialogConfig();
    dc.autoFocus = true;
    dc.disableClose = true;
    dc.data = {
      items: product,
      grId: this.group.id
    }
    this.dialog.open(ItemDialogComponent, dc)
}
 }
