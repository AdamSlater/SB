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
        <audio id="greenTile" src="sounds/green_tile.wav" preload="auto"></audio>
        <audio id="redTile" src="sounds/red_tile.wav" preload="auto"></audio>
        <audio id="yellowTile" src="sounds/yellow_tile.wav" preload="auto"></audio>
        <audio id="pageChange" src="sounds/page_change.mp3" preload="auto"></audio>

        <!--<script type="text/javascript">
            window.onbeforeunload = function() {
                return "Are you sure you want to leave? Think of the kittens!";
            }
        </script>-->
        <div id="main-page" data-role="page">
            <img id="main-sign" src="images/signScaled.png" alt="Main Menu Sign"/>
            <a href="index.html#game-page" data-transition="pop">
                <img id="play-sign" src="images/play.png" alt="Play Game"/>
            </a>
            <a href="index.html#instruct-page" data-transition="slide">
                <img id="play-sign" src="images/instructions.png" alt="Instructions"/>
            </a>      
        </div>


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
            <div data-role="footer" class="ui-bar" data-position="fixed" data-tap-toggle="false">
                <div class="col-xs-12">
                    <div class="col-xs-4"></div>
                        <div class="col-xs-4">
                            <a id="homeBut" href="index.html#main-page" data-transition="slide" data-direction="reverse" data-theme="a" data-role="button" data-icon="home" data-iconpos="notext"></a>
                        </div>
                    <div class="col-xs-4"></div>
                </div>
                <br/><br/>
                <h3>Team Spirit Fingers &copy;</h3>
            </div>
        </div>


        <div id="game-page" data-role="page">

            
            <div class="header" data-role="header">
                <div class="col-xs-2">
                    <span id="xp">0 XP</span>
                </div>
                <div class="col-xs-8">
                    <h1 style="text-align: center">Simon's Besom</h1>
                    <div class="progress">
                        <div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%"> Timer </div>
                    </div>
                </div>
				<div class="col-xs-2"><span id="coin">0 COINS</span></div>
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
                        <div id="pause">
                            <a href="index.html#main-page" data-transition="flip" data-direction="reverse" data-theme="a" data-role="button" class="ui-icon-homez" data-iconpos="notext" onclick="pause();playTransition()"></a>
                        </div>
                    </div>
                    <div class="col-xs-4">
                        <div id="pause">
                            <a href="index.html#store-page" data-transition="flip" data-theme="a" data-role="button" class="ui-icon-pause" data-iconpos="notext" onclick="pause();playTransition()"></a>
                        </div>
                    </div>
                    <div class="col-xs-4">
                        <img src="images/ba3.gif" alt="avatar"/>
                    </div>
                </div>
            </div>
        </div>


        <div id="store-page" data-role="page">
            <div class="header" data-role="header">
                <h1>Simon's Besom</h1>
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
                        <a href="index.html#game-page" data-role="button" data-icon="gear" data-iconpos="right" onclick="">Bonus Life</a>
                        <a href="index.html#game-page" data-role="button" data-icon="search" data-iconpos="right" onclick="">Double or Nothing</a>
                        <a href="index.html#game-page" data-role="button" data-icon="info" data-iconpos="right" onclick="">Bonus XP</a>
                    </div>
                    <div data-role="collapsible" data-theme="b">
                        <h4>Backgrounds</h4>
                        <fieldset data-role="controlgroup">
	                        <legend>Choose a background:</legend>
     	                    <input type="radio" name="radio-choice" id="radio-choice-1" value="choice-1" checked="checked" onclick="makeRed()"/>
     	                    <label for="radio-choice-1">Red</label>

     	                    <input type="radio" name="radio-choice" id="radio-choice-2" value="choice-2" onclick="makeGreen()" />
     	                    <label for="radio-choice-2">Green</label>

     	                    <input type="radio" name="radio-choice" id="radio-choice-3" value="choice-3" onclick="makeBlue()"/>
     	                    <label for="radio-choice-3">Blue</label>

     	                    <input type="radio" name="radio-choice" id="radio-choice-4" value="choice-4" onclick="makeFire()" />
     	                    <label for="radio-choice-4">Fire</label>
                        </fieldset>
                    </div>
                </div>
            </div>

            <div data-position="fixed" data-tap-toggle="false" data-role="footer" class="ui-bar">
                <div>
                    <div class="col-xs-4">
                        <div id="pause">
                            <a href="index.html#main-page" data-transition="flip" data-direction="reverse" data-theme="a" data-role="button" class="ui-icon-homez" data-iconpos="notext" onclick="pause();playTransition()"></a>
                        </div>
                    </div>
                    <div class="col-xs-4">
                        <div id="pause">
                            <a href="index.html#game-page" data-transition="flip" data-direction="reverse" data-theme="a" data-role="button" class="ui-icon-play" data-iconpos="notext" onclick="pause();playTransition()"></a>
                        </div>
                    </div>
                    <div class="col-xs-4">
                        <img src="images/ba3.gif" alt="avatar"/>
                    </div>
                </div>
            </div>
        </div>

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
                            <a id="homeBut" href="index.html#main-page" data-transition="slide" data-direction="reverse" data-theme="a" data-role="button" data-icon="home" data-iconpos="notext"></a>
                        </div>
                    <div class="col-xs-4"></div>
                </div>
                <br/><br/>
                <h3>Team Spirit Fingers &copy;</h3>
            </div>
        </div>
    </body>
</html>