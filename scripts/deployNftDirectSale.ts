import { toNano } from '@ton/core';
import { NftDirectSale } from '../wrappers/NftDirectSale';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const nftDirectSale = provider.open(NftDirectSale.createFromConfig({}, await compile('NftDirectSale')));

    await nftDirectSale.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(nftDirectSale.address);

    // run methods on `nftDirectSale`
}
