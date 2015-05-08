<?php

function debug($data) {
    if(is_array($data) || is_object($data))
	{
		echo("<script>console.log('PHP: ".json_encode($data)."');</script>");
	} else {
		echo("<script>console.log('PHP: ".$data."');</script>");
	}
}


$con = mysql_connect("23.229.221.100","tempGuy","12345") or die (mysql_error());
     mysql_select_db("Temp",$con) or die (mysql_error());

     
$query = "SELECT * FROM highscore
            ORDER BY score DESC
            LIMIT 10";

$result = mysql_query($query);

echo "<table><thead><td>Name</td><td>Score</td></thead>";
if($result) 
  while($row = mysql_fetch_array($result))
      echo "<tr><td>" . $row['name'] . "</td><td>" . $row['score'] . "</td></tr>"; 
echo "</table>";

?>
