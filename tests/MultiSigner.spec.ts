import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { MultiSigner } from '../wrappers/MultiSigner';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('MultiSigner', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('MultiSigner');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let multiSigner: SandboxContract<MultiSigner>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        multiSigner = blockchain.openContract(MultiSigner.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await multiSigner.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: multiSigner.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and multiSigner are ready to use
    });
});
