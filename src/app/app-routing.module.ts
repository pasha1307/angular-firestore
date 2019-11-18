import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {ContactComponent} from './contact/contact.component';
import {ProductGroupComponent} from './product-group/product-group.component';
import {GroupResolver} from './services/group.resolver';
import {LoginComponent} from './login/login.component';
import {TheformComponent} from './theform/theform.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent

  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'test',
    component: TheformComponent
  },
  {
    path: 'contacts',
    component: ContactComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'products/:groupUrl',
    component: ProductGroupComponent,
    resolve: {
      group: GroupResolver
    }
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
