import { toNano } from '@ton/core';
import { JettonPump } from '../wrappers/JettonPump';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const jettonPump = provider.open(JettonPump.createFromConfig({}, await compile('JettonPump')));

    await jettonPump.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(jettonPump.address);

    // run methods on `jettonPump`
}
