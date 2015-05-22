<html>
    <head>
        <title>Simon's Besom</title>
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
    <body onload="resize()">

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
        <audio id="bpStart" class="sound" src="sounds/beep_initial.mp3" preload="auto"></audio>
        <audio id="bpEnd" class="sound" src="sounds/beep_final.mp3" preload="auto"></audio>
        <!--Used to prevent user from accidently refreshing (commented for code testing)-->
        <!--<script type="text/javascript">
            window.onbeforeunload = function() {
                return "Are you sure you want to leave? Think of the kittens!";
            }
        </script>-->

<!--main-->
        <div id="main-page" data-role="page">
            <img id="main-sign" src="images/signScaled.png" alt="Main Menu Sign"/>
            <a href="#popupPanel" data-rel="popup" data-transition="slide" data-position-to="window"><img class="headGear" src="images/cog.png" alt="Mute"/></a>		
            <div data-role="popup" id="popupPanel" data-corners="false" data-theme="none" data-shadow="false" data-tolerance="0,0">
                <img class="muteSound" src="images/sound.png" alt="Mute" onclick="muteSounds();mouseClick()"/>
                <br>
                <img class="muteMusic" src="images/music.png" alt="Mute" onclick="muteMusics();mouseClick()"/>
            </div>
            <a href="" data-transition="pop" onclick="stopIntro();mouseClick()">
                <img class="achGear" src="images/achievo.png" alt="Achievements"/>
            </a>
            <a href="index.html#game-page" data-transition="pop" onclick="stopIntro();playGameMusic();mouseClick()">
                <img class="play-sign" src="images/play.png" alt="Play Game"/>
            </a>
            <a href="index.html#instruct-page" data-transition="slide" onclick="stopIntro();mouseClick()">
                <img class="play-sign" src="images/instructions.png" alt="Instructions"/>
            </a>  
            <a href="index.html#leader-page" data-transition="slide" onclick="stopIntro();mouseClick()">
                <img class="play-sign" src="images/leaderboards.png" alt="Leaderboards"/>
            </a>
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
            <div data-position="fixed" data-tap-toggle="false" data-role="footer" class="footer">
                <div>
                    <div class="col-xs-4">
                        <div class="pause">
                            <a href="#popupDialog" data-theme="a" data-role="button" class="ui-icon-homez btnimg" data-iconpos="notext" onclick="history.go(0)"></a>

                        </div>
                    </div>
                    <div class="col-xs-4">
                        <div class="pause">
                            <a href="index.html#game-page" data-transition="flip" data-direction="reverse" data-theme="a" data-role="button" class="ui-icon-play btnimg" data-iconpos="notext" onclick="pause();playTransition();stopStoreBG();playGameMusic();mouseClick()"></a>
                        </div>
                    </div>
                    <div class="col-xs-4">
                    </div>
                </div>
            </div>
        </div>
<!--game-->
        <div id="game-page" data-role="page">   
              <div class="header" data-role="header">
                <div class="col-xs-3">
                    <span class="xp">0 <br> POINTS</span><br>
                    <br><span class="coins">0 <br>COINS</span>
                </div>
                <div class="col-xs-6 progress-parent">
                    <div class="progress">
                        <div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%"> Timer </div>
                    </div>
                </div>
				<div class="col-xs-3">
                    <a href="#popupPanel" data-rel="popup" data-transition="slide" data-position-to="window"><img class="gameGear" src="images/cog.png" alt="Mute"/></a>		
                    <div data-role="popup" id="popupPanel" data-corners="false" data-theme="none" data-shadow="false" data-tolerance="0,0">
                        <img class="muteSound" src="images/sound.png" alt="Mute" onclick="muteSounds();mouseClick()"/>
                        <br>
                        <img class="muteMusic" src="images/music.png" alt="Mute" onclick="muteMusics();mouseClick()"/>
                    </div>
                </div>
            </div>
            <div data-role="content"class="gridPos" >
                <div id="game">
                    <input class="gridPos" id="name" type="text" placeholder="Enter your name"/>
                    <button type="submit" onclick="play();mouseClick()">Enter</button>
                </div>
            </div>
            <div data-position="fixed" data-tap-toggle="false" data-role="footer" class=" footer">
                <div>
                    <div class="col-xs-4">
                 
                            <a href="#popupDialog" data-rel="popup" data-transition="flip" data-direction="reverse" data-theme="a" data-role="button" class="ui-icon-homez btnimg" data-iconpos="notext" onclick="pause();playIntro();stopGameMusic();playTransition();mouseClick()"></a>
                      
                    </div>
                    <div data-role="popup" id="popupDialog" data-corners="false" data-theme="none" data-shadow="false" data-tolerance="0,0">
                        <button type="button" class="btn btn-default btn-lg" onclick="history.go(0)">
                            <span class="glyphicon glyphicon-refresh"></span>
                        </button>
                    </div>
                    <div class="col-xs-4">
                    
                            <a href="index.html#store-page" data-transition="flip" data-theme="a" data-role="button" class="ui-icon-pause btnimg" data-iconpos="notext" onclick="pause();playTransition();playStoreBG();stopGameMusic();mouseClick()"></a>
                       
                    </div>
                    <div class="col-xs-4 livesCont">
                        <span class="lives"><img class="donkey" src="images/donkey.png" alt="lives"> x3</span>
                    </div>
                </div>
            </div>
        </div>
