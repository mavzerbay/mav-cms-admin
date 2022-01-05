import { Injectable, isDevMode } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { filter, map, Observable } from 'rxjs';
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
    private authService: MavAuthService,
  ) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('token');
    if (token != null) {
      this.authService.loadCurrentUser().subscribe();
      return this.authService.currentUser$.pipe(
        filter(x => !!x),
        map(user => {
          return true;
        })
      );
    } else {
      localStorage.removeItem('token');
      this.router.navigate(['Account/Login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }

}
