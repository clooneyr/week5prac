const escrowSource = `#pragma version 5
txn ApplicationID
int 0
==
bnz main_l6
txn OnCompletion
int NoOp
==
bnz main_l3
err
main_l3:
txna ApplicationArgs 0
byte "transfer"
==
bnz main_l5
err
main_l5:
txn Sender
byte "ADMIN"
app_global_get
==
assert
itxn_begin
int pay
itxn_field TypeEnum
txna ApplicationArgs 1
btoi
itxn_field Amount
txn Sender
itxn_field Receiver
itxn_submit
int 1
return
main_l6:
byte "ADMIN"
txna ApplicationArgs 0
app_global_put
int 1
return
`;

module.exports = escrowSource;