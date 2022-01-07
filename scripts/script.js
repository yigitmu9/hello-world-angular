function productUpdate() {
    if ($("#product").val() != null && $("#product").val() != '') {
        // Add product to Table
        productAddToTable() 
            
        // Clear form fields
        formClear();

        // Focus to product name field
        $("#product").focus();
    }
    
}

function productAddToTable() {
    if($('#product').val() == '' || $('#number').val() == ''){
        alert('Product or number can not be left blank');
        return;
     }
    
   const d = new Date();
    // First check if a <tbody> tag exists, add one if not
    if ($("#productTable tbody").length == 0) {
        $("#productTable").append("<tbody></tbody>");
    }

    // Append product to the table
    $("#productTable tbody").append("<tr>" +
        "<td>" + $("#product").val() + "</td>" +
        "<td>" + $("#number").val() + "</td>" +
        "<td>" + d + "</td>" + 
        "<td>" +
        "<button type='button' id='editButton' onclick='productDisplay(this);' class='btn btn-default'>" +
        "<span class='glyphicon glyphicon-edit' />" +
        "</button>" +
        "</td>" + 
        "<td>" +
        "<button type='button' onclick='productDelete(this);' class='btn btn-default'>" +
        "<span class='glyphicon glyphicon-remove' />" +
        "</button>" +
        "</td>" +
        "</tr>");
}

//The formClear() function uses a jQuery selector to find each input field
//and set the value of each to a blank string.
//Setting the value to a blank clears the input field so that the user can enter new data.
function formClear() {
    $("#product").val("");
    $("#number").val("");
    d;
}

function productDelete(ctl) {
    if (confirm("Are you sure you want to delete?")) {
        $(ctl).parents("tr").remove();
      } else {
        return;
      }
}

function productBuildTableRow() {
    if($('#product2').val() == '' || $('#number2').val() == ''){
        alert('Product or number can not be left blank');
        return;
     }
    
   const d = new Date();
    // First check if a <tbody> tag exists, add one if not
    if ($("#productTable tbody").length == 0) {
        $("#productTable").append("<tbody></tbody>");
    }

    // Append product to the table
    $("#productTable tbody").append("<tr>" +
        "<td>" + $("#product2").val() + "</td>" +
        "<td>" + $("#number2").val() + "</td>" +
        "<td>" + d + "</td>" + 
        "<td>" +
        "<button type='button' id='editButton' onclick='productDisplay(this);' class='btn btn-default'>" +
        "<span class='glyphicon glyphicon-edit' />" +
        "</button>" +
        "</td>" + 
        "<td>" +
        "<button type='button' onclick='productDelete(this);' class='btn btn-default'>" +
        "<span class='glyphicon glyphicon-remove' />" +
        "</button>" +
        "</td>" +
        "</tr>");
        var modal = document.getElementById("myModal");
        modal.style.display = "none";
}


var _row = null;

_row = $(ctl).parents("tr");

var cols = _row.children("td");

function productDisplay(ctl) {

    // Get the modal
var modal = document.getElementById("myModal");

// When the user clicks the button, open the modal 

modal.style.display = "block";


// When the user clicks on cancel button, close the modal
var button1 = document.getElementById("cancelButton")
button1.onclick = function() {
    modal.style.display = "none";
  }
  

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

_row = $(ctl).parents("tr");
var cols = _row.children("td");
$("#product2").val($(cols[0]).text());
$("#number2").val($(cols[1]).text());
    
}

function productUpdateInTable() {

    // Add changed product to table
    productBuildTableRow();
    
    // Remove old product row
    $(_row).remove();
    
    // Clear form fields
    formClear();

}
