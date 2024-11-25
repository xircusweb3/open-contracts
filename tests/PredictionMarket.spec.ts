import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { PredictionMarket } from '../wrappers/PredictionMarket';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('PredictionMarket', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('PredictionMarket');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let predictionMarket: SandboxContract<PredictionMarket>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        predictionMarket = blockchain.openContract(PredictionMarket.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await predictionMarket.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: predictionMarket.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and predictionMarket are ready to use
    });
});
