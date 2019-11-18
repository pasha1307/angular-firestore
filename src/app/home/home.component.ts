import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {ProductsService} from '../services/products.service';
import {Observable} from 'rxjs';
import {GroupDialogComponent} from '../group-dialog/group-dialog.component';
import {MatDialog, MatDialogActions, MatDialogConfig} from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
groups$: Observable<any>;
bckgImage = '/assets/h-street.jpg';
  constructor(private db: ProductsService, private dialog: MatDialog) { }

  ngOnInit() {
  this.groups$ = this.db.getGroups();
  }
  editGroup(group) {
    const dConfig = new MatDialogConfig();
    dConfig.disableClose = true;
    dConfig.autoFocus = true;
    dConfig.data = group;
    this.dialog.open(GroupDialogComponent, dConfig);
  }
}
