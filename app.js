let resultsArray = [];
let currentResult = 0;
let resultsTally = 0;
let scrollIncrement = 100; //default
let latitude = ''
let longitutde = ''


$(()=>{
console.log("up and running")

const resetElements = () => {
    resultsArray = [];
    currentResult = 0;
    resultsTally = 0;
    scrollIncrement = 100; //default
    latitude = ''
    longitutde = ''

    $('.resultsText').remove();
    $('#scroll-left').remove()
    $('#scroll-right').remove()
}

//displays a race result in the DOM
const displayResult = (resultNumber) =>{

        //event title
        $eventTitle = $('<div>').text(resultsArray[0]["MatchingEvents"][resultNumber]["EventName"]).addClass("resultsText")

        //event address (sometimes this is blank)
        if (resultsArray[0]["MatchingEvents"][resultNumber]["EventAddress"] != '') {
            $eventAddress = $('<div>').text(resultsArray[0]["MatchingEvents"][resultNumber]["EventAddress"]).addClass("resultsText")
        }
        //console.log(resultNumber);
        //console.log(resultsArray[0]["MatchingEvents"][resultNumber]["EventAddress"])
        //console.log($eventAddress.text());

        
        //event city + event state
        $eventCityState = $('<div>').text(
            resultsArray[0]["MatchingEvents"][resultNumber]["EventCity"] + " " + resultsArray[0]["MatchingEvents"][resultNumber]["EventState"]).addClass("resultsText")
        
        //distance from zip code
        $eventDistance = $('<div>').text(Math.floor(resultsArray[0]["MatchingEvents"][resultNumber]["Distance"]) + " miles away").addClass("resultsText")
        
        //converts Microsoft JSON Date format to a readable date
        let date = new Date(parseInt(resultsArray[0]["MatchingEvents"][resultNumber]["EventDate"].substr(6)));

        //different date formats
        let date2 = date.toDateString()
        let date3 = date.toTimeString();
        $eventDate = $('<div>').text(date2).addClass("resultsText")

        //adding website
        $eventWebsite = $('<div>').html("<a href='" + resultsArray[0]["MatchingEvents"][resultNumber]["EventUrl"] + "'>website</a>").addClass("resultsText")

        //making new div appending all results to this one div then appending it to search results
        $resultDiv = $('<div>').attr("id",currentResult).addClass("resultsText").css("border","none")
        
        $resultDiv
            .append($eventTitle)
           
          if ($eventAddress !== ''){
            $resultDiv.append($eventAddress)
          }

          $resultDiv
            .append($eventCityState)
            .append($eventDistance)
            .append($eventDate)
            .append($eventWebsite)

        $('.search-results').append($resultDiv)

}

const makeNavButtons = () =>{

    //adding left and right buttons
    $leftButton = $('<div>').attr("id","scroll-left").addClass("triangle-left")
    //$topLeftButton = $('<div>').addClass("top-triangle-left")
    $rightButton = $('<div>').attr("id","scroll-right").addClass("triangle-right")
    //$topRightButton = $('<div>').addClass("top-triangle-right")

    //setting  scroll increment
    scrollIncrement = $('.search-results').get(0).scrollWidth / resultsTally

    //if not at the last result than to to the next result
    $rightButton.on("click",function () {

        if (currentResult < resultsTally){
            

            let currentScrollPosition = $('.search-results').scrollLeft()
            $('.search-results').scrollLeft(currentScrollPosition + scrollIncrement);
            currentResult += 1;

        }
    })
        
     //if not at the first result than go to previous result
     $leftButton.on("click",function () {
        if (currentResult > 0){
            let currentScrollPosition = $('.search-results').scrollLeft()
            $('.search-results').scrollLeft(currentScrollPosition - scrollIncrement);
            currentResult -=1;
        }   
    })
    

    $('.container')
    .append($leftButton)
    //.append($topLeftButton)
    .append($rightButton)
    //.append($topRightButton);
}

const zipCodeValidation = (arg) =>{
    const zipCodeRegex = /^\d{5}$/ 

    if (!zipCodeRegex.test(arg)) {
        $('.zip-error').fadeIn();
    } else {

    }

    return !zipCodeRegex.test(arg)
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

        //reset everything back
        resetElements();

        let userZipCode = $('#zip-code').val();

        const getLatLong = () => {
 
            $.ajax({url:'https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-zip-code-latitude-and-longitude&q=' + userZipCode + '&facet=state&facet=timezone&facet=dst'}).then(
                (data)=>{
                    console.log(data)
                    latitude = data.records[0].fields.geopoint[0]
                    longitude = data.records[0].fields.geopoint[1]
                    getBikeRaceResults()
                    
                },
                ()=>{
                    console.log('bad request')
                    console.log("couldn't parse zip code")
                    console.log("Error: " + data.statusText)
                }
            )
        }

        const getBikeRaceResults = () => {
            let urlString = 'https://cors-anywhere.herokuapp.com/http://www.BikeReg.com/api/search?loc='+ latitude + '|' + longitude + '&distance=60'
            $.ajax({url:urlString}).then(
                    (data)=>{
                        
                        console.log(data)

                        //adds results to array
                        resultsArray.push(data)  

                        //loops over all race results and adds to DOM
                        for (i=0;i<resultsArray[0]["MatchingEvents"].length;i++){
                            //console.log(resultsArray[0].MatchingEvents[i].EventTypes)
                            //console.log($('#race-type').val())
                            //console.log(resultsArray[0].MatchingEvents[i].EventTypes.includes($('#race-type').val()))
                            if (resultsArray[0].MatchingEvents[i].EventTypes.includes($('#race-type').val())) {

                                displayResult(currentResult);    
                                resultsTally +=1;
                            }
                            currentResult +=1;
                            
                        }

                        //sets currentResult back to 0 (start of results)
                        currentResult = 0;

                        //makes the navigation buttons
                        makeNavButtons();         
                    },
                ()=>{
                    console.log('bad request')
                    console.log("Error: " + data.statusText)
                }
            )   
        }

        /*

        const promiseZipCode = new Promise(function(resolve,reject) {
            const zipCodeRegex = /^\d{5}$/ 

            if (!zipCodeRegex.test(userZipCode)) {
                $('.zip-error').fadeIn();
                reject(new Error("invalid zip!"))
            } else {
                $('.zip-error').fadeOut();
                console.log("zip valid")
                resolve("zip valid!")
                
            }
        
        })
        */

        const checkZipCode = (zipCode) =>{
            const zipCodeRegex = /^\d{5}$/ 

            if (!zipCodeRegex.test(zipCode)) {
                $('.zip-error').fadeIn();
            } else {
                $('.zip-error').fadeOut();
                console.log("zip valid")
                getLatLong()
            }
        }

        checkZipCode(userZipCode)
        //promiseZipCode.then(getLatLong(),
        //    console.log("nope"))
    })



})