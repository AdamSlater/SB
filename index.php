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
    <body onload="resize(); setifSetandOnPage();checkPageSound()">

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

<!--main-->
        <div id="main-page" data-role="page">
            <img id="main-sign" src="images/signScaled.png" alt="Main Menu Sign"/>
            <a href="#popupPanel" data-rel="popup" data-transition="slide" data-position-to="window"><img class="headGear" src="images/cog.png" alt="Mute"/></a>		
            <div data-role="popup" id="popupPanel" data-corners="false" data-theme="none" data-shadow="false" data-tolerance="0,0">
                <img class="muteSound" src="images/sound.png" alt="Mute" onclick="muteSounds();mouseClick()"/>
                <br>
                <img class="muteMusic" src="images/music.png" alt="Mute" onclick="muteMusics();mouseClick()"/>
            </div>
            <a href="#aches-page" data-transition="pop" onclick="stopIntro();mouseClick()">
                <img class="achGear" src="images/achievo.png" alt="Achievements"/>
            </a>
            <a href="index.html#game-page" data-transition="pop" onclick="stopIntro();playGameMusic();userPlay();mouseClick()">
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
            <div class="header-instr header" data-role="header">
                INSTRUCTIONS
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
                            <div id="instrNavButts" data-role="controlgroup" data-type="horizontal" style="margin-left: 15%">
                                <a class="instrNav" href="" data-role="button" onclick="previous();mouseClick()"><<</a>
                                <a class="instrNav" href="" data-role="button" onclick="next();mouseClick()">>></a>
                            </div>
                        </td>
                    </tr>
                </table>
                <p id="instText" style="text-align: center">
                    The game starts here in a 1x1 to 5x5 sized grid.
                </p>
                
            </div>
            <div data-position="fixed" data-tap-toggle="false" data-role="footer" class="footer-instr footer">
                <div>
                    <div class="col-xs-4">
                        <div class="pause">
                            <a href="#main-page" data-theme="a" data-role="button" class="ui-icon-homez btnimg" data-iconpos="notext" onclick="history.go(0)"></a>

                        </div>
                    </div>
                    <div class="col-xs-4">
                        <div class="pause">
                            <a href="index.html#game-page" data-transition="flip" data-direction="reverse" data-theme="a" data-role="button" class="ui-icon-play btnimg" data-iconpos="notext" onclick="stopIntro();playGameMusic();userPlay();mouseClick()"></a>
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

                <div data-role="popup" id="achPopup1" >
                <img src="images/achievements/lvl3.png" alt="ach1">
                <p>"Achievement 1! (Beat Level 3). You have now unlocked Backgrounds in the store!"</p>
                </div>

                <div data-role="popup" id="achPopup2" >
                <img src="images/achievements/lvl7.png"  alt="ach2">
                <p>"Achievement 2! (Beat Level 7). You have now unlocked Skills in the store!"</p>
                </div>

                <div data-role="popup" id="achPopup3" >
                <img src="images/achievements/lvl10.png" alt="ach3">
                <p>"Achievement 3! (Beat Level 10). You have now unlocked Gambles in the store!"</p>
                </div>

                <div id="game">
                    <input class="gridPos" id="name" type="text" placeholder="Enter your name"/>
                    <button type="submit" onclick="getName();mouseClick()">Enter</button>
                </div>
            </div>
            <div data-position="fixed" data-tap-toggle="false" data-role="footer" class=" footer">
                <div>
                    <div class="col-xs-4">
                 
                            <a href="#main-page" data-rel="popup" data-transition="flip" data-direction="reverse" data-theme="a" data-role="button" class="ui-icon-homez btnimg" data-iconpos="notext" onclick="pause();playTransition();mouseClick();"></a>
                      
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
                    <h1 style="text-align: center">STORE</h1>
                </div>
				<div class="col-xs-3">
                    <span id="coins" class="coins">0 COINS</span>
                </div>
            </div>
            <div data-role="content">
                <h3>Store</h3>
                <div data-role="collapsible-set" class="storeCont">
                    <div data-role="collapsible" data-content-theme="a" data-theme="e">
                        <h4 id="achSkills" class="ui-disabled" >Skills (Unlock Lvl 7)</h4>
                                   
                        <div data-role="collapsible" data-theme="a" data-content-theme="e" data-iconpos="right">
                            <h3><a href="" data-theme="d" id="hint" data-role="button">Hint</a></h3>
                            <p><a href="" onclick="hint();">[BUY]</a> Shows the next tile.</p>
                        </div>
                        <div data-role="collapsible" data-theme="a" data-content-theme="e" data-iconpos="right">
                            <h3><a href="" data-theme="d" id="repeat" data-role="button">Repeat</a></h3>
                            <p><a href="" onclick="repeat(20,500,250);">[BUY]</a> Repeats the pattern</p>
                        </div>
                        <div data-role="collapsible" data-theme="a" data-content-theme="e" data-iconpos="right">
                            <h3><a href="" data-theme="d" id="slowmo" data-role="button">Slo-Rpt</a></h3>
                            <p><a href="" onclick="repeat(30,1000,600);">[BUY]</a> Repeats the pattern in slow motion</p>
                        </div>
                        <div data-role="collapsible" data-theme="a" data-content-theme="e" data-iconpos="right">
                            <h3><a href="" data-theme="d" id="stop" data-role="button">Stop</a></h3>
                            <p><a href="" onclick="stopTimer();">[BUY]</a> Stops the timer for one round</p>
                        </div>
                        <div data-role="collapsible" data-theme="a" data-content-theme="e" data-iconpos="right">
                            <h3><a href="" data-theme="d" id="skip" data-role="button">Skip</a></h3>
                            <p><a href="" onclick="skip();;">[BUY]</a> Skips the round, but still rewards you with the xp and coins</p>
                        </div>
                        <div data-role="collapsible" data-theme="a" data-content-theme="e" data-iconpos="right">
                            <h3><a href="" data-theme="d" id="extraLife" data-role="button">Extra Life</a> </h3>
                            <p><a href="" onclick="oneUp();">[BUY]</a> Gives you an extra life</p>
                        </div>
                    </div>
                    <div data-role="collapsible" data-theme="a" data-content-theme="e">
                        <h4 id="achGambles" class="ui-disabled">Gambles (Unlock Lvl 10)</h4>
                        <div data-role="collapsible" data-theme="e" data-content-theme="e" data-iconpos="right">
                            <h3><a href="" data-theme="a" id="dubCash" data-role="button">2x Cash</a></h3>
                            <p><a href="" onclick="dubCash();">[BUY]</a>Double the amount of coins earned at the end of the round.</p>
                        </div>

                        <div data-role="collapsible" data-theme="e" data-content-theme="a" data-iconpos="right">
                            <h3><a href="" data-theme="a" id="dubXP" data-role="button">2x XP</a></h3>
                            <p><a href="" onclick="dubXP();">[BUY]</a>Double the amount of xp earned at the end of the round.</p>
                        </div>

                        <div data-role="collapsible" data-theme="e" data-content-theme="a" data-iconpos="right">
                            <h3><a href="" data-theme="a" id="dubBoth" data-role="button" >2xCash+XP</a></h3>
                            <p><a href="" onclick="dubBoth();">[BUY]</a>Double the amount of xp and coins earned at the end of the round.</p>
                        </div>

                        <div data-role="collapsible" data-theme="e" data-content-theme="a" data-iconpos="right">
                            <h3><a href="" data-theme="a" id="randSkill" data-role="button">Random</a></h3>
                            <p><a href="" onclick="randomSkill();">[BUY]</a>A random skill will be selected.</p>
                        </div>

                        <div data-role="collapsible" data-theme="e" data-content-theme="a" data-iconpos="right">
                            <h3><a href="" data-theme="a" id="allIn" data-role="button" >All In</a></h3>
                            <p><a href="" onclick="allIn();">[BUY]</a>Win 10 rounds without losing a life - Get 120 xp</p>
                        </div>
                    </div>


                    <div data-role="collapsible" data-theme="e">
                        <h4 id="achBG" class="ui-disabled">Backgrounds (Unlock Lvl 3)</h4>
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
                 
                            <a href="#main-page" data-rel="popup" data-transition="flip" data-direction="reverse" data-theme="a" data-role="button" class="ui-icon-homez btnimg" data-iconpos="notext" onclick="pause();stopGameMusic();playTransition();mouseClick();"></a>
                      
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
                <a href="#main-page" onclick="history.go(0)">
                    <img class="mute-sign-ldr" src="images/homeMute.png" alt="Mute"/>
                </a> 
                <?php include 'leader.php';?>
            </div>
        </div>
