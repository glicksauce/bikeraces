# Project 1 - Bike Race Finder
https://git.generalassemb.ly/ira/SEIR-FLEX-123/tree/master/projects/project_1

https://docs.google.com/spreadsheets/d/1fS22w516hrhnCq4oJuuUdUQXpVWzxLps8brO4I0ulJc/edit?pli=1#gid=0

## The problem
I want to find bike races local to my area but I don't want to spend a lot of time trying to track them down. I know my event type, I just want to find something in my area. There is a website but its a bit clunky to navigate

## The concept:
A bike race finder that uses an API to find bike races in your area
wireframe: https://github.com/glicksauce/glicksauce.github.io/blob/master/wireframe.jpg?raw=true

## MVP Deliverables
- User can enter zip code and type of race and get back results
- User can scroll left and right through the results
- complex display element of scrollable results

## The layout:
A few buttons centered vertically and then the background image
Background 
- cyclist looking down at his handlebars. At the center is the garmin computer which will display results from the search

## Elements: 
- Title 

Input: 
- Enter Zip Code box 
(validation runs a reg-ex to check if 5 digit number)
        
Buttons:
- Input drop down to select type of bike race (road, cyclocross, off-road, grand-fondo)

- Slider button to select the range in mi of how far away to search for races

- Go! (kicks off the search) and API's

Divs: 
- Search results, displayed in the 'bike computer' section of the background. Used flexbox mostly with everything centered in a column layout.

Background:
- A bike computer attached to handlebars. I lined up the results div with the background image (would not recommend for future projects)
    
Complex user interface:
- search results are displayed 'carousel style' on the bike computer background (ordered by race date) and can be scrolled through left and right. Can "swipe" on a mobile device. can also use nav buttons

## The look
- going for a minimilist look. Centered on the page with thick empty margins.  Elements are stacked vertically. Mobile site is very similiar since this is a vertically oriented page. Used a lot of 'vw' and 'vw' CSS styling to keep everything aligned when resizing the page

## Mobile
the alignment works pretty well on all page sizes. I created two media queries for smart phone sizes (portriat and landscape) which make a bigger computer so I can display results larger.

Can also "swipe" through results

## Under the hood:
    The search is powered by an API from the website bike-reg.com: https://www.bikereg.com/api/EventSearchDoc.aspx. DOM manipulation will be done by jquery
    Added a second API: https://public.opendatasoft.com/api which converts a zip code until latitude and longitude coordinates to work with the first API

## Event Listeners 
Window.resize - resets results to postion 0 to fix scroll bar errors

Form.subit - runs first api to get lat,long, then passes to bike search api

## Stretch goals:
 - add another input where user can limit distance to search (in miles)
 implment 'find my current location' button to automatically populate users's zip code
 user can save races which will get stored in localstorage
 Create a calendar of saved races.
 change search results to a list and instead make the carousel of the users saved calendar events

## Progress:
( '-' in front of item indicates completed)
- complete proof of concept
-  create wireframe
- create html,css, and javascript boiler plate
- verify site is accessable from github pages
 - basic layout
   - background
   - input, buttons, divs
 - basic css
 - implement api. needs to take in zip and type of race and return results
    - (discovered api needs location in terms of latitude and lognitude, need to find a way to convert zip code into long, lat units will come back to this)
 - format result to appear in DOM
 - create carousel
 - revamp laouyout. format for multiple screen sizes
 - add data validation for zip code entry
- fix mobile layout, scroll on resize
 - improve CSS, make it look more professional
 start stretch goals

