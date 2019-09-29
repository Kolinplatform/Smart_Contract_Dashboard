let amountToPay = 1

let datajson = {
    "Name": "message.cp36-win32.pyd",
"Type": "n/a",
"Modified": "Sat Nov 11 2000 11:11:10 GMT+0000 (Greenwich Mean Time)",
"Bytes": 1193472,
"Words": 32980,
"Characters": 1165721,
"Lines": 2783,
"Hash256": "0a87b38549ebbcada29f1a659d4d0945c59f3477acd3119ec9c873d640ecff70",
"Hash512": "a3577e5e9e84f88064916b6536d3d39cf2c06c62ed57690191a0b50a69a77e583f173e9602633c5740200e540ed013ff49aaf6b7c4f0de9e4fe24597f6c5019f",
}

it('submit', async function(){
    const tx = invokeScript({
    dApp: '3N2FjnCq4gcpewsYQVT4scz9MjTgD6a4kQK',
    fee: 900000,
    call: {        
               function: "submitTranslation",
                args:[
                    {type: "string", key: "document", value: "translation31.docx"},
                    {type: "string", key: "data", value: datajson},
                    {type: "string", key: "assetID", value: ""},
                    {type: "integer", key: "futureBlocks", value: 1441},
                    {type: "integer", key: "wordCount" , value: 10},
                    {type: "integer", key: "typeOfWork", value: 0.1},
                    {type: "integer", key: "priceAssetId", value: amountToPay},
                    ]
}, payment: [{amount: 1000000,}],})
        await broadcast(tx)
        await waitForTx(tx.id)})

        //item: String, data: String, assetID: String, futureBlocks: Int, wordCount: Int, typeOfWork: Int, priceAssetID: Int