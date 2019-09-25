let amountToPay = 1
let amountToPayAssetId = 'Ft8X1v1LTa1ABafufpaCWyVj8KkaxUWE6xBhW6sNFJck'
it('submit', async function(){
    const tx = invokeScript({
    dApp: '3MqTSCR6nhS9VQD2tpFwe6GRXHk3eCim35q',
    fee: 500000,
    call: {        
               function: "submitTranslation",
                args:[
                    {type: "string", key: "item", value: "GiEBRfGhEeGqhPmCjwJcYuakyvaz2GHGCfCzuinSKD"},
                    {type: "string", key: "data", value: "best item ever"},
                    {type: "string", key: "assetID", value: amountToPayAssetId},
                    {type: "integer", key: "futureBlocks", value: "1441"},
                    {type: "integer", key: "wordCount" , value: "10"},
                    {type: "integer", key: "typeOfWork", value: "0.1"},
                    {type: "integer", key: "priceAssetId", value: amountToPay},
                    ]
}, payment: [{assetId: amountToPayAssetId, amount: amountToPay}],})
        await broadcast(tx)
        await waitForTx(tx.id)})

        //item: String, data: String, assetID: String, futureBlocks: Int, wordCount: Int, typeOfWork: Int, priceAssetID: Int