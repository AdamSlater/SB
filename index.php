<html>
    <head>
        <title>site name</title>
         <meta name="viewport" content="width=device-width, initial-scale=1">    
         <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
         <link rel="stylesheet" href="https://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min.css">
         <script src="https://code.jquery.com/jquery-1.8.2.min.js"></script>
         <script src="https://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min.js"></script>
         <script src="http://malsup.github.io/jquery.cycle.all.js"></script>
         <script type="text/javascript" src="scripts/Script.js"></script>
         <script type="text/javascript" src="scripts/Store.js"></script>
         <script type="text/javascript" src="scripts/Instructions.js"></script>
         <link rel="stylesheet" href="StyleSheet.css">

         
    </head>
    <body onload="resize()">

        <!--Preloading audio tracks for later use-->
        <audio id="greenTile" src="sounds/green_tile.mp3" preload="auto"></audio>
        <audio id="redTile" src="sounds/red_tile.mp3" preload="auto"></audio>
        <audio id="yellowTile" src="sounds/yellow_tile.mp3" preload="auto"></audio>
        <audio id="pageChange" src="sounds/page_change.mp3" preload="auto"></audio>
        <audio id="BGmusic" src="sounds/StoreBG_Loop.mp3" preload="auto" loop="loop"></audio>

        <!--Used to prevent user from accidently refreshing (commented for code testing)-->
        <!--<script type="text/javascript">
            window.onbeforeunload = function() {
                return "Are you sure you want to leave? Think of the kittens!";
            }
        </script>-->

<!--main-->
        <div id="main-page" data-role="page">
            <img id="main-sign" src="images/signScaled.png" alt="Main Menu Sign"/>
            <a href="index.html#game-page" data-transition="pop">
                <img id="play-sign" src="images/play.png" alt="Play Game"/>
            </a>
            <a href="index.html#instruct-page" data-transition="slide">
                <img id="play-sign" src="images/instructions.png" alt="Instructions"/>
            </a>  
            <a href="index.html#leader-page" data-transition="slide">
                <img id="play-sign" src="images/leaderboards.png" alt="Leaderboards"/>
            </a>     
        </div>
