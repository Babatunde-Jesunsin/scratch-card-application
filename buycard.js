$(document).ready(function () {
const DATABASE_URI = ' http://localhost:3000/cards';


    $('.submit').click(function(event){
        event.preventDefault()

        const amount = $('.amount').val()
        let numberOfCards = Number(amount)
        const price = $('#price').val()
        const tBody = $('tbody');
        $.get(DATABASE_URI, function(data){
             const boughtCards = []
            for(var i =0; i<data.length; i++){
                const card = data[i]
                if(card.card_price == price){
                    --numberOfCards
                    boughtCards.push(card.id)
                    tBody.append(
                        `<tr id=${card.id}>
                    <th scope="row">${card.id}</th>
                    <td>${card.card_price}</td>
                    <td>${card.pin}</td>
                    <td>${card.valid}</td>
                    </tr>`)
                }
                if(numberOfCards ===0) break
            }

            boughtCards.forEach(function(cardId){
                $.ajax({
                    type: 'DELETE',
                    url: `${DATABASE_URI}/${cardId}`
                })
            })
            
        })

    })
})