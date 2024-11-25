import { toNano } from '@ton/core';
import { SbtSignerCollection } from '../wrappers/SbtSignerCollection';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const sbtSignerCollection = provider.open(SbtSignerCollection.createFromConfig({}, await compile('SbtSignerCollection')));

    await sbtSignerCollection.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(sbtSignerCollection.address);

    // run methods on `sbtSignerCollection`
}
