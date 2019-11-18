import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ProductsService} from './products.service';
import {Injectable} from '@angular/core';
@Injectable()
export class GroupResolver implements Resolve<any> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    const id = route.paramMap.get('groupUrl')
    return this.db.getOneGroup(id);
  }
  constructor(private db: ProductsService) {}
}
