import { toNano } from '@ton/core';
import { SbtItemEditable } from '../wrappers/SbtItemEditable';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const sbtItemEditable = provider.open(SbtItemEditable.createFromConfig({}, await compile('SbtItemEditable')));

    await sbtItemEditable.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(sbtItemEditable.address);

    // run methods on `sbtItemEditable`
}