<!--aches-->		
        <div id="aches-page" data-role="page">		
            <div class="aches" data-role="content" >
                <img class="achImage1" src="images/achievements/lvl3.png" alt="lvl3"/>
                <img class="achImage2" src="images/achievements/lvl7.png" alt="lvl7"/>
                <img class="achImage3" src="images/achievements/lvl10.png" alt="lvl10"/>
                <img class="achImage4" src="images/id-icon.png" alt="ID"/>
                <table>
                    <tr>
                        <td class="achDesc">Beat</td>
                        <td class="achDesc">Beat</td>
                        <td class="achDesc">Beat</td>
                    </tr>
                    <tr>
                        <td class="achDesc">Lvl 3</td>
                        <td class="achDesc">Lvl 7</td>
                        <td class="achDesc">Lvl 10</td>
                    </tr>
                </table>
                		
                <a href="index.html#main-page" id="toHome" data-transition="slide" data-direction="reverse" onclick="history.go(0)">		
                    <img class="mute-sign-ach" src="images/homeMute.png" alt="Mute"/>		
                </a> 
               		
                <?php include 'aches.php';?>	
                <?php include 'getID.php'?>	
                	
                <form id="achesForm" method="post" action="aches.php" data-ajax="false">		
                    <fieldset data-role="controlgroup">		
                        <input type = "hidden" name="userID" id = "userID"/>		
                	    <input type = "hidden" name="ach1" id = "ach1" value="0"/>		
                	    <input type = "hidden" name="ach2" id = "ach2" value="0"/>		
                        <input type = "hidden" name="ach3" id = "ach3" value="0"/>		
                    </fieldset>		
                </form>		
                <form id="idForm" method="post" action="getID.php" data-ajax="false">		
                    <fieldset data-role="controlgroup">		
                        <input type = "hidden" name="userID" class= "userID"/>		
                    </fieldset>		
                </form>		
            </div>		            
        </div>
<!--over-->
        <div id="over-page" data-role="page">
            <div class="over" data-role="content" >
                <img class="overDonkey" src="images/overDonkey.png" alt="donkey">
                <!--Scores-->
                <form name="vote" action="leader.php" method="post" data-ajax="false">
                	<fieldset data-role="controlgroup">
                		<input type = "hidden" name="userName" id ="userName"/>
                		<input type = "hidden" name="userScore" id = "userScore" value="0"/>
                		<input type = "hidden" name="userLevel" id = "userLevel" value="1"/>
                	</fieldset>                 
                	<input value = "Submit your score!" type = "submit"/>
                </form>
            </div>
        </div>
    </body>
</html>
