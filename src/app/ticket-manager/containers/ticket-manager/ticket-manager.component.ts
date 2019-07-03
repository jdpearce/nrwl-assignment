import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { LoadingStatus, Ticket } from '../../../models';
import { addTicket } from '../../store/ticket-manager.actions';
import { TicketManagerFeatureState } from '../../store/ticket-manager.reducer';
import { getTickets, getTicketsLoadingStatus, getUsersLoadingStatus } from '../../store/ticket-manager.selectors';

@Component({
    selector: 'tm-ticket-manager',
    templateUrl: './ticket-manager.component.html',
    styleUrls: ['./ticket-manager.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketManagerComponent implements OnInit {
    tickets$: Observable<Ticket[]>;
    loading$: Observable<boolean>;

    form: FormGroup;

    constructor(private store: Store<TicketManagerFeatureState>) {}

    ngOnInit() {
        this.tickets$ = this.store.pipe(select(getTickets));

        this.loading$ = combineLatest(
            this.store.pipe(select(getTicketsLoadingStatus)),
            this.store.pipe(select(getUsersLoadingStatus))
        ).pipe(
            map(
                ([ticketsStatus, usersStatus]: [LoadingStatus, LoadingStatus]) =>
                    ticketsStatus === LoadingStatus.Loading || usersStatus === LoadingStatus.Loading
            ),
            startWith(true)
        );

        this.form = new FormGroup({ description: new FormControl(null, { validators: [Validators.required] }) });
    }

    addTicket(): void {
        if (this.form.valid) {
            this.store.dispatch(addTicket(this.form.value));
        }
    }
}
