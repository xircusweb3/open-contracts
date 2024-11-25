import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { Locker } from '../wrappers/Locker';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('Locker', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Locker');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let locker: SandboxContract<Locker>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        locker = blockchain.openContract(Locker.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await locker.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: locker.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and locker are ready to use
    });
});
