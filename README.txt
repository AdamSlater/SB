SIMON'S BESOM   VERSION 1.0  MAY 21 2015

TEAM INFO
--------------	
Group 1 - Team Spirit Fingers
Adam Slater
Grayden Hormes
Johnny Marin
Jon Deluz
Matthew Semeniuk


PROJECT OVERVIEW
---------------------
Simon's Besom

Simon's Besom is a Simon Says and Minesweeper crossover that will train the user's 
mind in memory and speed. The game is set in an X by X grid and will adjust it's size 
according to how the player is doing. The player will be racing against the clock 
attempting to replicate the path in the same order as they appeared. Each level is 
randomly generated and increases in difficulty as you progress(an increase in grid 
size or longer path to memorize).



CODE STRUCTURE
-----------------
-root
    index.php - main page used as an index for all others
    leader.php - leader board page
    aches.php - achievements page
    getID.php - used to store user IDs
    Stylesheet.css - All css styling used in the game
    READ_ME.txt - this document
    -scripts
        script.js - Main script file
        instructions.js - slide show script file used on the instructions page
        store.js - script file for all skills, backgrounds, and gambles used in the store
    -images
        -storeButtons - images used to make the store buttons
        -Instructions - images used to make the instruction slide show
        The rest of all the images used
    -sounds
        All the sounds used in the game

	All things begin at index.php. From there all the scripts, css, sounds, and pages are linked. Leader.php and the various
other php files fulfil php functions specific to their respective pages. Leader.php and aches.php both insert and select
from a database hosted by godaddy.com. getID.php also retrieves the user's ID from the database for use in aches.php.

	Script.js holds the all purpose code and mostly pertains to the game logic, mechanics, and functionality. It first
calls resize to fit the game to the user's screen, then it runs the play function which is the starting point of the 
game scripts and is only called every time the game page is loaded. Store.js holds the script for all the in-game skills
and all store related media, such as audio and background images.


TECHNOLOGY USED
-----------------
	HTML
	CSS
	JAVASCRIPT 
	JQUERY (UI and MOBILE)
	AJAX
	PHP
	MYSQL
	TWITTER BOOTSTRAP
	GIMP
	AUDACITY

ISSUES/PROBLEMS ENCOUNTERED
-----------------------------

Version control - Github represented a learning curve that often lead to code conflicts that constantly had to be sorted out.
Lack of direction - In the beginning before we had to implement the scrum model there was a lack
                    of direction leading to differences of opinion and slow progress.
Couldn't break up tasks - Found it hard to break up larger tasks into smaller components. Leading to
                    a severe lack of consistency of the length of each task and causing
                    some members to be assigned more work after each scrum.


