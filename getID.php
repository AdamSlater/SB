<?php
//database connection
$con = mysql_connect("23.229.221.100","tempGuy","12345") or die (mysql_error());
     mysql_select_db("Temp",$con) or die (mysql_error());


if (!empty($_POST)){
    
    //inserts new data
        $insert = "INSERT INTO `aches`(`ach1`, `ach2`, `ach3`) VALUES (0,0,0)";
        //updates database
        mysql_query($insert);

        //databse query  
        $query = "SELECT MAX(pkz) FROM aches";
        //fetches query
        $result = mysql_query($query);

        //displays in elements: userID
        $row = mysql_fetch_row($result);
        echo "<script>localStorage.setItem('userID', " .$row[0]. ")</script>";
        echo "<script>window.location.assign(window.location.origin + '/#main-page');</script>";
        
}


?>