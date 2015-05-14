<html>
    <head>
        <title>site name</title>
         <meta name="viewport" content="width=device-width, initial-scale=1">    
         <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
         <link rel="stylesheet" href="https://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min.css">
         <script src="https://code.jquery.com/jquery-1.8.2.min.js"></script>
         <script src="https://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min.js"></script>
         <script type="text/javascript" src="scripts/Script.js"></script>
         <script type="text/javascript" src="scripts/Store.js"></script>
         <script type="text/javascript" src="scripts/Instructions.js"></script>
         <link rel="stylesheet" href="StyleSheet.css">
    </head>
    <body>

        <!--Preloading audio tracks for later use-->
        <audio id="greenTile" class="sound" src="sounds/green_tile.mp3" preload="auto"></audio>
        <audio id="redTile" class="sound" src="sounds/red_tile.mp3" preload="auto"></audio>
        <audio id="yellowTile" class="sound" src="sounds/yellow_tile.mp3" preload="auto"></audio>
        <audio id="pageChange" class="sound" src="sounds/page_change.mp3" preload="auto"></audio>
        <audio id="mouseClick" class="sound" src="sounds/mouse_click.mp3" preload="auto"></audio>
        <audio id="Storemusic" class="music" src="sounds/StoreBG_Loop.mp3" preload="auto" loop="loop"></audio>
        <audio id="introMusic" class="music" src="sounds/BG_intro.mp3" preload="auto" loop="loop" autoplay></audio>
        <audio id="gameMusic" class="music" src="sounds/BG_game.mp3" preload="auto" loop="loop"></audio>
        <audio id="coinDrop" class="sound" src="sounds/coin_drop.mp3" preload="auto"></audio>
        <audio id="cashRegister" class="sound" src="sounds/cash_register.mp3" preload="auto"></audio>
        
        <!--Used to prevent user from accidently refreshing (commented for code testing)-->
        <!--<script type="text/javascript">
            window.onbeforeunload = function() {
                return "Are you sure you want to leave? Think of the kittens!";
            }
        </script>-->

<!--main-->
        <div id="main-page" data-role="page">
            <img id="main-sign" src="images/signScaled.png" alt="Main Menu Sign"/>
            <a href="index.html#game-page" data-transition="pop" onclick="stopIntro();playGameMusic();mouseClick()">
                <img class="play-sign" src="images/play.png" alt="Play Game"/>
            </a>
            <a href="index.html#instruct-page" data-transition="slide" onclick="stopIntro();mouseClick()">
                <img class="play-sign" src="images/instructions.png" alt="Instructions"/>
            </a>  
            <a href="index.html#leader-page" data-transition="slide" onclick="stopIntro();mouseClick()">
                <img class="play-sign" src="images/leaderboards.png" alt="Leaderboards"/>
            </a>    
            <a href="index.html#setting-page" data-transition="slide">
                <img class="mute-sign" src="images/cog.png" alt="Mute"/>
            </a> 
        </div>
<!--settings-->
        <div id="setting-page" data-role="page">
            <a href="index.html#main-page" data-transition="slide" data-direction="reverse">
                <img class="mute-sign" src="images/homeMute.png" alt="Mute"/>
            </a> 
            <div data-role="content" style="margin-top: 15%; margin-left: 25%">
                <img id="muteSound" src="images/sound.png" alt="Mute" onclick="muteSounds();mouseClick()"/>
                <img id="muteMusic" src="images/music.png" alt="Mute" onclick="muteMusics();mouseClick()"/>
            </div>
            
        </div>
