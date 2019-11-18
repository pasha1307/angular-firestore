import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'BagelLandSite';
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(private afAuth: AngularFireAuth) {
  }

  ngOnInit() {
    this.isLoggedIn$ = this.afAuth.authState.pipe(
      map(user => !!user)
    );
    this.isLoggedOut$ = this.afAuth.authState.pipe(
      map(user => !user)
    );
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
