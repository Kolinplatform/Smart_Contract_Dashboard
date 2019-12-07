const tx = require('@waves/waves-transactions');
const crypto = require('@waves/ts-lib-crypto');

const RANDOM_SEED_LENGTH = 15;
const TX_TIMEOUT = 120000;
const NODE_URLS = {
    'W': 'https://nodes.wavesnodes.com',
    'T': 'https://nodes-testnet.wavesnodes.com'
};
const DEPLOYMENT_PRICE = 0.011;
const CONTRACT_BASE64 = 'AwQAAAAIYnV5ZXJQdWIJAQAAAAdleHRyYWN0AAAAAQkABB0AAAACBQAAAAR0aGlzAgAAAAVidXllcgQAAAAJc2VsbGVyUHViCQEAAAAHZXh0cmFjdAAAAAEJAAQdAAAAAgUAAAAEdGhpcwIAAAAGc2VsbGVyBAAAABB2ZXJpZmljYXRpb25IYXNoCQEAAAAHZXh0cmFjdAAAAAEJAAQcAAAAAgUAAAAEdGhpcwIAAAAQdmVyaWZpY2F0aW9uSGFzaAQAAAANYmxvY2tVbmxvY2tlZAkBAAAAB2V4dHJhY3QAAAABCQAEGgAAAAIFAAAABHRoaXMCAAAADWJsb2NrVW5sb2NrZWQEAAAAByRtYXRjaDAFAAAAAnR4AwkAAAEAAAACBQAAAAckbWF0Y2gwAgAAABNUcmFuc2ZlclRyYW5zYWN0aW9uBAAAAAF0BQAAAAckbWF0Y2gwAwkAAfQAAAADCAUAAAABdAAAAAlib2R5Qnl0ZXMJAAGRAAAAAggFAAAAAXQAAAAGcHJvb2ZzAAAAAAAAAAAACQACWQAAAAEFAAAACGJ1eWVyUHViBgMJAAH0AAAAAwgFAAAAAnR4AAAACWJvZHlCeXRlcwkAAZEAAAACCAUAAAACdHgAAAAGcHJvb2ZzAAAAAAAAAAAACQACWQAAAAEFAAAACXNlbGxlclB1YgMJAABmAAAAAggFAAAACWxhc3RCbG9jawAAAAZoZWlnaHQFAAAADWJsb2NrVW5sb2NrZWQGCQAAAAAAAAIJAAH1AAAAAQgFAAAAAXQAAAAKYXR0YWNobWVudAUAAAAQdmVyaWZpY2F0aW9uSGFzaAcHsd5/GQ==';

export default class BlockchainConnector {

    constructor(keeperApi) {
        this.keeperApi = keeperApi;
        this.updateCallbacks = [];
        keeperApi.publicState().then(state => {
            this.chainId = state.network.code;
            this.nodeUrl = NODE_URLS[this.chainId];
            this.state = state;

            this.updateCallbacks.forEach(callback => callback(state))
        });
        keeperApi.on("update", state => {
            this.chainId = state.network.code;
            this.nodeUrl = NODE_URLS[this.chainId];
            this.state = state;

            this.updateCallbacks.forEach(callback => callback(state))
        })
    }

    genEscrow() {
        let seed = crypto.randomSeed(15);
        let keys = crypto.keyPair(seed);

        let contractAccount = {
            address: crypto.address(seed, this.chainId),
            pubKey: keys.publicKey,
            privKey: keys.privateKey
        };

        let verificationString = crypto.base58Encode(crypto.keccak(contractAccount.privKey));
        return tx.nodeInteraction.currentHeight(this.nodeUrl)
            .then(blockNumber => {
                return {
                    seed: seed,
                    address: contractAccount.address,
                    pubkey: contractAccount.pubKey,
                    privkey: contractAccount.privKey,
                    blockUnlocked: blockNumber + 1000,
                    verificationString: verificationString,
                }
            })
            .catch(console.log);
    }

    getAddress(pubKey) {
        return crypto.address({publicKey: pubKey}, this.chainId)
    }

    getCurrentBlock() {
        return tx.nodeInteraction.currentHeight(this.nodeUrl)
            .catch(console.log);
    }

    fundDeployment(address) {
        return this.keeperApi.signAndPublishTransaction({
            type: 4,
            data: {
                amount: { tokens: DEPLOYMENT_PRICE, assetId: "WAVES" },
                fee: { tokens: "0.001", assetId: "WAVES"},
                recipient: address
            }
        })
            .then(resp => {
                //throw "test";
                return tx.waitForTx(JSON.parse(resp)['id'], {timeout: TX_TIMEOUT, apiBase: this.nodeUrl})
            })
    }

