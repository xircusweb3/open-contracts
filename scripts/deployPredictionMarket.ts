import { toNano } from '@ton/core';
import { PredictionMarket } from '../wrappers/PredictionMarket';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const predictionMarket = provider.open(PredictionMarket.createFromConfig({}, await compile('PredictionMarket')));

    await predictionMarket.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(predictionMarket.address);

    // run methods on `predictionMarket`
}
