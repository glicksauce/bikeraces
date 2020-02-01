$(()=>{
console.log("up and running")




//$('form').on('submit',(event)=>{
    //event.preventDefault();

    //const userInput = $('input[type="text"]').val()
    //numberComplaints = userInput

    //console.log(userInput)

    const promise = $.ajax({
        url:'http://www.BikeReg.com/api/search'}).then(
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


//})
