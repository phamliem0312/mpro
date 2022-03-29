function gw_gui_test_function() {
  console.log("test_function");
}

function gw_gui_random_string(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function gw_gui_logout() {
  gw_gui_call_api('GET', '/api/user/logout', null, null, function(status, data, xhr){
    if('success' == status) {
      window.location.href = '/login';
    }
    else {
      console.log(data);
    }
    document.cookie = 'access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  });
}

function gw_gui_table_onclick(table_id, callback) {
  let table = document.getElementById(table_id);
  let cells = table.getElementsByTagName('td');

  for (let i = 0; i < cells.length; i++) {
    let cell = cells[i];
    cell.onclick = function () {
      let rowId = this.parentNode.rowIndex;
      let rowsNotSelected = table.getElementsByTagName('tr');
      for (let row = 1; row < rowsNotSelected.length; row++) {
        rowsNotSelected[row].style.backgroundColor = "";
        rowsNotSelected[row].style.color = "black";
        // rowsNotSelected[row].classList.remove('fis');
      }
      let rowSelected = table.getElementsByTagName('tr')[rowId];
      rowSelected.style.backgroundColor = "#029bd8";
      rowSelected.style.color = "white";
      // rowSelected.classList.add('fis');
      callback(rowSelected);
      // msg = 'The ID of the company is: ' + rowSelected.cells[1].innerHTML;
      // msg += '\nThe cell value is: ' + this.innerHTML;
      // alert(msg);
    }
  }
}

function gw_gui_call_api(type_input, url_input, data_input, header_input, callback) {
  if (null === header_input || undefined === header_input || '' == header_input) {
    header_input = {
      'Content-Type': 'application/json'
    };
  }
  if (null === data_input || undefined === data_input || '' == header_input) {
    data_input = '';
  }
  if(typeof data_input === 'object') {
    data_input = JSON.stringify(data_input);
  }
  // console.log("header_input: ", header_input);
  console.log("url_input: ", url_input);
  console.log("data_input: ", data_input);
  console.log("header_input: ", url_input);
  $.ajax({
    headers: header_input,
    data: data_input,
    success: function (data, status, xhr) {
      callback(status, data, xhr)
    },
    error: function (xhr, status, err) {
      console.log("error: ", status, xhr);
      callback(status, err, xhr)
    },
    processData: false,
    // dataType:"text",
    type: type_input,
    url: url_input
  });
}