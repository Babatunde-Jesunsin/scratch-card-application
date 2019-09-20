const DATABASE_URI = ' http://localhost:3000/cards';

$(document).ready(function () {
    const tableBody = $('tbody');
    function fetchdata() {
        $.get(DATABASE_URI, (data) => {

            $.each(data, function (i, item) {
                tableBody.append(
                    `<tr id=${item.id}>
                <th scope="row">${item.id}</th>
                <td>${item.card_price}</td>
                <td>${item.pin}</td>
                <td>${item.valid}</td>
                <td> <button style = "background:yellow" class='trigger' onclick="fix(${item.id},${item.card_price},${item.pin},'${item.valid}')">Update</button></td>
                <td> <button style = "background:red" class='delete' data-deleteid=${item.id}> Delete</button></td>

	
              </tr>`

                )
            })


            var modal = document.querySelector(".modale");
           
            var trigger = document.querySelector(".trigger");
            var closeButton = document.querySelector(".close-button");
            

            function fix(id,card_price,pin,valid){
                
$                ('#id').val(id);
                $('#card_price').val(card_price);
                $('#pin').val(pin);
                $('#valid').val(valid);
            }
            function toggleModal() {
                modal.classList.toggle("show-modal");
                $('.modale').show();
            }
            function windowOnClick(event) {
                if (event.target === modal) {
                    toggleModal();
                }
            }

            
            trigger.addEventListener("click", toggleModal);
            closeButton.addEventListener("click", toggleModal);
            window.addEventListener("click", windowOnClick);


            const deleteButtons = $('.delete');
            deleteButtons.on('click', function (event) {
                const deleteID = event.currentTarget.dataset.deleteid
                console.log(`${DATABASE_URI}/${deleteID}`);


                $.ajax({
                    type: 'DELETE',
                    url: `${DATABASE_URI}/${deleteID}`,
                    success: function () {
                        $(`#${deleteID}`).remove()
                    }
                })
            })
            
            $('#modaleupdate').on('submit', function (e) {
                
                e.preventDefault();
            
                let id=$('#id').val();
               let card_price= $('#card_price').val();
               let pin= $('#pin').val();
                let valid=$('#valid').val();
                data={pin,card_price,valid};
                
                $.ajax({
                    type: 'PUT',
                    url: `${DATABASE_URI}/${id}`,
                    data:data,
                    success: function () {
                        fetchdata();
                        
                    }
                })
            })

        })
    }

    fetchdata()

    $('#generator').on('click', function (e) {

        const cardprice = $('#price').val();
        const number = $('#num').val();
        const codepin = [];
        for (var i = 0; i < number; i++) {
            codepin.push(Math.floor(Math.random() * (9999999999999 - 99999999999 + 1)) + 99999999999);


        }

        for (var i = 0; i < codepin.length; i++) {
            var data = {
                "pin": codepin[i],
                "card_price": cardprice,
                "valid": "5 days"

            }

            displayy();
            function displayy() {
                try {
                    $.ajax({
                        type: 'POST',
                        url: "http://localhost:3000/cards",
                        data,
                        success: function (data) {
                            console.log('sucess', data);
                            window.location = './index.html';
                        }
                    });
                } catch (err) {
                    console.log(err.message)
                }

            }
        }


        e.preventDefault();

    })

});