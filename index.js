let tableBody = document.getElementById('table-body');

// initializing ajax request
$.ajax({
    type: "GET",
    url: "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json",
    error: function( error){ 
        console.log("Error in fecting data from API", error); // if api fails it will show error to user
        displayAll(null); //it will send null argument to display fun. then it will visible no data found gif.
            },
    success: function (response) {
        displayAll(response); // sending response from ajax request to display all function
    }
});



// this funcion take out json details of employee one by one and send it for display
function displayAll(data){

    //if error in fetching data it shows user data not found gif
    if(data == null){
        var noDataFoundImage = document.createElement('img');
        noDataFoundImage.setAttribute(
            "style", "height:60%; width: 70%; ; margin-left:300px; margin-top:50px; "
            );

        noDataFoundImage.src = "assets/error.gif";
        tableBody.appendChild(noDataFoundImage);
    }

    // if data found it will send data to display on page
    data.forEach(element =>{
        displayAllDetails(element);
    } );
   
}

// this function extract details from json and display on ui
function displayAllDetails(data){
    
    let tableRow = document.createElement('tr'); // create one table row element and setting its inner html as json response
    tableRow.id = data.id;
    tableRow.innerHTML = (`
                            <td scope="row" style= "text-align: left; padding-left:10px;"><input type="checkbox" class="select" id = ${data.id}"></td> 
                            <td id = "name${data.id}">${data.name}</td>
                            <td id = "email${data.id}">${data.email}</td>
                            <td id = "role${data.id}">${data.role}</td>
                            `)
                            var tableData = document.createElement('td');
                            var delButton=document.createElement("button");
                            delButton.innerHTML = `<i class="fas fa-trash"></i>`;
                            delButton.classList.add('delete-btn');
                            delButton.id= data.id;
                            delButton.setAttribute("onclick", "deleteRow(this.id)" );// it will send id of element to delete function
                            
                            // creating button for editing data
                            var editButton=document.createElement("button");
                            editButton.innerHTML = `<i class="fas fa-edit"></i>`;
                            editButton.classList.add('delete-btn');
                            editButton.classList.add('edit-btn');
                            editButton.id= data.id;
                            editButton.setAttribute("onclick", "editData(this.id)" )

                            tableData.appendChild(editButton);
                            tableData.appendChild(delButton);
                            tableRow.appendChild(tableData);

    tableBody.appendChild(tableRow); // adding all details to existing table


    // this will add search and sort facility to our table i used jquery tabledata cdn 
    $(document).ready( function () {
        $('#data-table').DataTable();
    } );

}

//-----------------logic for selecting all by clicking on selct all button -------------------//

const selectAllBtn = document.getElementById('select-all');
const select = document.getElementsByClassName('select');
const deleteAllBtn = document.getElementById('delete-all-btn');

    selectAllBtn.onclick = ()=> {
        if(selectAllBtn.checked == true){   // when we click on select all button it will run a loop on all 
            for(let i = 0; i < select.length; i++){  //checkboxes and make them checked
                    select[i].checked = true;
            }
        }else{
            for(let i = 0; i < select.length; i++){       
                select[i].checked = false;
            }
        }

    };



//----------------------logic for deleting one element -----------------------//

function deleteRow(id){ 
    for (let i = tableBody.childNodes.length-1; i >= 0; i--) {
        if(tableBody.childNodes[i].id == id){
            tableBody.removeChild(tableBody.childNodes[i]);
        }    
     }  
}


//--------------------------logic for deleting multiple element----------------------//

deleteAllBtn.onclick = () => {
     for(let i = select.length-1; i >= 0; i--){
         if(select[i].checked == true){ // it will check checked box is checked or not
            let id = select[i].id; //if checked then
            deleteRow(id); // it will send id of checked box to delete function      
        }
    }
    
}


//------------------------------------logic for edit one element-----------------------------------------------//
const editBox = document.getElementById('edit-box');

function editData(id){ 

    // pushing existing data of employee in edit box
    const name = document.getElementById("name" + id);
    const email = document.getElementById("email" + id);
    const role = document.getElementById("role" + id);
    $('#edit-name').val(name.innerText);
    $('#edit-email').val(email.innerText);
    $('#edit-role').val(role.innerText);

     // this will visible the edit box on screen
     editBox.style.height = '350px';
     editBox.style.width = '350px';
     editBox.style.display = 'flex';

     //purpose of this function is send id of eplopyee whose data to be edited to create new element
     //funtion so we can edit same employee details multiple times
     appendNewData(id)

}


//this function create new element with updated data and replace it with old one
function appendNewData(id){

    document.getElementById('submit-changes-btn').onclick = ()=>{
        const tableRow  = document.createElement('tr');
        tableRow.id = id;
        
        // creating new element with updated employee details
        tableRow.innerHTML = (`
                                    <th scope="row" style= "text-align: left;"><input type="checkbox" class="select" id = ${id}></th> 
                                    <td id = "name${id}">${$('#edit-name').val()}</td>
                                    <td id = "email${id}">${$('#edit-email').val()}</td>
                                    <td id = "role${id}">${$('#edit-role').val()}</td>
                                    `)
    
    
                                    var tableData = document.createElement('td');
                                    var delButton=document.createElement("button");
                                    delButton.innerHTML = `<i class="fas fa-trash"></i>`;
                                    delButton.classList.add('delete-btn');
                                    delButton.id=id;
                                    delButton.setAttribute("onclick", "deleteRow(this.id)" );// it will send id of element to delete function
                                    
                                    // creating button for editing data
                                    var editButton=document.createElement("button");
                                    editButton.innerHTML = `<i class="fas fa-edit"></i>`;
                                    editButton.classList.add('delete-btn');
                                    editButton.classList.add('edit-btn');
                                    editButton.id= id;
                                    editButton.setAttribute("onclick", "editData(this.id)" )
    
                                    tableData.appendChild(editButton);
                                    tableData.appendChild(delButton);
                                    tableRow.appendChild(tableData);            
       
    
        
    // we are fetching the element whose data to be edited and when found we replace it with newly created data element
        for (let i = tableBody.childNodes.length-1; i >= 0; i--) {
            if(tableBody.childNodes[i].id == id){ 
                tableBody.replaceChild(tableRow,tableBody.childNodes[i]);
                
            }    
         }
         
         // this will hide the edit box again
         editBox.style.height = '0px';
         editBox.style.width = '0px';
         editBox.style.display = 'none';
    }

};

