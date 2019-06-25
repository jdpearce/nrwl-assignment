import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { Ticket, User } from '../../../models';
import { TicketManagerFeatureState } from '../../store/ticket-manager.reducer';
import { getTickets, getUsers } from '../../store/ticket-manager.selectors';

@Component({
    selector: 'tm-ticket-detail-card',
    templateUrl: './ticket-detail-card.component.html',
    styleUrls: ['./ticket-detail-card.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketDetailCardComponent implements OnInit {
    ticket$: Observable<Ticket>;
    users$: Observable<User[]>;

    constructor(private store: Store<TicketManagerFeatureState>, private route: ActivatedRoute) {}

    ngOnInit() {
        this.ticket$ = this.route.params.pipe(
            withLatestFrom(this.store.pipe(select(getTickets))),
            map(([params, tickets]: [{ id: string }, Ticket[]]) => tickets && tickets.find(t => t.id.toString() === params.id))
        );

        this.users$ = this.store.pipe(select(getUsers));
    }
}
