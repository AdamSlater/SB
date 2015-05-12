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

//database connection
$con = mysql_connect("23.229.221.100","tempGuy","12345") or die (mysql_error());
     mysql_select_db("Temp",$con) or die (mysql_error());

if (!empty($_POST)){
    $name = $_POST["userName"];
    $score = $_POST["userScore"];

    if ($name == "") $name = "anon";

    //inserts new data
    $insert = "INSERT INTO highscore 
        VALUES (" . $score . ", '" .  $name . "')";

    //updates database
    mysql_query($insert);
}

//databse query  
$query = "SELECT * FROM highscore
            ORDER BY score DESC
            LIMIT 10";

//fetches query
$result = mysql_query($query);

//makes table
echo "<table><thead><td>Name</td><td>Score</td></thead>";
if($result) 
  while($row = mysql_fetch_array($result))
      echo "<tr><td>" . $row['name'] . "</td><td>" . $row['score'] . "</td></tr>"; 
echo "</table>";

?>
