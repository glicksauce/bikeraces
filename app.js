let resultsArray = [];
let currentResult = 0;
let scrollIncrement = 100;


$(()=>{
console.log("up and running")



//displays a race result in the DOM
const displayResult = (resultNumber) =>{

        //clears out the results
        //$('.resultsText').remove()

        $eventTitle = $('<div>').text(resultsArray[0]["MatchingEvents"][resultNumber]["EventName"]).addClass("resultsText")

        
        $eventAddress = $('<div>').text(resultsArray[0]["MatchingEvents"][resultNumber]["EventAddress"]).addClass("resultsText")
        
        
        $eventCityState = $('<div>').text(
            resultsArray[0]["MatchingEvents"][resultNumber]["EventCity"] + " " + resultsArray[0]["MatchingEvents"][resultNumber]["EventState"]).addClass("resultsText")

        $eventDistance = $('<div>').text(Math.floor(resultsArray[0]["MatchingEvents"][resultNumber]["Distance"]) + " miles away").addClass("resultsText")
        
        //converts Microsoft JSON Date format to a readable date
        let date = new Date(parseInt(resultsArray[0]["MatchingEvents"][resultNumber]["EventDate"].substr(6)));
        let date2 = date.toDateString()
        let date3 = date.toTimeString();

        console.log(date2)
        console.log(date3)

        $eventDate = $('<div>').text(date2).addClass("resultsText")

        //making new div appending all results to this one div then appending it to search results
        $resultDiv = $('<div>').attr("id",currentResult).addClass("resultsText")
        $resultDiv
            .append($eventTitle)
            .append($eventAddress)
            .append($eventCityState)
            .append($eventDistance)
            .append($eventDate)

        $('.search-results').append($resultDiv)

        //testing slider section
        //$('.slider').append($resultDiv.attr("id",currentResult))

}

const makeNavButtons = () =>{
    $leftButton = $('<div>').attr("id","scroll-left").addClass("triangle-left")
    $topLeftButton = $('<div>').addClass("top-triangle-left")
    $rightButton = $('<div>').attr("id","scroll-right").addClass("triangle-right")
    $topRightButton = $('<div>').addClass("top-triangle-right")

    //if not at the last result than to to the next result
    $rightButton.on("click",function () {
        if (currentResult < resultsArray[0]["MatchingEvents"].length - 1){
            let currentScrollPosition = $('.search-results').scrollLeft()
            $('.search-results').scrollLeft(currentScrollPosition + scrollIncrement);

        }
    })

    $topRightButton.on("click",function () {
        if (currentResult < resultsArray[0]["MatchingEvents"].length - 1){
            let currentScrollPosition = $('.search-results').scrollLeft()
            $('.search-results').scrollLeft(currentScrollPosition + scrollIncrement);

        }
    })
        
     //if not at the first result than go to previous result
     $leftButton.on("click",function () {
        if (currentResult > 0){
            let currentScrollPosition = $('.search-results').scrollLeft()
            $('.search-results').scrollLeft(currentScrollPosition - scrollIncrement);
        }   
    })
    
    $topLeftButton.on("click",function () {
        if (currentResult > 0){
            let currentScrollPosition = $('.search-results').scrollLeft()
            $('.search-results').scrollLeft(currentScrollPosition - scrollIncrement);
        }   
    })

    $('.background').append($leftButton).append($topLeftButton).append($rightButton).append($topRightButton);
}

/* not using at this time
//mouse wheel listeners
const mouseWheelListeners = () => {
    $('.search-results').on('mousewheel DOMMouseScroll', function(e){
        if(typeof e.originalEvent.detail == 'number' && e.originalEvent.detail !== 0) {
          if(e.originalEvent.detail > 0) {
            console.log('Down');
          } else if(e.originalEvent.detail < 0){
              console.log('Up');
          }
        } else if (typeof e.originalEvent.wheelDelta == 'number') {
          if(e.originalEvent.wheelDelta < 0) {
              console.log('Down');
          } else if(e.originalEvent.wheelDelta > 0) {
              console.log('Up');
          }
        }
      });
}
*/

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
                    for (i=0;i<5;i++){
                        displayResult(currentResult);    
                        currentResult +=1;
                    }
                    makeNavButtons();         
                },
            ()=>{
                console.log('bad request')
                console.log("Error: " + data.statusText)
            }
        )
    })



})