<!--instr-->
        <div id="instruct-page" data-role="page">
            <div class="header" data-role="header">
                <h1>Instructions</h1>
            </div>
            <div data-role="content">
                <table style="margin: 20px auto;">
                    <tr>
                        <td>
                            <div id="slideshow">
                                <div><img src="images/Instructions/instructions1.png" alt="Instructions"/></div>
                                <div><img src="images/Instructions/instructions2.png" alt="Instructions"/></div>
                                <div><img src="images/Instructions/instructions3.png" alt="Instructions"/></div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div id="prev" onclick ="previous()" style="float:left;">PREV</div>
                            <div id="next" onclick ="next()" style="float:right;">NEXT</div>
                        </td>
                    </tr>
                </table>
                    <p id="instruct" style="text-align: center">
                This is the grid.
                </p>
                <!--Scores-->
                <form id="form" name="scores" action="leader.php" method="post">
                    <input type="hidden" id="userName"/>
                    <input type="hidden" id="userScore"/>
                </form>

                <a href="index.html#leader-page" id="submitInstr" data-role="button">To the leaderboards</a>
            </div>
            <div data-position="fixed" data-tap-toggle="false" data-role="footer" class="ui-bar">
                <div>
                    <div class="col-xs-4">
                        <div class="pause">
                            <a href="index.html#main-page" data-transition="slide" data-direction="reverse" data-theme="a" data-role="button" class="ui-icon-homez" data-iconpos="notext" onclick="pause();playTransition();stopStoreBG()"></a>
                        </div>
                    </div>
                    <div class="col-xs-4">
                        <div class="pause">
                            <a href="index.html#game-page" data-transition="flip" data-direction="reverse" data-theme="a" data-role="button" class="ui-icon-play" data-iconpos="notext" onclick="pause();playTransition();stopStoreBG()"></a>
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
                    <button type="submit" onclick="play()">Enter</button>
                </div>
            </div>
            <div data-position="fixed" data-tap-toggle="false" data-role="footer" class="ui-bar">
                <div>
                    <div class="col-xs-4">
                        <div class="pause">
                            <a href="index.html#main-page" data-transition="flip" data-direction="reverse" data-theme="a" data-role="button" class="ui-icon-homez" data-iconpos="notext" onclick="pause()"></a>
                        </div>
                    </div>
                    <div class="col-xs-4">
                        <div class="pause">
                            <a href="index.html#store-page" data-transition="flip" data-theme="a" data-role="button" class="ui-icon-pause" data-iconpos="notext" onclick="pause();playTransition();playStoreBG()"></a>
                        </div>
                    </div>
                    <div class="col-xs-4">
                        <img src="images/ba3.gif" alt="avatar"/>
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
                    <span class="coins">0 COINS</span>
                </div>
            </div>
            <div data-role="content">
                <h3>Store</h3>
                <div data-role="collapsible-set">
                    <div data-role="collapsible" data-theme="b">
                        <h4>Skills</h4>
                        <a href="index.html#game-page" id="hint" data-role="button" onclick="hint()">Hint</a>
                        <a href="index.html#game-page" id="repeat" data-role="button" onclick="repeat()">Repeat</a>
                        <a href="index.html#game-page" id="slowmo" data-role="button"  onclick="slowMo()">Slow-Mo Repeat</a>
                        <a href="index.html#game-page" id="stop" data-role="button" onclick="hint()">Stop</a>
                        <a href="index.html#game-page" id="skip" data-role="button" onclick="repeat()">Skip</a>
                        <a href="index.html#game-page" id="extraLife" data-role="button"  onclick="slowMo()">Extra Life</a> 
                    </div>
                    <div data-role="collapsible" data-theme="a">
                        <h4>Gamble (not working)</h4>
                        <a href="index.html#game-page" id="dubCash" data-role="button" onclick="">Double Cash</a>
                        <a href="index.html#game-page" id="dubXP" data-role="button" onclick="">Double XP</a>
                        <a href="index.html#game-page" id="dubBoth" data-role="button" onclick="">Double Trouble</a>
                        <a href="index.html#game-page" id="randSkill" data-role="button" onclick="">Random Skill</a>
                        <a href="index.html#game-page" id="allIn" data-role="button" onclick="">All In</a>
                    </div>
                    <div data-role="collapsible" data-theme="b">
                        <h4>Backgrounds</h4>
                        <fieldset data-role="controlgroup">
	                   
	                    <input type="radio" name="radio-choice" id="radio-choice-1" value="choice-3" checked="checked" onclick="makeDefault()"/>
     	                    <label for="radio-choice-1" id="r1">Default</label>
     	                    
     	                    <input type="radio" name="radio-choice" id="radio-choice-2" value="choice-1" onclick="makePeach()"/>
     	                    <label for="radio-choice-2" id="r2">Peach</label>

     	                    <input type="radio" name="radio-choice" id="radio-choice-3" value="choice-2" onclick="makePuke()" />
     	                    <label for="radio-choice-3" id="r3">Mustard</label>


     	                    <input type="radio" name="radio-choice" id="radio-choice-4" value="choice-4" onclick="makeFood()" />
     	                    <label for="radio-choice-4" id="r4">Food</label>
     	                    
     	                     <input type="radio" name="radio-choice" id="radio-choice-5" value="choice-5"  onclick="makeMatrix()"/>
     	                    <label for="radio-choice-5" id="r5">Matrix</label>

     	                    <input type="radio" name="radio-choice" id="radio-choice-6" value="choice-6" onclick="makeRainbow()" />
     	                    <label for="radio-choice-6" id="r6">Rainbow</label>

     	                    <input type="radio" name="radio-choice" id="radio-choice-7" value="choice-7" onclick="makeFire()"/>
     	                    <label for="radio-choice-7" id="r7">Fire</label>

     	                    <input type="radio" name="radio-choice" id="radio-choice-8" value="choice-8" onclick="makeCat()" />
     	                    <label for="radio-choice-8" id="r8">Cat</label>
     	                    

                        </fieldset>
                    </div>
                </div>
            </div>

            <div data-position="fixed" data-tap-toggle="false" data-role="footer" class="ui-bar">
                <div>
                    <div class="col-xs-4">
                        <div class="pause">
                            <a href="index.html#main-page" data-transition="flip" data-direction="reverse" data-theme="a" data-role="button" class="ui-icon-homez" data-iconpos="notext" onclick="pause();playTransition();stopStoreBG()"></a>
                        </div>
                    </div>
                    <div class="col-xs-4">
                        <div class="pause">
                            <a href="index.html#game-page" data-transition="flip" data-direction="reverse" data-theme="a" data-role="button" class="ui-icon-play" data-iconpos="notext" onclick="pause();playTransition();stopStoreBG()"></a>
                        </div>
                    </div>
                    <div class="col-xs-4">
                        <img src="images/ba3.gif" alt="avatar"/>
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
                <a href="index.html#instruct-page" id="backInstr" data-role="button">Back to the instructions</a>
            </div>
            <div data-role="footer" class="ui-bar" data-position="fixed" data-tap-toggle="false">
                <div class="col-xs-12">
                    <div class="col-xs-4"></div>
                        <div class="col-xs-4">
                            <a class="homebut" href="index.html#main-page" data-transition="slide" data-direction="reverse" data-theme="a" data-role="button" data-icon="home" data-iconpos="notext"></a>
                        </div>
                    <div class="col-xs-4"></div>
                </div>
                <br/><br/>
                <h3>Team Spirit Fingers &copy;</h3>
            </div>
        </div>
    </body>
</html>