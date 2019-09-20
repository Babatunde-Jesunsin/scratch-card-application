const DATABASE_URI = ' http://localhost:3000/admin';

$(document).ready(function () {
    $('.submit').click(function(event){
        event.preventDefault()

        const password = $('.password').val()
        const username = $('.username').val()
        
        $.get(DATABASE_URI, function(data){
            const admin = data[0]

            if(admin.password == password && admin.username == username){
                window.location.replace('index.html')
            }
        })

    })
})