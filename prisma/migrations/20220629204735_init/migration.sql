-- CreateTable
CREATE TABLE "domain_event" (
    "eventidentifier" TEXT NOT NULL,
    "aggregateidentifier" TEXT NOT NULL,
    "aggregate_type" TEXT NOT NULL,
    "eventsequencenumber" INTEGER NOT NULL,
    "payload" TEXT NOT NULL,
    "payload_type" TEXT NOT NULL,
    "timestamp" TEXT NOT NULL,

    CONSTRAINT "domain_event_pkey" PRIMARY KEY ("eventidentifier")
);
