import { Component, Input } from '@angular/core';
import { Ticket } from '../../../models';

@Component({
    selector: 'tm-ticket-table',
    templateUrl: './ticket-table.component.html',
    styleUrls: ['./ticket-table.component.css']
})
export class TicketTableComponent {
    @Input() tickets: Ticket[];

    displayedColumns: string[] = ['id', 'description', 'completed'];
}
