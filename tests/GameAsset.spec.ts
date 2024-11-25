import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { GameAsset } from '../wrappers/GameAsset';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('GameAsset', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('GameAsset');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let gameAsset: SandboxContract<GameAsset>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        gameAsset = blockchain.openContract(GameAsset.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await gameAsset.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: gameAsset.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and gameAsset are ready to use
    });
});
