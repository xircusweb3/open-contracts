import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type NftBundleConfig = {};

export function nftBundleConfigToCell(config: NftBundleConfig): Cell {
    return beginCell().endCell();
}

export class NftBundle implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new NftBundle(address);
    }

    static createFromConfig(config: NftBundleConfig, code: Cell, workchain = 0) {
        const data = nftBundleConfigToCell(config);
        const init = { code, data };
        return new NftBundle(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
