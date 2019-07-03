import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, switchMap } from 'rxjs/operators';
import { BackendService } from '../../core/backend.service';
import {
    addTicket,
    assignTicket,
    getTickets,
    getTicketsFailure,
    getTicketsSuccess,
    getUsers,
    getUsersFailure,
    getUsersSuccess,
    ticketAdded,
    ticketAssigned
} from './ticket-manager.actions';

@Injectable({
    providedIn: 'root'
})
export class TicketManagerEffects {
    constructor(private actions$: Actions, private service: BackendService) {}

    getUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getUsers),
            switchMap(() => this.service.users()),
            map(users =>
                getUsersSuccess({
                    users
                })
            ),
            catchError(error => of(getUsersFailure({ error })))
        )
    );

    getTickets$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getTickets),
            switchMap(() => this.service.tickets()),
            map(tickets =>
                getTicketsSuccess({
                    tickets
                })
            ),
            catchError(error => of(getTicketsFailure({ error })))
        )
    );

    addTicket$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addTicket),
            concatMap(action => this.service.newTicket(action)),
            map(ticket => ticketAdded({ ticket }))
        )
    );

    assignTicket$ = createEffect(() =>
        this.actions$.pipe(
            ofType(assignTicket),
            concatMap(action => this.service.assign(action.ticketId, action.userId)),
            map(ticket => ticketAssigned({ ticket }))
        )
    );
}
