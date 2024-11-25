import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type NftDirectSaleConfig = {};

export function nftDirectSaleConfigToCell(config: NftDirectSaleConfig): Cell {
    return beginCell().endCell();
}

export class NftDirectSale implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new NftDirectSale(address);
    }

    static createFromConfig(config: NftDirectSaleConfig, code: Cell, workchain = 0) {
        const data = nftDirectSaleConfigToCell(config);
        const init = { code, data };
        return new NftDirectSale(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
