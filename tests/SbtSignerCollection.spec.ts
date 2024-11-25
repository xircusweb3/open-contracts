import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { SbtSignerCollection } from '../wrappers/SbtSignerCollection';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('SbtSignerCollection', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('SbtSignerCollection');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let sbtSignerCollection: SandboxContract<SbtSignerCollection>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        sbtSignerCollection = blockchain.openContract(SbtSignerCollection.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await sbtSignerCollection.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: sbtSignerCollection.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and sbtSignerCollection are ready to use
    });
});
