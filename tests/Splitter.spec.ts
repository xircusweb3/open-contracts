import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { Splitter } from '../wrappers/Splitter';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('Splitter', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Splitter');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let splitter: SandboxContract<Splitter>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        splitter = blockchain.openContract(Splitter.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await splitter.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: splitter.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and splitter are ready to use
    });
});
