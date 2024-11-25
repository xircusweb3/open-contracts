import { toNano } from '@ton/core';
import { Locker } from '../wrappers/Locker';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const locker = provider.open(Locker.createFromConfig({}, await compile('Locker')));

    await locker.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(locker.address);

    // run methods on `locker`
}
