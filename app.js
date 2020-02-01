let resultsArray = [];

$(()=>{
console.log("up and running")



//displays a race result in the DOM
const displayResult = (resultNumber) =>{
    $eventTitle = $('<div>').text(resultsArray[0]["MatchingEvents"][resultNumber]["EventName"])

    
    $eventAddress = $('<div>').text(resultsArray[0]["MatchingEvents"][resultNumber]["EventAddress"])
    
    
    $eventCityState = $('<div>').text(
        resultsArray[0]["MatchingEvents"][resultNumber]["EventCity"] + " " + resultsArray[0]["MatchingEvents"][resultNumber]["EventState"])

    $eventDistance = $('<div>').text(Math.floor(resultsArray[0]["MatchingEvents"][resultNumber]["Distance"]) + " miles away")
    
    $('.search-results').append($eventTitle).append($eventAddress).append($eventCityState).append($eventDistance)
}

const makeNavButtons = () =>{
    
}

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
                    resultsArray.push(data)  
                    displayResult(0);    
                    makeNavButtons();             
                },
            ()=>{
                console.log('bad request')
                console.log("Error: " + data.statusText)
            }
        )
    })



})
