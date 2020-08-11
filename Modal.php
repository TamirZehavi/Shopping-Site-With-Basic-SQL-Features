<form class="modal_form">
    <div id="myModal" class="modal fade" role="dialog">
        <div class="modal-dialog">

            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title modal_title">Add Product</h4>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="id">Product ID</label>
                        <input type="text" class="form-control" id="form_id" placeholder="Enter ID here">
                    </div>
                    <div class="form-group">
                        <label for="name">Product Name</label>
                        <input type="text" class="form-control" id="form_name" placeholder="Enter name here">
                    </div>
                    <div class="form-group">
                        <label for="description">Product Description</label>
                        <input type="text" class="form-control" id="form_description" placeholder="Enter description here">
                    </div>
                    <div class="form-group">
                        <label for="price">Product Price</label>
                        <input type="text" class="form-control" id="form_price" placeholder="Enter price here">
                    </div>
                    <div class="form-group">
                        <label for="picture">Product Picture</label>
                        <input type="text" class="form-control" id="form_picture" placeholder="Insert picture URL or local adress">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-primary add_product_button">Add</button>
                    <button type="submit" class="btn btn-primary update_product_button">Update</button>
                    <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
                </div>
            </div>

        </div>
    </div>
</form>