<!--instr-->
        <div id="instruct-page" data-role="page">
            <div class="header" data-role="header">
                <h1>Instructions</h1>
            </div>
            <div data-role="content" id="instruct">
                <table id="instTbl">
                    <tr>
                        <td>
                            <div>
                                <img  id="slideshow" src="images/Instructions/instructions1.png" alt="Instructions"/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div data-role="controlgroup" data-type="horizontal" style="margin-left: 15%">
                                <a href="" data-role="button" onclick="previous();mouseClick()">Prev</a>
                                <a href="" data-role="button" onclick="next();mouseClick()">Next</a>
                            </div>
                        </td>
                    </tr>
                </table>
                <p id="instText" style="text-align: center">
                    This is the grid.
                </p>
                
            </div>
            <div data-position="fixed" data-tap-toggle="false" data-role="footer" class="ui-bar">
                <div>
                    <div class="col-xs-4">
                        <div class="pause">
                            <a href="index.html#main-page" data-transition="slide" data-direction="reverse" data-theme="a" data-role="button" class="ui-icon-homez" data-iconpos="notext" onclick="pause();playTransition();stopStoreBG();playIntro();mouseClick()"></a>

                        </div>
                    </div>
                    <div class="col-xs-4">
                        <div class="pause">
                            <a href="index.html#game-page" data-transition="flip" data-direction="reverse" data-theme="a" data-role="button" class="ui-icon-play" data-iconpos="notext" onclick="pause();playTransition();stopStoreBG();playGameMusic();mouseClick()"></a>
                        </div>
                    </div>
                    <div class="col-xs-4">
                        <img src="images/ba3.gif" alt="avatar"/>
                    </div>
                </div>
            </div>
        </div>
<!--game-->
        <div id="game-page" data-role="page">   
              <div class="header" data-role="header">
                <div class="col-xs-3">
                    <span class="xp">0 XP</span>
                </div>
                <div class="col-xs-6">
                    <h1 style="text-align: center">Simon's Besom</h1>
                    <div class="progress">
                        <div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%"> Timer </div>
                    </div>
                </div>
				<div class="col-xs-3">
                    <span class="coins">0 COINS</span>
                </div>
            </div>
            <div data-role="content">
                <div id="game">
                    <input id="name" type="text" placeholder="Enter your name"/>
                    <button type="submit" onclick="play();mouseClick()">Enter</button>
                </div>
            </div>
            <div data-position="fixed" data-tap-toggle="false" data-role="footer" class="ui-bar">
                <div>
                    <div class="col-xs-4">
                        <div class="pause">
                            <a href="index.html#main-page" data-transition="flip" data-direction="reverse" data-theme="a" data-role="button" class="ui-icon-homez" data-iconpos="notext" onclick="pause();playIntro();stopGameMusic();playTransition();mouseClick()"></a>
                        </div>
                    </div>
                    <div class="col-xs-4">
                        <div class="pause">
                            <a href="index.html#store-page" data-transition="flip" data-theme="a" data-role="button" class="ui-icon-pause" data-iconpos="notext" onclick="pause();playTransition();playStoreBG();stopGameMusic();mouseClick()"></a>
                        </div>
                    </div>
                    <div class="col-xs-4">
                        <span class="lives">3 LIVES</span>
                    </div>
                </div>
            </div>
        </div>
