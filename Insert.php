<?php

require('./Connect.php');
require('./DB Operations.php');
$DBObject = new DB($DB);

$id=0;
$name="";
$description="";
$price="";
$picture="";

//Check ID: is it set and a positive number? also make sure it's not a decimal number
if(isset($_POST["id"]) && is_numeric($_POST["id"]) && $_POST["id"]>0 && !strpos($_POST["id"],'.'))
{
    if(($DBObject->CheckForDoubleIDs($_POST["id"]))) //check for double IDs
    {
        echo json_encode(array("statusCode"=>"Double ID"));
        exit;
    }
    $id= mysqli_real_escape_string($DB,$_POST["id"]); //if so assign the value to id
}

else{
    echo json_encode(array("statusCode"=>"ID is not set, is not a number, or is not legal"));
    exit;
}

//check name
if(isset($_POST["name"]))
{
    $name= mysqli_real_escape_string($DB,$_POST["name"]); //if so assign the value to id
}

else
{
    echo json_encode(array("statusCode"=>"Name is not set"));
    exit;
}

//check description
if(isset($_POST["description"]))
{
    $description= mysqli_real_escape_string($DB,$_POST["description"]); //if so assign the value to id
}

else
{
    echo json_encode(array("statusCode"=>"Description is not set"));
    exit;
}

//check if price is set and/or non numeric
if(isset($_POST["price"]) && is_numeric($_POST["price"]))
{
    $price= mysqli_real_escape_string($DB,$_POST["price"]); //assign value
}
else
{
    echo json_encode(array("statusCode"=>"Price is not set or is not a number"));
    exit;
}

function endsWith($string, $endString) //function to check the picture extension
{ 
    $len = strlen($endString); 
    if ($len == 0) { 
        return true; 
    } 
    return (substr($string, -$len) === $endString); 
} 

//Check if the picture link is ending with png or jpg
if(isset($_POST["picture"]) && ((endsWith($_POST["picture"],".jpg")) || (endsWith($_POST["picture"],".png"))))
{
    $picture= mysqli_real_escape_string($DB,$_POST["picture"]); //assign value
}
else
{
    echo json_encode(array("statusCode"=>"Picture is not set or adress is not legal (Should end .jpg or .png)"));
    exit;
}

$insertion=$DBObject->Insert($id, $name, $description, $price, $picture); //preform insert operation

//if the insertion was succesful send the data back to JS as a JSON object
if ($insertion){
    echo json_encode(array("statusCode"=>1,"id"=>$id,"name"=>$name,"description"=>$description,"price"=>$price,"picture"=>$picture));
} 
else {
    echo json_encode(array("statusCode"=>"Insertion failed"));
}

?>
