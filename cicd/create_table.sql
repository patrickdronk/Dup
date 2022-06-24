
create table domain_event (
    eventIdentifier bigint not null,
    aggregateIdentifier varchar(255) not null,
    eventSequenceNumber bigint not null,
    payload text not null,
    payload_type varchar(255) not null,
    timeStamp varchar(255) not null,
    primary key (eventIdentifier)
);
