export interface IEvent {
    aggregateId: string
}

export interface DomainEvent {
    eventIdentifier: string,
    aggregateIdentifier: string
    aggregateType: string
    eventSequenceNumber: number
    payload: string
    payloadType: string
    timestamp: string
}