import { toNano } from '@ton/core';
import { Splitter } from '../wrappers/Splitter';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const splitter = provider.open(Splitter.createFromConfig({}, await compile('Splitter')));

    await splitter.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(splitter.address);

    // run methods on `splitter`
}
