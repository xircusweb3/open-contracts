import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type XpunksConfig = {};

export function xpunksConfigToCell(config: XpunksConfig): Cell {
    return beginCell().endCell();
}

export class Xpunks implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new Xpunks(address);
    }

    static createFromConfig(config: XpunksConfig, code: Cell, workchain = 0) {
        const data = xpunksConfigToCell(config);
        const init = { code, data };
        return new Xpunks(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
