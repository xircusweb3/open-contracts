import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type XnsConfig = {};

export function xnsConfigToCell(config: XnsConfig): Cell {
    return beginCell().endCell();
}

export class Xns implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new Xns(address);
    }

    static createFromConfig(config: XnsConfig, code: Cell, workchain = 0) {
        const data = xnsConfigToCell(config);
        const init = { code, data };
        return new Xns(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
