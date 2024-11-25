import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { JettonPump } from '../wrappers/JettonPump';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('JettonPump', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('JettonPump');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let jettonPump: SandboxContract<JettonPump>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        jettonPump = blockchain.openContract(JettonPump.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await jettonPump.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: jettonPump.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and jettonPump are ready to use
    });
});
