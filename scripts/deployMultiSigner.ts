import { toNano } from '@ton/core';
import { MultiSigner } from '../wrappers/MultiSigner';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const multiSigner = provider.open(MultiSigner.createFromConfig({}, await compile('MultiSigner')));

    await multiSigner.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(multiSigner.address);

    // run methods on `multiSigner`
}
