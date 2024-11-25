import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { Xskins } from '../wrappers/Xskins';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('Xskins', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Xskins');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let xskins: SandboxContract<Xskins>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        xskins = blockchain.openContract(Xskins.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await xskins.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: xskins.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and xskins are ready to use
    });
});
