import { toNano } from '@ton/core';
import { Xpunks } from '../wrappers/Xpunks';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const xpunks = provider.open(Xpunks.createFromConfig({}, await compile('Xpunks')));

    await xpunks.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(xpunks.address);

    // run methods on `xpunks`
}
