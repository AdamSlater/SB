<?php
/*used for printing to console (like javascript)*/
function debug($data) {
    if(is_array($data) || is_object($data))
	{
		echo("<script>console.log('PHP: ".json_encode($data)."');</script>");
	} else {
		echo("<script>console.log('PHP: ".$data."');</script>");
	}
}
$name = "";
$score = "";
$maxlvl = "";
//database connection
$con = mysql_connect("23.229.221.100","tempGuy","12345") or die (mysql_error());
     mysql_select_db("Temp",$con) or die (mysql_error());
if (!empty($_POST)){
    $name = $_POST["userName"];
    $score = $_POST["userScore"];
	$maxlvl = $_POST["userLevel"];
    if ($name == "") $name = "anon";
    //inserts new data
    $insert = "INSERT INTO highscore 
        VALUES (" . $score . ", '" .  $name . "', " . $maxlvl . ")";
    //updates database
    mysql_query($insert);
    echo "<script>window.location.href='#leader-page';</script>";
}
//databse query  
$query = "SELECT * FROM highscore
            ORDER BY score DESC
            LIMIT 10";
//fetches query
$result = mysql_query($query);
//makes table
echo "<table class='ldrTable'>";
if($result) 
  while($row = mysql_fetch_array($result))
      echo "<tr class='ldrData'><td class='nameData'>" . $row['name'] . "</td><td class='scoreData'>" . $row['score'] . "</td><td class='levelData'>" . $row['maxlvl'] . "</td></tr>"; 
echo "</table>";
?>