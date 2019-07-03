import { createAction, props } from '@ngrx/store';
import { Ticket, User } from '../../models';

export const getUsers = createAction('[TicketManagerActionType] GetUsers');
export const getUsersSuccess = createAction('[TicketManagerActionType] GetUsersSuccess', props<{ users: User[] }>());
export const getUsersFailure = createAction('[TicketManagerActionType] GetUsersFailure', props<{ error: any }>());

export const getTickets = createAction('[TicketManagerActionType] GetTickets');
export const getTicketsSuccess = createAction('[TicketManagerActionType] GetTicketsSuccess', props<{ tickets: Ticket[] }>());
export const getTicketsFailure = createAction('[TicketManagerActionType] GetTicketsFailure', props<{ error: any }>());

export const assignTicket = createAction('[TicketManagerActionType] AssignTicket', props<{ ticketId: number; userId: number }>());
export const addTicket = createAction('[TicketManagerActionType] AddTicket', props<{ description: string }>());
export const ticketAdded = createAction('[TicketManagerActionType] TicketAdded', props<{ ticket: Ticket }>());
export const ticketAssigned = createAction('[TicketManagerActionType] TicketAssigned', props<{ ticket: Ticket }>());
