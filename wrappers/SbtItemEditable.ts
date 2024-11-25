import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type SbtItemEditableConfig = {};

export function sbtItemEditableConfigToCell(config: SbtItemEditableConfig): Cell {
    return beginCell().endCell();
}

export class SbtItemEditable implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new SbtItemEditable(address);
    }

    static createFromConfig(config: SbtItemEditableConfig, code: Cell, workchain = 0) {
        const data = sbtItemEditableConfigToCell(config);
        const init = { code, data };
        return new SbtItemEditable(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
