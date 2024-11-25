import { toNano } from '@ton/core';
import { NftSignerCollection } from '../wrappers/NftSignerCollection';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const nftSignerCollection = provider.open(NftSignerCollection.createFromConfig({}, await compile('NftSignerCollection')));

    await nftSignerCollection.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(nftSignerCollection.address);

    // run methods on `nftSignerCollection`
}
