import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketDetailCardComponent } from './containers/ticket-detail-card/ticket-detail-card.component';
import { TicketManagerComponent } from './containers/ticket-manager/ticket-manager.component';
import { DispatchActionGuard } from './guards/dispatch-action.guard';
import { TicketExistsGuard } from './guards/ticket-exists.guard';
import { GetTickets, GetUsers } from './store/ticket-manager.actions';

const routes: Routes = [
    {
        path: '',
        canActivate: [DispatchActionGuard],
        data: {
            guardActions: [new GetUsers(), new GetTickets()]
        },
        children: [
            {
                path: '',
                component: TicketManagerComponent
            },
            {
                path: ':id',
                component: TicketDetailCardComponent,
                canActivate: [TicketExistsGuard]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)]
})
export class TicketManagerRoutingModule {}
