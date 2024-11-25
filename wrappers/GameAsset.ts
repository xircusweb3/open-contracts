import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type GameAssetConfig = {};

export function gameAssetConfigToCell(config: GameAssetConfig): Cell {
    return beginCell().endCell();
}

export class GameAsset implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new GameAsset(address);
    }

    static createFromConfig(config: GameAssetConfig, code: Cell, workchain = 0) {
        const data = gameAssetConfigToCell(config);
        const init = { code, data };
        return new GameAsset(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
