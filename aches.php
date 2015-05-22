<?php

$ach1 = "";
$ach2 = "";
$ach3 = "";
$purp = "";
$userID = "";

//database connection
$con = mysql_connect("23.229.221.100","tempGuy","12345") or die (mysql_error());
     mysql_select_db("Temp",$con) or die (mysql_error());
if (!empty($_POST)){
    $ach1 = $_POST["ach1"];
    $ach2 = $_POST["ach2"];
	$ach3 = $_POST["ach3"];
    $userID = $_POST["userID"];

    
    
        $update = "UPDATE `aches` SET `ach1`=" . $ach1 . ", `ach2`=" . $ach2.", `ach3`=" .$ach3. " WHERE `pkz` = " . $userID;
        mysql_query($update);
        echo "<script>window.location.assign(window.location.origin + '/#game-page');</script>";



}
//databse query  
$query = "SELECT * FROM aches";
//fetches query
$result = mysql_query($query);

//makes table
echo "<table class='achTbl'>";
if($result) 
  while($row = mysql_fetch_array($result))
      echo "<tr>
                <td class='a". $row['ach1'] .$row['pkz'] ."'>" . $row['ach1'] . "</td>
                <td class='a". $row['ach2'] .$row['pkz'] ."'>" . $row['ach2'] . "</td>
                <td class='a". $row['ach3'] .$row['pkz'] ."'>" . $row['ach3'] . "</td>
                <td class='a". $row['pkz'] ."'>" . $row['pkz'] . "</td>
            </tr>"; 
echo "</table>";
?>