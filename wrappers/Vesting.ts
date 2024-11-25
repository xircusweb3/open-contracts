import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type VestingConfig = {};

export function vestingConfigToCell(config: VestingConfig): Cell {
    return beginCell().endCell();
}

export class Vesting implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new Vesting(address);
    }

    static createFromConfig(config: VestingConfig, code: Cell, workchain = 0) {
        const data = vestingConfigToCell(config);
        const init = { code, data };
        return new Vesting(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
