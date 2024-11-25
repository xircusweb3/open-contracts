import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type PredictionMarketConfig = {};

export function predictionMarketConfigToCell(config: PredictionMarketConfig): Cell {
    return beginCell().endCell();
}

export class PredictionMarket implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new PredictionMarket(address);
    }

    static createFromConfig(config: PredictionMarketConfig, code: Cell, workchain = 0) {
        const data = predictionMarketConfigToCell(config);
        const init = { code, data };
        return new PredictionMarket(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