<!--store-->
        <div id="store-page" data-role="page">
            <div class="header" data-role="header">
                <div class="col-xs-3">
                    <span class="xp">0 XP</span>
                </div>
                <div class="col-xs-6">
                    <h1 style="text-align: center">Simon's Besom</h1>
                </div>
				<div class="col-xs-3">
                    <span id="coins" class="coins">0 COINS</span>
                </div>
            </div>
            <div data-role="content">
                <h3>Store</h3>
                <div data-role="collapsible-set">
                    <div data-role="collapsible" data-theme="b">
                        <h4>Skills</h4>
                        <a href="" id="hint" data-role="button" onclick="hint();storePurchase()">Hint</a>
                        <a href="" id="repeat" data-role="button" onclick="repeat();storePurchase()">Repeat</a>
                        <a href="" id="slowmo" data-role="button"  onclick="slowMo();storePurchase()">Slow-Mo Repeat</a>
                        <a href="" id="stop" data-role="button" onclick="stopTimer();storePurchase()">Stop</a>
                        <a href="" id="skip" data-role="button" onclick="skip();storePurchase()">Skip</a>
                        <a href="" id="extraLife" data-role="button"  onclick="oneUp();storePurchase()">Extra Life</a> 
                    </div>
                    <div data-role="collapsible" data-theme="a">
                        <h4>Gambles</h4>
                        <a href="" id="dubCash" data-role="button" onclick="dubCash();storePurchase()">Double Cash</a>
                        <a href="" id="dubXP" data-role="button" onclick="dubXP();storePurchase()">Double XP</a>
                        <a href="" id="dubBoth" data-role="button" onclick="dubBoth();storePurchase()">Double Trouble</a>
                        <a href="" id="randSkill" data-role="button" onclick="randomSkill();storePurchase()">Random Skill</a>
                        <a href="" id="allIn" data-role="button" onclick="allIn();storePurchase()">All In</a>
                    </div>
                    <div data-role="collapsible" data-theme="b">
                        <h4>Backgrounds</h4>
                        <fieldset data-role="controlgroup">
	                   
	                    <input type="radio" name="radio-choice" id="radio-choice-1" value="choice-3" checked="checked" onclick="makeDefault();mouseClick()"/>
     	                    <label for="radio-choice-1" id="r1">Default</label>
     	                    
     	                    <input type="radio" name="radio-choice" id="radio-choice-2" value="choice-1" onclick="makePeach();mouseClick()"/>
     	                    <label for="radio-choice-2" id="r2">Peach</label>

     	                    <input type="radio" name="radio-choice" id="radio-choice-3" value="choice-2" onclick="makePuke();mouseClick()" />
     	                    <label for="radio-choice-3" id="r3">Mustard</label>


     	                    <input type="radio" name="radio-choice" id="radio-choice-4" value="choice-4" onclick="makeFood();mouseClick()" />
     	                    <label for="radio-choice-4" id="r4">Food</label>
     	                    
     	                     <input type="radio" name="radio-choice" id="radio-choice-5" value="choice-5"  onclick="makeMatrix();mouseClick()"/>
     	                    <label for="radio-choice-5" id="r5">Matrix</label>

     	                    <input type="radio" name="radio-choice" id="radio-choice-6" value="choice-6" onclick="makeRainbow();mouseClick()" />
     	                    <label for="radio-choice-6" id="r6">Rainbow</label>

     	                    <input type="radio" name="radio-choice" id="radio-choice-7" value="choice-7" onclick="makeFire();mouseClick()"/>
     	                    <label for="radio-choice-7" id="r7">Fire</label>

     	                    <input type="radio" name="radio-choice" id="radio-choice-8" value="choice-8" onclick="makeCat();mouseClick()" />
     	                    <label for="radio-choice-8" id="r8">Cat</label>
     	                    

                        </fieldset>
                    </div>
                </div>
            </div>

            <div data-position="fixed" data-tap-toggle="false" data-role="footer" class="ui-bar">
                <div>
                    <div class="col-xs-4">
                        <div class="pause">
                            <a href="index.html#main-page" data-transition="flip" data-direction="reverse" data-theme="a" data-role="button" class="ui-icon-homez" data-iconpos="notext" onclick="pause();playTransition();stopStoreBG();playIntro();mouseClick()"></a>
                        </div>
                    </div>
                    <div class="col-xs-4">
                        <div class="pause">
                            <a href="index.html#game-page" data-transition="flip" data-direction="reverse" data-theme="a" data-role="button" class="ui-icon-play" data-iconpos="notext" onclick="pause();playTransition();stopStoreBG();playGameMusic();mouseClick()"></a>
                        </div>
                    </div>
                    <div class="col-xs-4">
                        <span class="lives">3 LIVES</span>
                    </div>
                </div>
            </div>
        </div>
<!--leader-->
        <div id="leader-page" data-role="page">
            <div class="header" data-role="header">
                <h1>Leaderboard</h1>
            </div>
            <div data-role="content" style="margin-top: 15%">
                <?php include 'leader.php';?>
                <!--Scores-->
                <form name="vote" action="leader.php" method="post" data-ajax="false">
                    <fieldset data-role="controlgroup">
                        <input type = "hidden" name="userName" id = "userName"/>
                        <input type = "hidden" name="userScore" id = "userScore" value="0"/>
                    </fieldset>                 
                    <input value = "Submit your score!" type = "submit" onclick="mouseClick()" />
                </form>
            </div>
            <div data-role="footer" class="ui-bar" data-position="fixed" data-tap-toggle="false">
                <div class="col-xs-12">
                    <div class="col-xs-4"></div>
                        <div class="col-xs-4">
                            <a class="homebut" href="index.html#main-page" data-transition="slide" data-direction="reverse" data-theme="a" data-role="button" data-icon="home" data-iconpos="notext" onclick="playIntro();mouseClick()"></a>
                        </div>
                    <div class="col-xs-4"></div>
                </div>
                <br/><br/>
                <h3>Team Spirit Fingers &copy;</h3>
            </div>
        </div>
    </body>
</html>
