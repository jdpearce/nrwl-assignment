import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TicketManagerFeatureState } from './ticket-manager.reducer';

export const getTicketManagerFeatureState = createFeatureSelector<TicketManagerFeatureState>('ticketManager');

export const getTickets = createSelector(
    getTicketManagerFeatureState,
    state => state.tickets
);

export const getUsers = createSelector(
    getTicketManagerFeatureState,
    state => state.users
);

export const getTicketsLoadingStatus = createSelector(
    getTicketManagerFeatureState,
    state => state.ticketsLoadingStatus
);

export const getUsersLoadingStatus = createSelector(
    getTicketManagerFeatureState,
    state => state.usersLoadingStatus
);
