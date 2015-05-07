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

     
$query = "SELECT * FROM highscore";

$result = mysql_query($query);

if($result)
{
  while($row = mysql_fetch_array($result))
  {
    $name = $row["name"];
    echo "Name: ".$name."";
    
    $score = $row["score"];
    echo " Score: ".$score."<br>";
  }
}
?>

