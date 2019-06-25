import { Action } from '@ngrx/store';
import { Ticket, User } from '../../models';

export enum TicketManagerActionType {
    GetUsers = '[TicketManagerActionType] GetUsers',
    GetUsersSuccess = '[TicketManagerActionType] GetUsersSuccess',
    GetUsersFailure = '[TicketManagerActionType] GetUsersFailure',

    GetTickets = '[TicketManagerActionType] GetTickets',
    GetTicketsSuccess = '[TicketManagerActionType] GetTicketsSuccess',
    GetTicketsFailure = '[TicketManagerActionType] GetTicketsFailure',

    AssignTicket = '[TicketManagerActionType] AssignTicket',
    TicketAdded = '[TicketManagerActionType] TicketAdded',
    AddTicket = '[TicketManagerActionType] AddTicket'
}

export class GetUsers implements Action {
    readonly type = TicketManagerActionType.GetUsers;
}

export class GetUsersSuccess implements Action {
    readonly type = TicketManagerActionType.GetUsersSuccess;
    constructor(public payload: { users: User[] }) {}
}

export class GetUsersFailure implements Action {
    readonly type = TicketManagerActionType.GetUsersFailure;
    constructor(public payload: { error: any }) {}
}

export class GetTickets implements Action {
    readonly type = TicketManagerActionType.GetTickets;
}

export class GetTicketsSuccess implements Action {
    readonly type = TicketManagerActionType.GetTicketsSuccess;
    constructor(public payload: { tickets: Ticket[] }) {}
}

export class GetTicketsFailure implements Action {
    readonly type = TicketManagerActionType.GetTicketsFailure;
    constructor(public payload: { error: any }) {}
}

export class AssignTicket implements Action {
    readonly type = TicketManagerActionType.AssignTicket;
    constructor(public payload: { ticketId: string; userId: string }) {}
}

export class AddTicket implements Action {
    readonly type = TicketManagerActionType.AddTicket;
    constructor(public payload: { description: string }) {}
}

export class TicketAdded implements Action {
    readonly type = TicketManagerActionType.TicketAdded;
    constructor(public payload: { ticket: Ticket }) {}
}

export type TicketManagerActions =
    | GetUsers
    | GetUsersSuccess
    | GetUsersFailure
    | GetTickets
    | GetTicketsSuccess
    | GetTicketsFailure
    | AddTicket
    | TicketAdded
    | AssignTicket;
