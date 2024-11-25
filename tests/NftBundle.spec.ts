import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { NftBundle } from '../wrappers/NftBundle';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('NftBundle', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('NftBundle');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let nftBundle: SandboxContract<NftBundle>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        nftBundle = blockchain.openContract(NftBundle.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await nftBundle.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: nftBundle.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and nftBundle are ready to use
    });
});
