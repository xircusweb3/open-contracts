import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type NftSignerCollectionConfig = {};

export function nftSignerCollectionConfigToCell(config: NftSignerCollectionConfig): Cell {
    return beginCell().endCell();
}

export class NftSignerCollection implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new NftSignerCollection(address);
    }

    static createFromConfig(config: NftSignerCollectionConfig, code: Cell, workchain = 0) {
        const data = nftSignerCollectionConfigToCell(config);
        const init = { code, data };
        return new NftSignerCollection(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
