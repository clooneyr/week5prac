from pyteal import *

def escrow():


    on_call_method = Txn.application_args[0]
    contract_interface = Cond(
        [on_call_method == Bytes("transfer"), transfer], 
    )

    program_calls = Cond ( 
        [Txn.application_id() == Int(0), contract_deployment],
        [Txn.on_completion() == OnComplete.NoOp, contract_interface],
    )

    return program_calls

if __name__ == "__main__":
    with open("escrowSSC.teal", "w") as f:
        compiled = compileTeal(escrow(), mode=Mode.Application, version=5)
        f.write(compiled)