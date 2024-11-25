import { toNano } from '@ton/core';
import { GameAsset } from '../wrappers/GameAsset';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const gameAsset = provider.open(GameAsset.createFromConfig({}, await compile('GameAsset')));

    await gameAsset.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(gameAsset.address);

    // run methods on `gameAsset`
}
