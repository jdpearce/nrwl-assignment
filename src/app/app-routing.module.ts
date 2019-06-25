import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/components/home.component';

const routes: Routes = [
    { path: 'ticket-manager', loadChildren: './ticket-manager/ticket-manager.module#TicketManagerModule' },
    { path: '', component: HomeComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
