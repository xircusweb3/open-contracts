import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type JettonPumpConfig = {};

export function jettonPumpConfigToCell(config: JettonPumpConfig): Cell {
    return beginCell().endCell();
}

export class JettonPump implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new JettonPump(address);
    }

    static createFromConfig(config: JettonPumpConfig, code: Cell, workchain = 0) {
        const data = jettonPumpConfigToCell(config);
        const init = { code, data };
        return new JettonPump(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
