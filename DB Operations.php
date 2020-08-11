<?php
class DB
{
    protected $DB;
    
    public function __construct(mysqli $DB)
    {
        $this->DB=$DB;
    }

    public function GetAllData() : object
    {
        $result = $this->DB->query('SELECT * FROM product');
        return $result;
    }

    public function Update($currentItemID, $id, $name, $description, $price, $picture)
    {
        $query="UPDATE `product` SET `id` = '$id', `name` = '$name', `description` = '$description',
        `price` = '$price', `picture` = '$picture' WHERE `product`.`id` = $currentItemID;";
        return $this->DB->query($query);
    }

    public function Insert($id, $name, $description, $price, $picture):bool
    {
        $query="INSERT INTO `product` (`id`, `name`, `description`, `price`, `picture`) 
        VALUES ('$id','$name','$description','$price','$picture');";
        return $this->DB->query($query);
    }

    public function Delete($id):bool
    {
        $query= "DELETE FROM product WHERE id=".$id;
        return $this->DB->query($query);
    }

    public function CheckForDoubleIDs($id):bool
    {
        $query= "SELECT * FROM product WHERE id=".$id;
        $Double= $this->DB->query($query)->num_rows;
        if($Double>0)
        {
            return true;
        }
        else return false;
    }

    public function Query($query)
    {
        return $this->DB->query($query);
    }
}
