$(document).ready(function() {
    $('.delete_button').click(DeleteItem);
    $('.add_product_button').click(InsertItem);
    $('.update_product_button').click(UpdateItem);
    $('.open_update_modal_button').click(PrepareModalToUpdate);
    $('.open_add_new_item_modal_button').click(ChangeModalToAdd);
    $('.refresh_list_button').click(RefreshList);
    $('#search_bar').keyup(DynamicSearch);
});

currentItemID = 0; //current ID for the update function

function DynamicSearch() {
    var $tableData = $(".search_by"); //tableData refers to all my products names, descriptions, prices and IDs. you can put whatever class you want here, depends on how you want to search. 

    var textToSearch = $.trim(this.value).toUpperCase(); //this.value refers to whoever called the Dynamic Search function, in this case
    //the search bar, and it asks for it's value, which in this case is what we inserted. it turns it all to upper
    //case, so we'll do an *insensitive* case search

    if (textToSearch === "") //if string is empty, show all the table rows
        $tableData.parent().show(); //parent of table data is it's relevant row
    else { //if string is not empty
        $tableData.parent().hide(); //hide every table row
        $tableData.filter(function() { //the filter function will decide which parent to show and which isn't, depending on the test result from the function
            if (-1 != $(this).text().toUpperCase().indexOf(textToSearch)) {
                return true;
            } else return false;
            //this time, $(this) refers to whoever called the filter function
            //which is tableData. so we're looking at tableDatas text, meaning the text of all my table data. we turn it to upper
            //case and preform indexOf() on it. 
            //indexOf is a function which returns -1 if the value we looked for is not contained in a text.
            //so the method will return true or false, and this will determine which rows we'll show and which we won't.
        }).parent().show(); //means- if a data does contain certain text, we'll show it's *specific* parent which is the row.
    }
}

function RefreshList() {
    $(".table-dark_container").load('index.php' + " .table-dark", ReassignAllListeners); //ajax request to reload data
    // setTimeout(ReassignAllListeners, 100); //is delayed because we need the table to finish reloading before we attach any listeners to it
}

function DeleteItem() {
    $(this).attr("disabled", true);
    var currentItem = this; //get current item
    var itemID = $(this).data("id"); //get it's id number
    $.ajax({
        url: 'Remove.php',
        type: 'POST',
        data: { id: itemID },
        success: function(response) {
            if (response == 1) {
                $(currentItem).closest('tr').fadeOut(800, function() { //remove item with fadeout
                    $(this).remove();
                });
            } else {
                $(this).removeAttr("disabled");
                alert(response);
            }
        }
    });
}

function InsertItem() {
    $('.add_product_button').attr("disabled", true);
    var itemID = $('#form_id').val();
    var itemName = $('#form_name').val();
    var itemDescription = $('#form_description').val();
    var itemPrice = $('#form_price').val();
    var itemPicture = $('#form_picture').val();
    $.ajax({
        url: 'Insert.php',
        type: 'POST',
        data: {
            id: itemID,
            name: itemName,
            description: itemDescription,
            price: itemPrice,
            picture: itemPicture
        },
        success: function(response) { //response will always be a JSON object. Result will rely on statusCode field
            var dataParsed = JSON.parse(response); //first parse the data
            if (dataParsed.statusCode == 1) { //1 means success
                $("#myModal").modal('toggle'); //in case of success close the modal
                ResetForm();
                $(".add_product_button").removeAttr("disabled"); //make the Add button functional again
                WriteTableRow(dataParsed); //write HTML of the new SQL row
            } else {
                $(".add_product_button").removeAttr("disabled"); //make the Add button functional again
                alert(dataParsed.statusCode);
            }
        }
    })
}

function PrepareModalToUpdate() {
    ChangeModalToUpdate();

    var currentItem = this; //get current item
    currentItemID = $(this).data("id");
    //assign values to form
    $('#form_id').val($(this).data("id"));
    $('#form_name').val($(this).data("name"));
    $('#form_description').val($(this).data("description"));
    $('#form_price').val($(this).data("price"));
    $('#form_picture').val($(this).data("picture"));

    var itemID = $('#form_id').val();
    var itemName = $('#form_name').val();
    var itemDescription = $('#form_description').val();
    var itemPrice = $('#form_price').val();
    var itemPicture = $('#form_picture').val();
}

