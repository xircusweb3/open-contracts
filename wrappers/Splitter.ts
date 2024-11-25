import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type SplitterConfig = {};

export function splitterConfigToCell(config: SplitterConfig): Cell {
    return beginCell().endCell();
}

export class Splitter implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new Splitter(address);
    }

    static createFromConfig(config: SplitterConfig, code: Cell, workchain = 0) {
        const data = splitterConfigToCell(config);
        const init = { code, data };
        return new Splitter(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
