import { Ticket, User } from '../../models';
import { LoadingStatus } from '../../models/loading-status';
import { TicketManagerActions, TicketManagerActionType } from './ticket-manager.actions';

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

export function ticketManagerReducer(
    state: TicketManagerFeatureState = initialTicketManagerFeatureState,
    action: TicketManagerActions
): TicketManagerFeatureState {
    switch (action.type) {
        case TicketManagerActionType.GetUsers: {
            return {
                ...state,
                usersLoadingStatus: LoadingStatus.Loading
            };
        }
        case TicketManagerActionType.GetUsersSuccess: {
            return {
                ...state,
                users: [...action.payload.users],
                usersLoadingStatus: LoadingStatus.Loaded
            };
        }
        case TicketManagerActionType.GetUsersFailure: {
            return {
                ...state,
                usersLoadingError: action.payload.error,
                usersLoadingStatus: LoadingStatus.FailedToLoad
            };
        }

        case TicketManagerActionType.GetTickets: {
            return {
                ...state,
                ticketsLoadingStatus: LoadingStatus.Loading
            };
        }
        case TicketManagerActionType.GetTicketsSuccess: {
            return {
                ...state,
                tickets: [...action.payload.tickets],
                ticketsLoadingStatus: LoadingStatus.Loaded
            };
        }
        case TicketManagerActionType.GetTicketsFailure: {
            return {
                ...state,
                ticketsLoadingError: action.payload.error,
                ticketsLoadingStatus: LoadingStatus.FailedToLoad
            };
        }

        case TicketManagerActionType.TicketAdded: {
            return {
                ...state,
                tickets: [...state.tickets, action.payload.ticket]
            };
        }

        default:
            return state;
    }
}
