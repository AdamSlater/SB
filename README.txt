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

Simon's Besom is a Simon Says and Minesweeper crossover that will train the user's mind in memory and speed. The game is 
set in a square grid and will adjust it's size according to how the player is doing. The player will be racing against 
the clock attempting to repeat the path in the same order as they appeared. Each level is randomly generated and 
increases in difficulty as you progress(an increase in grid size or longer path to memorize).


CODE STRUCTURE
-----------------
-Root
    index.php 		-- The driver file used to operate the game.
    leader.php 		-- PHP file used to send Leaderboard related data to the database and retrieves data that will be 
			   used to create a table that will be used as the "Leaderboards".  
    aches.php 		-- PHP file used to send Achievement related data to the database, retrieves data and will store
			   it locally and will be printed for the user.
    getID.php 		-- PHP file used to adds a new user to the achievement database and stores that users id locally 	soley for later submission.
    Stylesheet.css 	-- Our custom stylesheet; All styling on top of jQuery and Bootstrap.
    READ_ME.txt 	-- This document
    -scripts
        script.js 	-- Main script file, it generates rounds, keeps track of player input, resizing, and submission to    databases. 
        instructions.js -- Seperate script file for the slideshow page; Navigation buttons for Next/Previous instruction 	and 
			   corresponding text per instruction.
        store.js 	-- Seperate script file for the store page; Responsible for in-game abilities, gambles, background 
			   customization and related audio playback of BGM
    -images
        -storeButtons 	-- Images related to buttons in the store
        -Instructions 	-- Images used for the slideshow in the instruction's page.
        
    -sounds		-- Audio for the game ranging from sound effects to background music.


TECHNOLOGY USED
-----------------
	HTML5
	CSS
	Javascript 
	jQuery (UI and MOBILE)
	AJAX
	PHP
	MYSQL
	Twitter Bootstrap
	Gimp
	Audacity
	WebMatrix 3


ISSUES/PROBLEMS ENCOUNTERED
-----------------------------

Version control 	-- Github represented a learning curve that often lead to code conflicts that constantly had to be sorted out.
Lack of direction 	-- In the beginning before we had to implement the scrum model, there was a lack
                    	   of direction leading to differences of opinion and slowed progression.
Couldn't break up tasks -- Found it hard to break up larger tasks into smaller components. Leading to
                   	   a severe lack of consistency of the length of each task and causing
                           some members to be assigned more work after each scrum.