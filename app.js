let resultsArray = [];
let currentResult = 0;

$(()=>{
console.log("up and running")



//displays a race result in the DOM
const displayResult = (resultNumber) =>{
    //clears out the results
    $('.resultsText').remove()

    $eventTitle = $('<div>').text(resultsArray[0]["MatchingEvents"][resultNumber]["EventName"]).addClass("resultsText")

    
    $eventAddress = $('<div>').text(resultsArray[0]["MatchingEvents"][resultNumber]["EventAddress"]).addClass("resultsText")
    
    
    $eventCityState = $('<div>').text(
        resultsArray[0]["MatchingEvents"][resultNumber]["EventCity"] + " " + resultsArray[0]["MatchingEvents"][resultNumber]["EventState"]).addClass("resultsText")

    $eventDistance = $('<div>').text(Math.floor(resultsArray[0]["MatchingEvents"][resultNumber]["Distance"]) + " miles away").addClass("resultsText")
    
    $('.search-results').append($eventTitle).append($eventAddress).append($eventCityState).append($eventDistance)
}

const makeNavButtons = () =>{
    $leftButton = $('<button>').text("previous race").attr("id","scroll-left")
    $rightButton = $('<button>').text("next race").attr("id","scroll-right")

    //if not at the last result than to to the next result
    $rightButton.on("click",function () {
        if (currentResult < resultsArray[0]["MatchingEvents"].length - 1){
            currentResult +=1;
            displayResult(currentResult);
        }
    })
        
     //if not at the first result than go to previous result
     $leftButton.on("click",function () {
        if (currentResult > 0){
            currentResult -= 1;
            displayResult(currentResult);
        }   
    })

    $('.background').append($leftButton).append($rightButton);
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
                    displayResult(currentResult);    
                    makeNavButtons();             
                },
            ()=>{
                console.log('bad request')
                console.log("Error: " + data.statusText)
            }
        )
    })



})
