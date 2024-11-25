import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type LockerConfig = {};

export function lockerConfigToCell(config: LockerConfig): Cell {
    return beginCell().endCell();
}

export class Locker implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new Locker(address);
    }

    static createFromConfig(config: LockerConfig, code: Cell, workchain = 0) {
        const data = lockerConfigToCell(config);
        const init = { code, data };
        return new Locker(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
