import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TicketManagerRoutingModule } from './ticket-manager-routing.module';

@NgModule({
    declarations: [],
    imports: [SharedModule, TicketManagerRoutingModule]
})
export class TicketManagerModule {}
