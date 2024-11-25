import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { Xpunks } from '../wrappers/Xpunks';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('Xpunks', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Xpunks');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let xpunks: SandboxContract<Xpunks>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        xpunks = blockchain.openContract(Xpunks.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await xpunks.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: xpunks.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and xpunks are ready to use
    });
});
