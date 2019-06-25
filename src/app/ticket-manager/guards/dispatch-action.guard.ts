import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { TicketManagerFeatureState } from '../store/ticket-manager.reducer';

@Injectable({
    providedIn: 'root'
})
export class DispatchActionGuard implements CanActivate {
    constructor(private store: Store<TicketManagerFeatureState>) {}

    canActivate(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean {
        if (route.data.guardActions) {
            route.data.guardActions.forEach(action => {
                this.store.dispatch(action);
            });
        }
        return true;
    }
}
