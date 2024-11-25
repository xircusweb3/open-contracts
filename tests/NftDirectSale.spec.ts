import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { NftDirectSale } from '../wrappers/NftDirectSale';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('NftDirectSale', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('NftDirectSale');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let nftDirectSale: SandboxContract<NftDirectSale>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        nftDirectSale = blockchain.openContract(NftDirectSale.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await nftDirectSale.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: nftDirectSale.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and nftDirectSale are ready to use
    });
});
