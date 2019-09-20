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
                <td> <button style = "background:yellow" class='trigger'> Update</button></td>
                <td> <button style = "background:red" class='delete' data-deleteid=${item.id}> Delete</button></td>

	
              </tr>`

                )
            })


            var modal = document.querySelector(".modal");
            var trigger = document.querySelector(".trigger");
            var closeButton = document.querySelector(".close-button");
            
            function toggleModal() {
                modal.classList.toggle("show-modal");
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