import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type SbtSingleConfig = {};

export function sbtSingleConfigToCell(config: SbtSingleConfig): Cell {
    return beginCell().endCell();
}

export class SbtSingle implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new SbtSingle(address);
    }

    static createFromConfig(config: SbtSingleConfig, code: Cell, workchain = 0) {
        const data = sbtSingleConfigToCell(config);
        const init = { code, data };
        return new SbtSingle(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
