import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { LoadingStatus } from '../../models/loading-status';
import { TicketManagerFeatureState } from '../store/ticket-manager.reducer';
import { getTickets, getTicketsLoadingStatus } from '../store/ticket-manager.selectors';

@Injectable({
    providedIn: 'root'
})
export class TicketExistsGuard implements CanActivate {
    constructor(private store: Store<TicketManagerFeatureState>, private router: Router) {}

    waitForCollectionToLoad(): Observable<LoadingStatus> {
        return this.store.pipe(
            select(getTicketsLoadingStatus),
            filter(status => Boolean(status === LoadingStatus.Loaded)),
            take(1)
        );
    }

    hasTicketInStore(id: string): Observable<boolean> {
        return this.store.pipe(
            select(getTickets),
            map(tickets => tickets.some(t => t.id.toString() === id))
        );
    }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        return this.waitForCollectionToLoad().pipe(switchMap(() => this.hasTicketInStore(route.params['id'])));
    }
}
