<!DOCTYPE html>
<html>

<?php
require('./Connect.php');
require('./DB Operations.php');
$DBObject = new DB($DB);
?>

<head>
    <script src="jquery-3.5.1.js"></script>
    <script src="Scripts.js"></script>
    <script src="bootstrap.js"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
    <link rel="Stylesheet" type="text/css" href="Stylesheet.css">
</head>

<?php
require('./Header.php');
require('./Modal.php'); 
require('./Body.php');
require('./Footer.php');
?>

</html>