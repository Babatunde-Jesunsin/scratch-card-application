const DATABASE_URI = ' http://localhost:3000/cards';

$(document).ready(function(){
var $data1 = $('tbody');
function fetchdata(){
    $.get(DATABASE_URI, (data)=>
        $.each(data,function(item){
            $data1.append(
               `<tr>
                <th scope="row">${item.id}</th>
                <td>${item.card_price}</td>
                <td>${item.pin}</td>
                <td>${item.valid}</td>
                <td> <button style = "background:yellow"> Update</button></td>
                <td> <button style = "background:red"> Delete</button></td>
              </tr>`

            )
        })
    })
}

fetchdata()















});



















// const form = document.querySelector('.form');
// const number = document.querySelector(".num");
// const generatorBtn = document.querySelector("#generator");

// let randonCards;

// const getCards = async () => {
//     const response = await fetch(DATABASE_URI);
//     const cards = await response.json();
    
//     populateCards(cards);
  
    // get button actions from page and register event listeners
   //const editContacts = document.querySelectorAll('#edit');
  
    //const deleteContacts = document.querySelectorAll('#delete');
  
    // register button actions
    //editContacts.forEach(button =>

//     var name ;
// }