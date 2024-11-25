import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type MultiSignerConfig = {};

export function multiSignerConfigToCell(config: MultiSignerConfig): Cell {
    return beginCell().endCell();
}

export class MultiSigner implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new MultiSigner(address);
    }

    static createFromConfig(config: MultiSignerConfig, code: Cell, workchain = 0) {
        const data = multiSignerConfigToCell(config);
        const init = { code, data };
        return new MultiSigner(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
