import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Ticket, User } from '../../../models';
import { assignTicket } from '../../store/ticket-manager.actions';
import { TicketManagerFeatureState } from '../../store/ticket-manager.reducer';

@Component({
    selector: 'tm-ticket-detail',
    templateUrl: './ticket-detail.component.html',
    styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent {
    @Input() ticket: Ticket;
    @Input() users: User[];
    @Input() lastUpdated: Date;

    form: FormGroup;

    constructor(private store: Store<TicketManagerFeatureState>) {}

    ngOnInit() {
        this.form = new FormGroup({
            id: new FormControl({ value: this.ticket.id, disabled: true }),
            description: new FormControl(this.ticket.description, {
                validators: [Validators.required]
            }),
            assigneeId: new FormControl(this.ticket.assigneeId)
        });
    }

    assign(): void {
        const userId = this.form.get('assigneeId').value;
        if (userId) {
            this.store.dispatch(assignTicket({ ticketId: this.ticket.id, userId }));
        }
    }
}
