let amountToPay = 1

it('submit', async function(){
    const tx = invokeScript({
    dApp: '3N2FjnCq4gcpewsYQVT4scz9MjTgD6a4kQK',
    fee: 500000,
    call: {        
               function: "escrow",
                args:[
                    {type: "string", key: "document", value: "item_F4gWWHyr4B6CMmgLXk4buJP8JhGm1vuKjyPgjoYLexq8"},
                    {type: "string", key: "translator", value: "3MpybuybjHCiVXGWbUyJCPzH1Mm45UvDsxX"},
                    {type: "integer", key: "futureBlocks", value: 1441},
                    
                    ]
}, payment: [{amount: 100,}],})
        await broadcast(tx)
        await waitForTx(tx.id)})
