CREATE TABLE events (
    event_identifier VARCHAR(255) NOT NULL,
    aggregate_identifier VARCHAR(255) NOT NULL,
    event_sequence_number BIGINT NOT NULL,
    payload text NOT NULL,
    payload_type VARCHAR(255) NOT NULL,
    timestamp VARCHAR(255) NOT NULL,
    primary key (event_identifier)
);
