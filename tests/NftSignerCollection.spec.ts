import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { NftSignerCollection } from '../wrappers/NftSignerCollection';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('NftSignerCollection', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('NftSignerCollection');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let nftSignerCollection: SandboxContract<NftSignerCollection>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        nftSignerCollection = blockchain.openContract(NftSignerCollection.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await nftSignerCollection.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: nftSignerCollection.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and nftSignerCollection are ready to use
    });
});
