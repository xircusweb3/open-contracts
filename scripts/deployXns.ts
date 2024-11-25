import { toNano } from '@ton/core';
import { Xns } from '../wrappers/Xns';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const xns = provider.open(Xns.createFromConfig({}, await compile('Xns')));

    await xns.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(xns.address);

    // run methods on `xns`
}
