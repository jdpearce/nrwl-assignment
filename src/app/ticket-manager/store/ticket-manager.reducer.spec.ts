import { TicketAdded, TicketManagerActionType } from './ticket-manager.actions';
import { initialTicketManagerFeatureState, TicketManagerFeatureState, ticketManagerReducer } from './ticket-manager.reducer';

describe('ticketManagerReducer', () => {
    let state: TicketManagerFeatureState;

    beforeEach(() => {
        state = initialTicketManagerFeatureState;
    });

    it(`should add a ticket to the collection on ${TicketManagerActionType.TicketAdded}`, () => {
        const ticket = {
            id: 1,
            description: 'new ticket',
            assigneeId: null,
            completed: false
        };

        const action = new TicketAdded({
            ticket
        });

        const actual = ticketManagerReducer(state, action);
        expect(actual.tickets.length).toBe(1);
        expect(actual.tickets[0]).toBe(ticket);
        console.log(JSON.stringify(actual.tickets));
    });
});
