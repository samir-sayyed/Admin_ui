let tableBody = document.getElementById('table-body');

// initializing ajax request
$.ajax({
    type: "GET",
    url: "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json",
    success: function (response) {
        displayAll(response); // sending response from ajax request to display all function
    }
});


// this funcion take out json details of employee one by one and send it for display
function displayAll(data){
    data.forEach(element =>{
        displayAllDetails(element);
    } )
}

// this function extract details from json and display on ui
function displayAllDetails(data){
    
    let tableRow = document.createElement('tr'); // create one table row element and setting its inner html as json response
    tableRow.id = data.id;
    tableRow.innerHTML = (`
                            <th scope="row"><input type="checkbox" class="select" id = ${data.id}></th> 
                            <td>${data.name}</td>
                            <td>${data.email}</td>
                            <td>${data.role}</td>
                            `)
                            var tableData = document.createElement('td');
                            var button=document.createElement("button");
                            button.innerHTML = `<i class="fas fa-trash"></i>`;
                            button.classList.add('delete-btn')
                            button.id= data.id;
                            button.setAttribute("onclick", "deleteRow(this.id)" );// it will send id of element to delete function
                
                            tableData.appendChild(button);
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
            for(let i = 0; i < 10; i++){       
                select[i].checked = false;
        }
        }

    }


//----------------------logic for deleting one element -----------------------//

function deleteRow(id){ 
    for (let i = 0; i < tableBody.childNodes.length-1; i++) {
      
        if(tableBody.childNodes[i].id == id){
            tableBody.removeChild(tableBody.childNodes[i]);
            console.log("hi");
        }
     
     }  
}


//--------------------------logic for deleting multiple element----------------------//


deleteAllBtn.onclick = () => {
    for(let i = 0; i < select.length; i++){
        if(select[i].checked == true){ // it will check checked box is checked or not
            let id = select[i].id; //if checked then
            deleteRow(id); // it will send id of checked box to delete function
        }
}
    
}

