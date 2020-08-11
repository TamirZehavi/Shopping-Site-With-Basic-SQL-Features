<?php

require('./Connect.php');
require('./DB Operations.php');
$DBObject = new DB($DB);

$id=0; //set ID to 0

if(isset($_POST["id"])) //Check if anything exists in POST[ID]
{
    $id= mysqli_real_escape_string($DB,$_POST["id"]); //if so assign the value to id
}

if($id>0)
{
    $Row=$DB->query("SELECT * FROM product WHERE id=".$id); //Select the relevant row
    $IsThereData= $Row->num_rows; //check if there is data
}

else echo "there are no rows ".$IsThereData;

if($IsThereData>0) //if data exists in the relevant row, we'll delete it
{
    if($DBObject->Delete($id))
    {
        echo 1; //delete succesfull
        exit;
    }
    else{
        echo "Ivalid ID"; //not succesfull
        exit;
    }
    
}

else echo "Delete not succesful"; //not succesfull
exit;


?>