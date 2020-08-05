import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth.service';

export class AuthGuard implements CanActivate
{
    constructor(private authService: AuthService,
                private route: Router)
    {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    {
        if(this.authService.isAuthenticated())
        {
            return true;
        }
        else
        {
            this.route.navigate(['/signin'])
            // this.route.navigate(['/unauthorized'])
            return false;
        }
    }
}