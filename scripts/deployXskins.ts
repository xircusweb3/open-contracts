import { toNano } from '@ton/core';
import { Xskins } from '../wrappers/Xskins';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const xskins = provider.open(Xskins.createFromConfig({}, await compile('Xskins')));

    await xskins.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(xskins.address);

    // run methods on `xskins`
}
