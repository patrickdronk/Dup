export interface IEvent {
  aggregateId: string;
}

export interface DomainEvent {
  eventId: string;
  aggregateId: string;
  aggregateType: string;
  eventSequenceNumber: number;
  payload: string;
  payloadType: string;
  timestamp: string;
}