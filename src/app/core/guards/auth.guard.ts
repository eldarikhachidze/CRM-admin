import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthFacadeService} from "../facades/auth-facade.service";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authFacade: AuthFacadeService,
    private router: Router
  ) {
  }

  canActivate(): boolean {
    const isLoggedIn = this.authFacade.isLoggedIn();  // Check for a valid token

    if (!isLoggedIn) {
      return false;
    }
    return true;
  }
}
