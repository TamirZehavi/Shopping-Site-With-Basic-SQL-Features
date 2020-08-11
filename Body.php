<body>
    <div class="body_container">
        <input class="form-control" type="text" placeholder="Search" aria-label="Search" id="search_bar">
        <div class="table-dark_container">
            <table class="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                        <th scope="col">Picture</th>
                        <th scope="col">Options</th>
                    </tr>
                </thead>
                <tbody class='main_table_body'>
                    <?php

                    $alldata = $DBObject->GetAllData();
                    while ($row = $alldata->fetch_assoc()) {
                        echo
                            "<tr class='item_row_" . $row["id"] . "'>
                        <th scope='row' class='search_by item_id_" . $row["id"] . "'>" . $row["id"] . "</th>
                        <td class='search_by item_name_" . $row["id"] . "'>" . $row["name"] . "</td>
                        <td class='search_by item_description_" . $row["id"] . "'>" . $row["description"] . "</td>
                        <td class='search_by item_price_" . $row["id"] . "'>" . $row["price"] . "</td>
                        <td><img class='item_picture item_picture_" . $row["id"] . "' src=" . $row["picture"] . " alt='wolfie'></td>
                        <td>
                        <button type='button' class='btn btn-danger delete_button' data-id=" . $row["id"] . " id='remove_button_" . $row["id"] . "'>Remove</button>
                        <button type='button' class='btn btn-primary open_update_modal_button' data-toggle='modal' data-target='#myModal' id='update_button_" . $row["id"] . "'
                         data-id='" . $row["id"] . "' data-name='" . $row["name"] . "' data-description='" . $row["description"] . "'
                         data-price='" . $row["price"] . "' data-picture='" . $row["picture"] . "'>Update</button>
                        </td>
                        </tr>";
                    }
                    ?>
            </table>
        </div>
        <div class="bottom_buttons">
            <button type="button" class="btn btn-primary refresh_update_btn open_add_new_item_modal_button" data-toggle="modal" data-target="#myModal">Add Product</button><br>
            <button type="button" class="btn btn-primary refresh_update_btn refresh_list_button">Refresh List</button>
        </div>

    </div>
</body>