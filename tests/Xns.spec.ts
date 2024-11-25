import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { Xns } from '../wrappers/Xns';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('Xns', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Xns');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let xns: SandboxContract<Xns>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        xns = blockchain.openContract(Xns.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await xns.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: xns.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and xns are ready to use
    });
});
