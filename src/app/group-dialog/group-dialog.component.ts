import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ProductsService} from '../services/products.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {concatMap, concatMapTo, last} from 'rxjs/operators';
import {consoleTestResultHandler} from 'tslint/lib/test';

@Component({
  selector: 'app-group-dialog',
  templateUrl: './group-dialog.component.html',
  styleUrls: ['./group-dialog.component.css']
})
export class GroupDialogComponent implements OnInit {
form: FormGroup;
description: string;
group;
uploadPercent$: Observable<number>;
downloadUrl$: Observable<string>;
saveDownload$: Observable<any>;

  constructor(
    @Inject(MAT_DIALOG_DATA) group,
    private dialogRef: MatDialogRef<GroupDialogComponent>,
    private fb: FormBuilder,
    private db: ProductsService,
    private storage: AngularFireStorage
  ) {
    this.group = group;
    const titles = group.titles;
    this.form = fb.group({
      description: [titles.description, Validators.required],
      longDescription: [titles.longDescription, Validators.required]
    });
  }

  ngOnInit() {
    console.log('GROUP ID', this.group.id)
  }
  uploadFile(event) {
    const file: File = event.target.files[0];
    const filePath = `groups/${this.group.id}/${file.name}`;
    const task = this.storage.upload(filePath, file);
    this.downloadUrl$ = task.snapshotChanges()
      .pipe(
        last(),
        concatMap(() => this.storage.ref(filePath).getDownloadURL())
      );
    this.saveDownload$ = this.downloadUrl$.pipe(
      concatMap(url => this.db.saveGroup(this.group.id, {imageUrl: url}))
    )
    this.saveDownload$.subscribe(el => console.log('Url Image Path', el))
  }
  save() {
    const changes = this.form.value;
    this.db.saveGroup(this.group.id, {titles: changes})
      .subscribe(
        () => this.dialogRef.close(this.form.value)
      );
  }
  close() {
    this.dialogRef.close();
  }
}
