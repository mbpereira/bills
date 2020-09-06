alter table "Deposits" rename to "FinnancialAccounts"

alter table "FinnancialAccounts" add column balance double
alter table "FinnancialAccounts" add column lastBalanceUpdate timestamp null