import { Action, createReducer, on } from '@ngrx/store';
import { Ticket, User } from '../../models';
import { LoadingStatus } from '../../models/loading-status';
import * as TicketManagerActions from './ticket-manager.actions';

export interface TicketManagerFeatureState {
    tickets: Ticket[];
    ticketsLoadingStatus: LoadingStatus;
    ticketsLoadingError: any;
    users: User[];
    usersLoadingStatus: LoadingStatus;
    usersLoadingError: any;
}

export const initialTicketManagerFeatureState: TicketManagerFeatureState = {
    tickets: [],
    ticketsLoadingStatus: LoadingStatus.NotLoaded,
    ticketsLoadingError: null,
    users: [],
    usersLoadingStatus: LoadingStatus.NotLoaded,
    usersLoadingError: null
};

const reducer = createReducer(
    initialTicketManagerFeatureState,
    on(TicketManagerActions.ticketAdded, (state, action) => ({
        ...state,
        tickets: [...state.tickets, action.ticket]
    })),
    on(TicketManagerActions.getUsers, state => ({
        ...state,
        usersLoadingStatus: LoadingStatus.Loading
    })),
    on(TicketManagerActions.getUsersSuccess, (state, action) => ({
        ...state,
        users: [...action.users],
        usersLoadingStatus: LoadingStatus.Loaded
    })),
    on(TicketManagerActions.getTickets, state => ({
        ...state,
        ticketsLoadingStatus: LoadingStatus.Loading
    })),
    on(TicketManagerActions.getTicketsSuccess, (state, action) => ({
        ...state,
        tickets: [...action.tickets],
        ticketsLoadingStatus: LoadingStatus.Loaded
    })),
    on(TicketManagerActions.getTicketsFailure, (state, action) => ({
        ...state,
        ticketsLoadingError: action.error,
        ticketsLoadingStatus: LoadingStatus.FailedToLoad
    })),
    on(TicketManagerActions.ticketAdded, (state, action) => ({
        ...state,
        tickets: [...state.tickets, action.ticket]
    })),
    on(TicketManagerActions.ticketAssigned, (state, action) => {
        let newTickets = [...state.tickets];

        const toUpdate = newTickets.findIndex(x => x.id === action.ticket.id);
        newTickets[toUpdate] = action.ticket;

        return { ...state, tickets: newTickets };
    })
);

export function ticketManagerReducer(state: TicketManagerFeatureState | undefined, action: Action): TicketManagerFeatureState {
    return reducer(state, action);
}