    setEscrowData(seed, buyer, seller, contractPubkey, verificationHash, blockUnlocked) {

        const setDataTx = tx.data(
            {
                data: [
                    { key: 'buyer', value: buyer},
                    { key: 'seller', value: seller},
                    { key: 'contractPubkey', value: contractPubkey},
                    { key: 'verificationHash', value: verificationHash },
                    { key: 'blockUnlocked', value: blockUnlocked },
                ],
                timestamp: Date.now(),
                chainId: this.chainId
            },
            seed
        );

        return tx.broadcast(setDataTx, this.nodeUrl)
            .then(resp => {
                return tx.waitForTx(resp['id'], {timeout: TX_TIMEOUT, apiBase: this.nodeUrl})
            })
            .catch(e => console.log(e))
    }

    setEscrowScript(seed) {
        const setScriptTx = tx.setScript(
            {
                script: CONTRACT_BASE64,
                timestamp: Date.now(),
                chainId: this.chainId
            },
            seed
        );

        let address = crypto.address(seed, this.chainId)

        return this.fetchContractData(address).then(data => {
                if (data.address == undefined) {
                    throw "data didn't set"
                } else {
                    return tx.broadcast(setScriptTx, this.nodeUrl)
                }
            }
        ).then(resp => {
                return tx.waitForTx(resp['id'], {timeout: TX_TIMEOUT, apiBase: this.nodeUrl})
        })
    }

    fundContract(address, amount) {
        return this.keeperApi.signAndPublishTransaction({
            type: 4,
            data: {
                amount: { tokens: amount, assetId: "WAVES" },
                fee: { tokens: "0.001", assetId: "WAVES"},
                recipient: address
            }
        })
            .then(resp => {
                return tx.waitForTx(JSON.parse(resp)['id'], {timeout: TX_TIMEOUT, apiBase: this.nodeUrl})
            })
            .catch()
    }

    withdrawFundsExpired(address, contractPubkey, contractSum) {
        return this.keeperApi.signAndPublishTransaction({
            type: 4,
            data: {
                amount: { tokens: contractSum - 0.005, assetId: "WAVES" },
                fee: { tokens: 0.005, assetId: "WAVES"},
                recipient: address,
                senderPublicKey: contractPubkey
            }
        })
            .then(resp => {
                return tx.waitForTx(JSON.parse(resp)['id'], {timeout: TX_TIMEOUT, apiBase: this.nodeUrl})
            })

    }

    withdrawFunds(address, contractPubkey, verificationKey, contractSum) {

        return this.keeperApi.signAndPublishTransaction({
            type: 4,
            data: {
                amount: { tokens: contractSum - 0.005, assetId: "WAVES" },
                fee: { tokens: 0.005, assetId: "WAVES"},
                recipient: address,
                attachment: verificationKey,
                senderPublicKey: contractPubkey
            }
        })
            .then(resp => {
                return tx.waitForTx(JSON.parse(resp)['id'], {timeout: TX_TIMEOUT, apiBase: this.nodeUrl})
            })



    }

    fetchContractData(address) {

        let contractData = {
            address: address
        };


        return tx.nodeInteraction.accountData(address, this.nodeUrl).then(data => {
            try {
                contractData.buyerPubkey = data.buyer.value;
                contractData.sellerPubkey = data.seller.value;
                contractData.blockUnlocked = data.blockUnlocked.value;
                contractData.verificationHash = data.verificationHash.value.replace('base64:', '');
                contractData.contractPubkey = data.contractPubkey.value;
                contractData.buyerAddress = crypto.address({publicKey: contractData.buyerPubkey}, this.chainId);
                contractData.sellerAddress = crypto.address({publicKey: contractData.sellerPubkey}, this.chainId);
            } catch {
                throw "no data found"
            }

            return tx.nodeInteraction.balance(address, this.nodeUrl)
        }).then(balance => {
            contractData.sum = balance / 10**8;
            return contractData
        })
    }

    fetchContractStatus(address, blockUnlocked, currentStatus) {
        if (currentStatus == "Spent") {
            return new Promise((resolve, reject) => resolve(currentStatus))
        } else {
            return tx.nodeInteraction.balance(address, this.nodeUrl).then(balance => {

                if (balance == 0) {
                    return "Spent";
                } else if (currentStatus == "Expired") {
                    return currentStatus
                }
                else {
                    return tx.nodeInteraction.currentHeight(this.nodeUrl);
                }

            }).then(res => {
                    if (res == "Expired" || res == "Spent") {
                        return res
                    }
                    else if (res > blockUnlocked) {
                        return "Expired";
                    }
                    else {
                        return "Open";
                    }

                }
            )
        }
    }

    getExplorerURL() {
        if (this.chainId == 'T') {
            return "https://wavesexplorer.com/testnet/";
        } else {
            return "https://wavesexplorer.com/";
        }
    }

    onUpdate(callback) {
        this.updateCallbacks.push(callback);
    }

    getKeeperState() {
        return this.state;
    }
}
