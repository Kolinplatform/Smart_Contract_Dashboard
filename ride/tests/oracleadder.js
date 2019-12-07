//let amountToPay = 1
//let amountToPayAssetId = 'Ft8X1v1LTa1ABafufpaCWyVj8KkaxUWE6xBhW6sNFJck'
it('submit', async function(){
    const tx = invokeScript({
    dApp: '3P8YjrYqMjLqZfVqraRa69R1HKvv5gKmF9P',
    fee: 900000,
    call: {        
               function: "setstatus",
                args:[
                    {type: "string", key: "account", value: "3PGsboZa7nvTMcAhL8jzPtrXGjsgU8yKWeQ"},
                    {type: "string", key: "status", value: "MODERATOR"},
                ]
}, payment: [] },)
        await broadcast(tx)
        await waitForTx(tx.id)})