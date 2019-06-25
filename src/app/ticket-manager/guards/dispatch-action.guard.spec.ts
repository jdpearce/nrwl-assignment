import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { GetTickets } from '../store/ticket-manager.actions';
import { TicketManagerFeatureState } from '../store/ticket-manager.reducer';
import { DispatchActionGuard } from './dispatch-action.guard';

describe('DispatchActionGuard', () => {
    let guard: DispatchActionGuard;
    let store: Store<TicketManagerFeatureState>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DispatchActionGuard],
            imports: [StoreModule.forRoot({})]
        });

        guard = TestBed.get(DispatchActionGuard);
        store = TestBed.get(Store);
    });

    it('should dispatch action from store', () => {
        const route = new ActivatedRouteSnapshot();
        spyOn(store, 'dispatch');
        route.data = { guardActions: [new GetTickets()] };

        const actual = guard.canActivate(route, null);
        expect(store.dispatch).toHaveBeenCalledWith(new GetTickets());
        expect(actual).toBeTruthy();
    });
});
