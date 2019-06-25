import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ticket, User } from '../../../models';

@Component({
    selector: 'tm-ticket-detail',
    templateUrl: './ticket-detail.component.html',
    styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent {
    @Input() ticket: Ticket;
    @Input() users: User[];

    form: FormGroup;

    ngOnInit() {
        this.form = new FormGroup({
            id: new FormControl({ value: this.ticket.id, disabled: true }),
            description: new FormControl(this.ticket.description, {
                validators: [Validators.required]
            }),
            assigneeId: new FormControl(this.ticket.assigneeId)
        });
    }
}
