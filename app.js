$(()=>{
console.log("up and running")




    $('form').on('submit',(event)=>{
        event.preventDefault();

        let $userZipCode = $('#zip-code').val();
        console.log($userZipCode)
        //const userInput = $('input[type="text"]').val()
        //numberComplaints = userInput

        //console.log(userInput)

        const promise = $.ajax({
            url:'https://cors-anywhere.herokuapp.com/http://www.BikeReg.com/api/search?loc=42.7935917|-71.0378909&distance=60'}).then(
                (data)=>{
                    //console.log(JSON.stringify(new Date()))
                    console.log(data)
                    
                },
            ()=>{
                console.log('bad request')
                console.log("Error: " + data.statusText)
            }
        )

    })


})
