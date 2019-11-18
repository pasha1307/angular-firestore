import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductsService} from '../services/products.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-item-dialog',
  templateUrl: './item-dialog.component.html',
  styleUrls: ['./item-dialog.component.css']
})
export class ItemDialogComponent implements OnInit {
  form: FormGroup;
  product;
  grId;
  uploadPercent$: Observable<number>;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<ItemDialogComponent>,
    private fb: FormBuilder,
    private prodService: ProductsService,
    private storage: AngularFireStorage
  ) {
    console.log('DATA', data)
    this.product = data.items;
    this.grId = data.grId;
    console.log('prod', this.product)
    console.log('id', data.grId)
    this.form = this.fb.group({
      spec: [this.product.spec, Validators.required],
      title: [this.product.title, Validators.required]
    })
  }

  ngOnInit() {
  }
save() {
  this.prodService.saveItem(this.grId, this.product.id, this.form.value)
}
close() {
    this.dialogRef.close();
}
uploadFile(e) {}
}