function UpdateItem() {
    $('.update_product_button').attr("disabled", true);
    var itemID = $('#form_id').val();
    var itemName = $('#form_name').val();
    var itemDescription = $('#form_description').val();
    var itemPrice = $('#form_price').val();
    var itemPicture = $('#form_picture').val();
    $.ajax({
        url: 'Update.php',
        type: 'POST',
        data: {
            currentItemID: currentItemID,
            id: itemID,
            name: itemName,
            description: itemDescription,
            price: itemPrice,
            picture: itemPicture
        },
        success: function(response) { //response will always be a JSON object. Result will rely on statusCode field
            var dataParsed = JSON.parse(response); //first parse the data
            if (dataParsed.statusCode == 1) { //1 means success
                $("#myModal").modal('toggle'); //in case of success close the modal
                ResetForm();
                $(".update_product_button").removeAttr("disabled"); //make the Update button functional again
                UpdateTableRow(dataParsed); //write HTML of the updated SQL row
            } else {
                $(".update_product_button").removeAttr("disabled"); //make the Update button functional again
                alert(dataParsed.statusCode);
            }
        }
    })
}

function UpdateTableRow(dataParsed) {
    $(`.item_row_${currentItemID}`).replaceWith(
        `<tr class='item_row_${dataParsed.id}'>
        <th scope='row' class='search_by item_id_${dataParsed.id}'>${dataParsed.id}</th>
                    <td class='search_by item_name_${dataParsed.id}'>${dataParsed.name}</td>
                    <td class='search_by item_description_${dataParsed.id}'>${dataParsed.description}</td>
                    <td class='search_by item_price_${dataParsed.id}'>${dataParsed.price}</td>
                    <td><img class='item_picture item_picture_${dataParsed.id}' src="${dataParsed.picture}" alt='wolfie'></td>
                    <td>
                        <button type='button' class='btn btn-danger delete_button' data-id='${dataParsed.id}' id='remove_button_${dataParsed.id}'>Remove</button>
                        <button type='button' class='btn btn-primary open_update_modal_button' data-toggle='modal' data-target='#myModal' id='update_button_${dataParsed.id}'
                         data-id='${dataParsed.id}' data-name='${dataParsed.name}' data-description='${dataParsed.description}'
                         data-price='${dataParsed.price}' data-picture='${dataParsed.picture}'>Update</button>
                    </td>
        `);
    $(`#remove_button_${dataParsed.id}`).click(DeleteItem);
    $(`#update_button_${dataParsed.id}`).click(PrepareModalToUpdate);
}

function WriteTableRow(dataParsed) {
    $('.main_table_body').append(
        `<tr class='item_row_${dataParsed.id}'>
        <th scope='row' class='search_by item_id_${dataParsed.id}'>${dataParsed.id}</th>
                    <td class='search_by item_name_${dataParsed.id}'>${dataParsed.name}</td>
                    <td class='search_by item_description_${dataParsed.id}'>${dataParsed.description}</td>
                    <td class='search_by item_price_${dataParsed.id}'>${dataParsed.price}</td>
                    <td><img class='item_picture item_picture_${dataParsed.id}' src="${dataParsed.picture}" alt='wolfie'></td>
                    <td>
                        <button type='button' class='btn btn-danger delete_button' data-id='${dataParsed.id}' id='remove_button_${dataParsed.id}'>Remove</button>
                        <button type='button' class='btn btn-primary open_update_modal_button' data-toggle='modal' data-target='#myModal' id='update_button_${dataParsed.id}'
                         data-id='${dataParsed.id}' data-name='${dataParsed.name}' data-description='${dataParsed.description}'
                         data-price='${dataParsed.price}' data-picture='${dataParsed.picture}'>Update</button>
                    </td>
        `
    );
    $(`#remove_button_${dataParsed.id}`).click(DeleteItem); //add deleting functionality, when the product is just created it's not there
    $(`#update_button_${dataParsed.id}`).click(PrepareModalToUpdate);

}

function ResetForm() {
    $('.modal_form').each(function() {
        this.reset();
    });
}

function ChangeModalToAdd() {
    ResetForm();
    $('.modal_title').html("Add Product");
    $('.add_product_button').show();
    $(".add_product_button").removeAttr("disabled");
    $('.update_product_button').hide();
    $('.update_product_button').attr("disabled", true);
}

function ChangeModalToUpdate() {
    ResetForm();
    $('.modal_title').html("Update Product");
    $('.add_product_button').hide();
    $('.add_product_button').attr("disabled", true);
    $('.update_product_button').show();
    $(".update_product_button").removeAttr("disabled");
}

function ReassignAllListeners() {
    $("tr").unbind();
    $("th").unbind();
    $("td").unbind();
    $("button").unbind();
    $("input").unbind();


    $('.delete_button').click(DeleteItem);
    $('.add_product_button').click(InsertItem);
    $('.update_product_button').click(UpdateItem);
    $('.open_update_modal_button').click(PrepareModalToUpdate);
    $('.open_add_new_item_modal_button').click(ChangeModalToAdd);
    $('.refresh_list_button').click(RefreshList);
    $('#search_bar').keyup(DynamicSearch);

}