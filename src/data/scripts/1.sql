alter table "Deposits" rename to "FinnancialAccounts";

alter table "FinnancialAccounts" add column balance double precision;
alter table "FinnancialAccounts" add column lastBalanceUpdate timestamp null;

alter table "Launches" rename to "Bills";

alter table "Bills" drop column "deposit".
alter table "Bills" add column "closedAt" timestamp null;
alter table "Bills" add column "totalMissing" double precision not null;
alter table "Bills" rename column "value" to "totalValue";
alter table "Bills" alter column "totalValue" TYPE double precision;

ALTER TABLE public."Bills"
    ALTER COLUMN "createdAt" SET DEFAULT now();