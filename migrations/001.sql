CREATE TABLE domain_event (
    eventIdentifier BIGINT NOT NULL,
    aggregateIdentifier VARCHAR(255) NOT NULL,
    eventSequenceNumber BIGINT NOT NULL,
    payload text NOT NULL,
    payload_type VARCHAR(255) NOT NULL,
    timeStamp VARCHAR(255) NOT NULL,
    primary key (eventIdentifier)
);
