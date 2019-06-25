import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { BackendService } from '../../core/backend.service';
import {
    AddTicket,
    GetTicketsFailure,
    GetTicketsSuccess,
    GetUsersFailure,
    GetUsersSuccess,
    TicketAdded,
    TicketManagerActionType
} from './ticket-manager.actions';

@Injectable({
    providedIn: 'root'
})
export class TicketManagerEffects {
    constructor(private actions$: Actions, private service: BackendService) {}

    @Effect()
    getUsers$ = this.actions$.pipe(
        ofType(TicketManagerActionType.GetUsers),
        switchMap(() => this.service.users()),
        map(
            users =>
                new GetUsersSuccess({
                    users
                })
        ),
        catchError(error => of(new GetUsersFailure({ error })))
    );

    @Effect()
    getTickets$ = this.actions$.pipe(
        ofType(TicketManagerActionType.GetUsers),
        switchMap(() => this.service.tickets()),
        map(
            tickets =>
                new GetTicketsSuccess({
                    tickets
                })
        ),
        catchError(error => of(new GetTicketsFailure({ error })))
    );

    @Effect()
    addTicket$ = this.actions$.pipe(
        ofType(TicketManagerActionType.AddTicket),
        switchMap((action: AddTicket) => this.service.newTicket(action.payload)),
        map(ticket => new TicketAdded({ ticket }))
    );
}