<!--store-->
        <div id="store-page" data-role="page">
            <div class="header" data-role="header" style="z-index: 2">
                <div class="col-xs-3">
                    <span class="xp">0 POINTS</span>
                </div>
                <div class="col-xs-6">
                    <h1 style="text-align: center"></h1>
                </div>
				<div class="col-xs-3">
                    <span id="coins" class="coins">0 COINS</span>
                </div>
            </div>
            <div data-role="content">
                <h3>Store</h3>
                <div data-role="collapsible-set" class="storeCont">
                    <!--
                    <div data-role="collapsible" data-theme="b">
                        <h4>Skills</h4>
                        <a href="" id="hint" data-role="button" onclick="hint();">Hint</a>
                        <a href="" id="repeat" data-role="button" onclick="repeat(20, 500, 250);">Repeat</a>
                        <a href="" id="slowmo" data-role="button"  onclick="repeat(30, 1000, 600);">Slow-Mo Repeat</a>
                        <a href="" id="stop" data-role="button" onclick="stopTimer();">Stop</a>
                        <a href="" id="skip" data-role="button" onclick="skip();">Skip</a>
                        <a href="" id="extraLife" data-role="button"  onclick="oneUp();">Extra Life</a> 
                    </div>-->
                    <div data-role="collapsible" data-content-theme="a" data-theme="b">
                        <h4 id="achSkills" >Skills        Unlocked lvl 5</h4>
                                   
                        <div data-role="collapsible" data-theme="b" data-content-theme="a" data-iconpos="right">
                            <h3><a href="" id="hint" data-role="button">Hint</a></h3>
                            <p><a href="" onclick="hint();storePurchase()">[BUY]</a> Shows the next tile.</p>
                        </div>
                        <div data-role="collapsible" data-theme="b" data-content-theme="a" data-iconpos="right">
                            <h3><a href="" id="repeat" data-role="button">Repeat</a></h3>
                            <p><a href="" onclick="repeat(20,500,250);storePurchase()">[BUY]</a> Repeats the pattern</p>
                        </div>
                        <div data-role="collapsible" data-theme="b" data-content-theme="a" data-iconpos="right">
                            <h3><a href="" id="slowmo" data-role="button">Slow-Mo Repeat</a></h3>
                            <p><a href="" onclick="repeat(30,1000,600);storePurchase()">[BUY]</a> Repeats the pattern in slow motion</p>
                        </div>
                        <div data-role="collapsible" data-theme="b" data-content-theme="a" data-iconpos="right">
                            <h3><a href="" id="stop" data-role="button">Stop</a></h3>
                            <p><a href="" onclick="stopTimer();storePurchase()">[BUY]</a> Stops the timer for one round</p>
                        </div>
                        <div data-role="collapsible" data-theme="b" data-content-theme="a" data-iconpos="right">
                            <h3><a href="" id="skip" data-role="button">Skip</a></h3>
                            <p><a href="" onclick="storePurchase();storePurchase()">[BUY]</a> Skips the round, but still rewards you with the xp and coins</p>
                        </div>
                        <div data-role="collapsible" data-theme="b" data-content-theme="a" data-iconpos="right">
                            <h3><a href="" id="extraLife" data-role="button">Extra Life</a> </h3>
                            <p><a href="" onclick="oneUp();storePurchase()">[BUY]</a> Gives you an extra life</p>
                        </div>
                    </div>


                    <!--<div data-role="collapsible" data-theme="a">
                        <h4>Gambles</h4>
                        <a href="" id="dubCash" data-role="button" onclick="dubCash();">Double Cash</a>
                        <a href="" id="dubXP" data-role="button" onclick="dubXP();">Double XP</a>
                        <a href="" id="dubBoth" data-role="button" onclick="dubBoth();">Double Trouble</a>
                        <a href="" id="randSkill" data-role="button" onclick="randomSkill();">Random Skill</a>
                        <a href="" id="allIn" data-role="button" onclick="allIn();">All In</a>
                    </div>-->
                    <div data-role="collapsible" data-theme="c" data-content-theme="a">
                        <h4>Gambles</h4>
                        <div data-role="collapsible" data-theme="a" data-content-theme="e" data-iconpos="right">
                            <h3><a href="" id="dubCash" data-role="button">Double Cash</a></h3>
                            <p><a href="" onclick="dubCash();storePurchase()">[BUY]</a>Double the amount of coins earned at the end of the round.</p>
                        </div>

                        <div data-role="collapsible" data-theme="a" data-content-theme="e" data-iconpos="right">
                            <h3><a href="" id="dubXP" data-role="button">Double XP</a></h3>
                            <p><a href="" onclick="dubXP();storePurchase()">[BUY]</a>Double the amount of xp earned at the end of the round.</p>
                        </div>

                        <div data-role="collapsible" data-theme="a" data-content-theme="e" data-iconpos="right">
                            <h3><a href="" id="dubBoth" data-role="button" >Double Trouble</a></h3>
                            <p><a href="" onclick="dubBoth();storePurchase()">[BUY]</a>Double the amount of xp and coins earned at the end of the round.</p>
                        </div>

                        <div data-role="collapsible" data-theme="a" data-content-theme="e" data-iconpos="right">
                            <h3><a href="" id="randSkill" data-role="button">Random Skill</a></h3>
                            <p><a href="" onclick="randomSkill();storePurchase()">[BUY]</a>A random skill will be selected.</p>
                        </div>

                        <div data-role="collapsible" data-theme="a" data-content-theme="e" data-iconpos="right">
                            <h3><a href="" id="allIn" data-role="button" >All In</a></h3>
                            <p><a href="" onclick="allIn();storePurchase()">[BUY]</a>Win 10 rounds without losing a life - Get 120 xp</p>
                        </div>
                    </div>


                    <div data-role="collapsible" data-theme="b">
                        <h4>Backgrounds</h4>
                        <fieldset data-role="controlgroup">
	                   
	                    <input type="radio" name="radio-choice" id="radio-choice-0" value="0" checked="checked" onclick="makeBackground(this);mouseClick()"/>
     	                    <label for="radio-choice-0" id="r1">Default</label>
     	                    
     	                    <input type="radio" name="radio-choice" id="radio-choice-1" value="1" onclick="makeBackground(this);mouseClick()"/>
     	                    <label for="radio-choice-1" id="r2">Peach</label>

     	                    <input type="radio" name="radio-choice" id="radio-choice-2" value="2" onclick="makeBackground(this);mouseClick()" />
     	                    <label for="radio-choice-2" id="r3">Mustard</label>

     	                    <input type="radio" name="radio-choice" id="radio-choice-3" value="3" onclick="makeBackground(this);mouseClick()" />
     	                    <label for="radio-choice-3" id="r4">Food</label>
     	                    
     	                     <input type="radio" name="radio-choice" id="radio-choice-4" value="4"  onclick="makeBackground(this);mouseClick()"/>
     	                    <label for="radio-choice-4" id="r5">Matrix</label>

     	                    <input type="radio" name="radio-choice" id="radio-choice-5" value="5" onclick="makeBackground(this);mouseClick()" />
     	                    <label for="radio-choice-5" id="r6">Rainbow</label>

     	                    <input type="radio" name="radio-choice" id="radio-choice-6" value="6" onclick="makeBackground(this);mouseClick()"/>
     	                    <label for="radio-choice-6" id="r7">Fire</label>

     	                    <input type="radio" name="radio-choice" id="radio-choice-7" value="7" onclick="makeBackground(this);mouseClick()" />
     	                    <label for="radio-choice-7" id="r8">Cat</label>
                        </fieldset>
                    </div>
                </div>
            </div>

            <div data-position="fixed" data-tap-toggle="false" data-role="footer" class=" footer">
                <div>
                    <div class="col-xs-4">
                      
                            <a href="index.html#main-page" data-transition="flip" data-direction="reverse" data-theme="a" data-role="button" class="ui-icon-homez btnimg" data-iconpos="notext" onclick="pause();playTransition();stopStoreBG();playIntro();mouseClick()"></a>
                        
                    </div>
                    <div class="col-xs-4">
                        
                            <a href="index.html#game-page" data-transition="flip" data-direction="reverse" data-theme="a" data-role="button" class="ui-icon-play btnimg" data-iconpos="notext" onclick="pause();playTransition();stopStoreBG();playGameMusic();mouseClick()"></a>
                        
                    </div>
                    <div class="col-xs-4 livesCont">
                        <span class="lives"><img class="donkey" src="images/donkey.png" alt="lives"> x3</span>
                    </div>
                </div>
            </div>
        </div>
<!--leader-->
        <div id="leader-page" data-role="page">
            <div class="leaders" data-role="content" >
                <a href="" onclick="history.go(0)">
                    <img class="mute-sign-ldr" src="images/homeMute.png" alt="Mute"/>
                </a> 
                <?php include 'leader.php';?>
            </div>
        </div>
<!--over-->
        <div id="over-page" data-role="page">
            <div class="over" data-role="content" >
                <img class="overDonkey" src="images/overDonkey.png" alt="donkey">
                <!--Scores-->
                <form name="vote" action="leader.php" method="post" data-ajax="false">
                	<fieldset data-role="controlgroup">
                		<input type = "hidden" name="userName" id = "userName"/>
                		<input type = "hidden" name="userScore" id = "userScore" value="0"/>
                		<input type = "hidden" name="userLevel" id = "userLevel" value="1"/>
                	</fieldset>                 
                	<input value = "Submit your score!" type = "submit" />
                </form>
            </div>
        </div>
    </body>
</html>
