import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { TicketDetailComponent } from './components/ticket-detail/ticket-detail.component';
import { TicketTableComponent } from './components/ticket-table/ticket-table.component';
import { TicketDetailCardComponent } from './containers/ticket-detail-card/ticket-detail-card.component';
import { TicketManagerComponent } from './containers/ticket-manager/ticket-manager.component';
import { TicketManagerEffects } from './store/ticket-manager.effects';
import { ticketManagerReducer } from './store/ticket-manager.reducer';
import { TicketManagerRoutingModule } from './ticket-manager-routing.module';

@NgModule({
    imports: [
        CommonModule,
        TicketManagerRoutingModule,
        StoreModule.forFeature('ticketManager', ticketManagerReducer),
        EffectsModule.forFeature([TicketManagerEffects]),
        SharedModule
    ],
    declarations: [TicketTableComponent, TicketDetailComponent, TicketManagerComponent, TicketDetailCardComponent]
})
export class TicketManagerModule {}
