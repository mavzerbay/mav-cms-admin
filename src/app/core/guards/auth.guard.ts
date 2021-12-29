import { Injectable, isDevMode } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MavAuthService } from 'src/app/shared/services/mav-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  /**
   *
   */
  constructor(
    private router: Router,
    private authSerice: MavAuthService,
  ) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('token');
    if (token) {
      this.authSerice.loadCurrentUser().subscribe((response) => {
        if (response.isSuccess && isDevMode())
          console.log("currentUser Loaded", response.dataSingle);
        else
          this.router.navigate(['Account/Login'], { queryParams: { returnUrl: state.url } });
      });
      return true;
    } else {
      localStorage.removeItem('token');
      this.router.navigate(['Account/Login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }

}
