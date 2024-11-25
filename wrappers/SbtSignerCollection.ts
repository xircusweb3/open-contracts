import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type SbtSignerCollectionConfig = {};

export function sbtSignerCollectionConfigToCell(config: SbtSignerCollectionConfig): Cell {
    return beginCell().endCell();
}

export class SbtSignerCollection implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new SbtSignerCollection(address);
    }

    static createFromConfig(config: SbtSignerCollectionConfig, code: Cell, workchain = 0) {
        const data = sbtSignerCollectionConfigToCell(config);
        const init = { code, data };
        return new SbtSignerCollection(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
