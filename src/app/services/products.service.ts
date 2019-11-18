import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {first, map} from 'rxjs/operators';
import {from, Observable} from 'rxjs';
import {convertSnaps} from './db-util';
import OrderByDirection = firebase.firestore.OrderByDirection;

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private db: AngularFirestore) { }
  // getGroups(): Observable<any> {
  //   return this.db.collection(
  //     'groups',
  //     ref => ref.orderBy('seqNo')
  //   )
  //     .snapshotChanges()
  //     .pipe(
  //       map(snaps => convertSnaps<any>(snaps)),
  //       first());
  // }

  getGroups(): Observable<any> {
   return this.db.collection('groups', ref => ref.orderBy('seqNo'))
     .snapshotChanges()
      .pipe(
        map(snaps => convertSnaps<any>(snaps)),
        first()
      )
  }
  getOneGroup(groupUrl) {
    return this.db.collection('groups', ref => ref.where('url', '==', groupUrl))
      .snapshotChanges()
      .pipe(
        map(snaps => {
          const groups = convertSnaps(snaps);
          return groups.length ? groups[0] : undefined
        }),
        first()
      )
  }
  // findProducts(groupId: string,
  //              sortOrder: OrderByDirection = 'asc',
  //              pageNumber = 0,
  //              pageSize = 3
  //              ) {
  //   return this.db.collection(`groups/${groupId}/products`, ref => ref
  //     .orderBy('seqNo', sortOrder)
  //     .limit(pageSize)
  //     .startAfter(pageNumber * pageSize)
  //   )
  //     .snapshotChanges()
  //     .pipe(
  //       map(snaps => convertSnaps(snaps)),
  //       first()
  //     )
  //
  // }
  findProducts(groupId: string, sortOrder: OrderByDirection = 'asc') {
    return this.db.collection(`groups/${groupId}/products`, ref => ref
      .orderBy('seqNo', sortOrder)
    )
      .snapshotChanges()
      .pipe(
        map(snaps => convertSnaps(snaps)),
        first()
      )
  }
  saveGroup(groupId: string, changes: Partial<any>): Observable<any> {
    return from(this.db.doc(`groups/${groupId}`).update(changes));
  }
  saveItem(groupId, itemId: string, changes: Partial<any>): Observable<any> {
    return from(this.db.doc(`groups/${groupId}/products/${itemId}`).update(changes));
  }

}
