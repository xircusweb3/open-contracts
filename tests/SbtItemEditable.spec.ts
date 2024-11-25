import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { SbtItemEditable } from '../wrappers/SbtItemEditable';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('SbtItemEditable', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('SbtItemEditable');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let sbtItemEditable: SandboxContract<SbtItemEditable>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        sbtItemEditable = blockchain.openContract(SbtItemEditable.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await sbtItemEditable.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: sbtItemEditable.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and sbtItemEditable are ready to use
    });
});
