import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store, StoreModule } from '@ngrx/store';
import { cold } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { BackendService } from '../../core/backend.service';
import { getUsers, getUsersSuccess } from './ticket-manager.actions';
import { TicketManagerEffects } from './ticket-manager.effects';
import { TicketManagerFeatureState, ticketManagerReducer } from './ticket-manager.reducer';

describe('Ticket Manager Effects', () => {
    let effects: TicketManagerEffects;
    let actions: Observable<any>;
    let store: Store<TicketManagerFeatureState>;
    let service: BackendService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({
                    ticketManager: ticketManagerReducer
                })
            ],
            providers: [provideMockActions(() => actions)]
        });

        effects = TestBed.get(TicketManagerEffects);
        store = TestBed.get(Store);
        service = TestBed.get(BackendService);
    });

    describe('getUsers$', () => {
        it('should emit a GetUsersSuccess action when the API returns', () => {
            const action = getUsers();
            const source = cold('a', { a: action });
            actions = source;

            const users = [
                {
                    id: 0,
                    name: 'Bob Bobson'
                },
                {
                    id: 1,
                    name: 'Jeff Jeffson'
                }
            ];

            spyOn(service, 'users').and.returnValue(of(users));

            const expected = cold('a', {
                a: getUsersSuccess({
                    users
                })
            });
            expect(effects.getUsers$).toBeObservable(expected);
        });
    });
});
