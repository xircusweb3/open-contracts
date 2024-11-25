import { toNano } from '@ton/core';
import { NftBundle } from '../wrappers/NftBundle';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const nftBundle = provider.open(NftBundle.createFromConfig({}, await compile('NftBundle')));

    await nftBundle.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(nftBundle.address);

    // run methods on `nftBundle`
}
