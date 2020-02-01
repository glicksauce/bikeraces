# Project 1 - Bike Race Finder
https://git.generalassemb.ly/ira/SEIR-FLEX-123/tree/master/projects/project_1

https://docs.google.com/spreadsheets/d/1fS22w516hrhnCq4oJuuUdUQXpVWzxLps8brO4I0ulJc/edit?pli=1#gid=0

## The concept:
A bike race finder that uses an API to find bike races in your area

## The layout:
Standard screen
Background 
- cyclist looking down at his handlebards. At the center is the garmin computer which will display results from the search

## Elements: 
- Title 

Input: 
- Enter Zip Code box 
        
Buttons:
- Input drop down to select type of bike race (road, cyclocross, MTB, grand-fondo)
- Go! (kicks off the search)

Divs: 
- Search results, displayed in the 'bike computer' section of the background
    
Complex user interface:
- search results will be displayed 'carousel style' on the bike computer background (ordered by race date) and can be scrolled through left and right

## The look
- going for a minimilist look. It will be centered on the page with thick margins.  Elements will be stacked vertically. Mobile site will look very similiar since this is a vertically oriented page

## Under the hood:
    The search will be powered by an API from the website bike-reg.com: https://www.bikereg.com/api/EventSearchDoc.aspx. DOM manipulation will be done by jquery


## MVP Deliverables
- User can enter zip code and type of race and get back results
- User can scroll left and right through the results

## Stretch goals:
- add another input where user can limit distance to search (in miles)
- implment 'find my current location' button to automatically populate users's zip code
- user can save races which will get stored in localstorage
- Create a calendar of saved races.
- change search results to a list and instead make the carousel of the users saved calendar events

## Progress:
( '-' in front of item indicates completed)
- complete proof of concept
-  create wireframe
- create html,css, and javascript boiler plate
- verify site is accessable from github pages
 basic layout
   - background
   - input, buttons, divs
 basic css
 implement api. needs to take in zip and type of race and return results
 format result to appear in DOM
 create carousel
 revamp laouyout. format for multiple screen sizes
 improve CSS, make it look more professional
 start stretch goals

