import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type XskinsConfig = {};

export function xskinsConfigToCell(config: XskinsConfig): Cell {
    return beginCell().endCell();
}

export class Xskins implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new Xskins(address);
    }

    static createFromConfig(config: XskinsConfig, code: Cell, workchain = 0) {
        const data = xskinsConfigToCell(config);
        const init = { code, data };
        return new Xskins(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
