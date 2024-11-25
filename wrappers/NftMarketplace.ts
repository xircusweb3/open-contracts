import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type NftMarketplaceConfig = {};

export function nftMarketplaceConfigToCell(config: NftMarketplaceConfig): Cell {
    return beginCell().endCell();
}

export class NftMarketplace implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new NftMarketplace(address);
    }

    static createFromConfig(config: NftMarketplaceConfig, code: Cell, workchain = 0) {
        const data = nftMarketplaceConfigToCell(config);
        const init = { code, data };
        return new NftMarketplace(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
