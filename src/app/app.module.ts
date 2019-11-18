import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import {HttpClientModule} from '@angular/common/http';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule, MatDatepickerModule, MatDialogModule,
  MatIconModule, MatInputModule,
  MatListModule,
  MatMenuModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatSelectModule,
  MatSidenavModule, MatSortModule, MatTableModule,
  MatTabsModule, MatToolbarModule
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireStorageModule} from '@angular/fire/storage';
import { ProductGroupComponent } from './product-group/product-group.component';
import {GroupResolver} from './services/group.resolver';
import { GroupDialogComponent } from './group-dialog/group-dialog.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { ItemDialogComponent } from './item-dialog/item-dialog.component';
import { LoginComponent } from './login/login.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { TheformComponent } from './theform/theform.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    ProductGroupComponent,
    GroupDialogComponent,
    ItemDialogComponent,
    LoginComponent,
    AutocompleteComponent,
    TheformComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ScrollingModule,
    HttpClientModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    AppRoutingModule,
    MatSelectModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule,
    MatAutocompleteModule
  ],
  providers: [GroupResolver],
  bootstrap: [AppComponent],
  entryComponents: [GroupDialogComponent, ItemDialogComponent]
})
export class AppModule { }
