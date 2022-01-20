window.onload = function (){
    initValues();
}

let url = 'http://localhost:8080/api/users';

async function getAuthUser(){
    let urlAuth = 'http://localhost:8080/api/auth_user';
    let responseAuth = await fetch(urlAuth);
    let userAuth = await responseAuth.json();

    return JSON.stringify(userAuth);
}

async function initValues(){

    let urlAuth = 'http://localhost:8080/api/auth_user';
    let responseAuth = await fetch(urlAuth);
    let userAuth = await responseAuth.json();

    let header_user_auth_email = document.getElementById("header_user_auth_email");
    header_user_auth_email.innerHTML = userAuth.email;

    let header_user_auth_roleList = document.getElementById("header_user_auth_roleList");
    let roleList = userAuth.roleList;
    for(let i = 0; i < roleList.length; i++){
        let rowRole = document.createElement('li');
        rowRole.appendChild(document.createTextNode(roleList[i].roleName.replace("ROLE_", "")))
        header_user_auth_roleList.appendChild(rowRole)
    }

    let response = await fetch(url);
    let commits = await response.json(); // читаем ответ в формате JSON
    for(var i = 0; i < commits.length; i++){
        addRow(commits[i]);
    }
}



async function initUserInfo() {
    let urlAuth = 'http://localhost:8080/api/auth_user';
    let responseAuth = await fetch(urlAuth);
    let userAuth = await responseAuth.json();

    let id = userAuth.id;
    let urlAuth2 = 'http://localhost:8080/api/users/'+id;
    let responseAuth2 = await fetch(urlAuth2);
    let userAuth2 = await responseAuth2.json();

    document.getElementById("auth_user_id").innerHTML = userAuth2.id;
    document.getElementById("auth_user_Firstname").innerHTML = userAuth2.firstName;
    document.getElementById("auth_user_Lastname").innerHTML = userAuth2.lastName;
    document.getElementById("auth_user_Age").innerHTML = userAuth2.age;
    document.getElementById("auth_user_Email").innerHTML = userAuth2.email;
    let auth_user_roles = document.getElementById("auth_user_roles");

    auth_user_roles.innerHTML = ''
    let roleList = userAuth2.roleList;
    for(let i = 0; i < roleList.length; i++){
        let rowRole = document.createElement('li');
        rowRole.appendChild(document.createTextNode(roleList[i].roleName.replace("ROLE_", "")))
        auth_user_roles.appendChild(rowRole)
    }

}

function updateInfoAuthUser(authUserJson){

    alert("here")

    let userAuth = JSON.parse(authUserJson);


    document.getElementById("auth_user_id").innerHTML = userAuth.id;
    document.getElementById("auth_user_Firstname").innerHTML = userAuth.firstName;
    document.getElementById("auth_user_Lastname").innerHTML = userAuth.lastName;
    document.getElementById("auth_user_Age").innerHTML = userAuth.age;
    document.getElementById("auth_user_Email").innerHTML = userAuth.email;

    let header_user_auth_email = document.getElementById("header_user_auth_email");
    header_user_auth_email.innerHTML = userAuth.email;

    let auth_user_roles = document.getElementById("auth_user_roles");
    let header_user_auth_roleList = document.getElementById("header_user_auth_roleList");

    header_user_auth_roleList.innerHTML = '';
    auth_user_roles.innerHTML = '';

    let roleList = userAuth.roleList;

    for(let i = 0; i < roleList.length; i++){
        let rowRole = document.createElement('li');
        rowRole.appendChild(document.createTextNode(roleList[i].roleName.replace("ROLE_", "")))
        header_user_auth_roleList.appendChild(rowRole)
        auth_user_roles.appendChild(rowRole)
    }
}

function addRow(obj){
    var tbody = document.getElementById('myTable').getElementsByTagName("TBODY")[0];
    var row = document.createElement("TR")
    row.setAttribute("id", "row"+obj.id);
    var td1 = document.createElement("TD")
    td1.appendChild(document.createTextNode(obj.id))
    var td2 = document.createElement("TD")
    td2.appendChild (document.createTextNode(obj.firstName))
    var td3 = document.createElement("TD")
    td3.appendChild (document.createTextNode(obj.lastName))
    var td4 = document.createElement("TD")
    td4.appendChild (document.createTextNode(obj.age))
    var td5 = document.createElement("TD")
    td5.appendChild (document.createTextNode(obj.email))
    var td6 = document.createElement("TD")
    // td6.appendChild (document.createTextNode(obj.roleList[0].roleName+''))
    var td7 = document.createElement("TD")
    var td8 = document.createElement("TD")
    // td8.appendChild (document.createTextNode('Delete'))


    let listRoles = document.createElement('ul');
    listRoles.id = 'listRoles'+obj.id;
    listRoles.className = "hr"

    for(var i = 0; i < obj.roleList.length; i++){
        var rowRole = document.createElement('li');
        rowRole.className = "hr"
        rowRole.setAttribute("role-id", obj.roleList[i].id)
        rowRole.setAttribute("roleName", obj.roleList[i].roleName)
        rowRole.appendChild(document.createTextNode(obj.roleList[i].roleName.replace("ROLE_", "")))
        listRoles.appendChild(rowRole)
    }

    let btn = document.createElement("button");
    btn.innerHTML = "edit";
    btn.type = "submit";
    btn.className="btn btn-info";
    btn.name = "formBtn";
    btn.setAttribute("data-bs-toggle", "modal");
    btn.setAttribute("data-bs-target", "#exampleModal");

    btn.setAttribute("data-bs-rowIndex", "row"+obj.id);
    btn.id="button"+obj.id;
    btn.setAttribute("data-bs-id", obj.id);
    btn.setAttribute("data-bs-firstname", obj.firstName);
    btn.setAttribute("data-bs-lastname", obj.lastName);
    btn.setAttribute("data-bs-age", obj.age);
    btn.setAttribute("data-bs-email", obj.email);
    btn.setAttribute("data-bs-buttonId", btn.id)
    btn.setAttribute("data-bs-roleList", JSON.stringify(obj.roleList))

    let btnDelete = document.createElement("button");
    btnDelete.innerHTML = "delete";
    btnDelete.type = "submit";
    btnDelete.className="btn btn-danger";
    btnDelete.name = "delButton";
    btnDelete.setAttribute("data-bs-toggle", "modal");
    btnDelete.setAttribute("data-bs-target", "#exampleModalDelete");

    btnDelete.setAttribute("data-bs-rowIndex", "row"+obj.id);
    btnDelete.id="buttonDelete"+obj.id;
    btnDelete.setAttribute("data-bs-id", obj.id);
    btnDelete.setAttribute("data-bs-firstname", obj.firstName);
    btnDelete.setAttribute("data-bs-lastname", obj.lastName);
    btnDelete.setAttribute("data-bs-age", obj.age);
    btnDelete.setAttribute("data-bs-email", obj.email);
    btnDelete.setAttribute("data-bs-buttonId", btnDelete.id)
    btnDelete.setAttribute("data-bs-roleList", JSON.stringify(obj.roleList))

    td6.appendChild(listRoles)
    td7.appendChild(btn)
    td8.appendChild(btnDelete)

    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);
    row.appendChild(td4);
    row.appendChild(td5);
    row.appendChild(td6);
    row.appendChild(td7);
    row.appendChild(td8);
    tbody.appendChild(row);
}

var exampleModal = document.getElementById('exampleModal')
exampleModal.addEventListener('show.bs.modal', async function (event) {
    // Button that triggered the modal
    var button = event.relatedTarget
    // Extract info from data-bs-* attributes
    // var recipient = button.getAttribute('data-bs-whatever')
    let urlRoles = 'http://localhost:8080/api/roles';
    let responseRoles = await fetch(urlRoles);
    let allRoles = await responseRoles.json(); // читаем ответ в формате JSON

    var indexRow = button.getAttribute('data-bs-rowIndex')
    var id = button.getAttribute('data-bs-id')
    var firstname = button.getAttribute('data-bs-firstname')
    var lastname = button.getAttribute('data-bs-lastname')
    var age = button.getAttribute('data-bs-age')
    var email = button.getAttribute('data-bs-email')
    var password = button.getAttribute('data-bs-password')
    var buttonId = button.getAttribute('data-bs-buttonId')
    var roleListJSON = button.getAttribute('data-bs-roleList')
    // If necessary, you could initiate an AJAX request here
    // and then do the updating in a callback.
    //
    // Update the modal's content.
    var modalTitle = exampleModal.querySelector('.modal-title')
    // var modalBodyInput = exampleModal.querySelector('.modal-body input')
    // var modalh4= exampleModal.querySelector('.modal-body h4')

    var buttonEdit= exampleModal.querySelector('.btn-primary')
    var modalIdInput = exampleModal.querySelector('.userId input')
    var modalFirstnameInput = exampleModal.querySelector('.userFirstname input')
    var modalLastnameInput = exampleModal.querySelector('.userLastname input')
    var modalAgeInput = exampleModal.querySelector('.userAge input')
    var modalEmailInput = exampleModal.querySelector('.userEmail input')
    var modalPasswordInput = exampleModal.querySelector('.userPassword input')
    var modalRolesSelector = exampleModal.querySelector('.userRolelist select')

    modalTitle.textContent = 'Edit user'

    modalIdInput.value = id
    modalFirstnameInput.value = firstname
    modalLastnameInput.value = lastname
    modalAgeInput.value = age
    modalEmailInput.value = email
    modalPasswordInput.value = password

    for(var i = 0; i < allRoles.length; i++){
        var text = allRoles[i].roleName.replace("ROLE_", "");
        // получаем значение для элемента
        var value = JSON.stringify(allRoles[i]);
        // создаем новый элемента
        var newOption = new Option(text, value);
        newOption.selected = roleListJSON.includes(JSON.stringify(allRoles[i]))

        modalRolesSelector.options[i] = newOption;
    }

    buttonEdit.onclick = async function (){
        if(validateEditUser()){
            var myModalEl = document.getElementById('butClose');
            myModalEl.click();
            var options = modalRolesSelector.selectedOptions;
            var values = Array.from(options).map(({ value }) => value);
            var roleList ='['+values+']'
            updateRow(indexRow, buttonId, id, modalFirstnameInput.value, modalLastnameInput.value, modalAgeInput.value, modalEmailInput.value, modalPasswordInput.value, roleList)
        }
    };
})

async function updateUser(){

}

var exampleModalDelete = document.getElementById('exampleModalDelete')
exampleModalDelete.addEventListener('show.bs.modal', async function (event) {
    // Button that triggered the modal
    var button = event.relatedTarget
    // Extract info from data-bs-* attributes
    // var recipient = button.getAttribute('data-bs-whatever')
    let urlRoles = 'http://localhost:8080/api/roles';
    let responseRoles = await fetch(urlRoles);
    let allRoles = await responseRoles.json(); // читаем ответ в формате JSON

    var indexRow = button.getAttribute('data-bs-rowIndex')
    var id = button.getAttribute('data-bs-id')
    var firstname = button.getAttribute('data-bs-firstname')
    var lastname = button.getAttribute('data-bs-lastname')
    var age = button.getAttribute('data-bs-age')
    var email = button.getAttribute('data-bs-email')
    var password = button.getAttribute('data-bs-password')
    var buttonId = button.getAttribute('data-bs-buttonId')
    var roleListJSON = button.getAttribute('data-bs-roleList')

    // If necessary, you could initiate an AJAX request here
    // and then do the updating in a callback.
    //
    // Update the modal's content.
    var modalTitle = exampleModalDelete.querySelector('.modal-title')
    // var modalBodyInput = exampleModal.querySelector('.modal-body input')
    // var modalh4= exampleModal.querySelector('.modal-body h4')

    var buttonEdit= exampleModalDelete.querySelector('.btn-primary')
    var modalIdInput = exampleModalDelete.querySelector('.userId input')
    var modalFirstnameInput = exampleModalDelete.querySelector('.userFirstname input')
    var modalLastnameInput = exampleModalDelete.querySelector('.userLastname input')
    var modalAgeInput = exampleModalDelete.querySelector('.userAge input')
    var modalEmailInput = exampleModalDelete.querySelector('.userEmail input')
    var modalPasswordInput = exampleModalDelete.querySelector('.userPassword input')
    var modalRolesSelector = exampleModalDelete.querySelector('.userRolelist select')

    modalTitle.textContent = 'Delete user'

    modalIdInput.value = id
    modalFirstnameInput.value = firstname
    modalLastnameInput.value = lastname
    modalAgeInput.value = age
    modalEmailInput.value = email

    // let user = {};
    // user.id = id;
    // user.firstName = firstname;
    // user.lastName = lastname;
    // user.age = age;
    // user.email = email;
    // user.password = password;
    // user.roleList = roleList;

    // modalPasswordInput.value = password

    for(var i = 0; i < allRoles.length; i++){
        var text = allRoles[i].roleName.replace("ROLE_", "");
        // получаем значение для элемента
        var value = JSON.stringify(allRoles[i]);
        // создаем новый элемента
        var newOption = new Option(text, value);
        newOption.selected = roleListJSON.includes(JSON.stringify(allRoles[i]))

        modalRolesSelector.options[i] = newOption;
    }


    buttonEdit.onclick = async function (){
      deleteRow(indexRow, id);
    };
})

async function updateRow(indexRow, buttonId, id, firstname, lastname, age, email, password, roleListJSON){
    document.getElementById(indexRow).cells[1].innerHTML = firstname;
    document.getElementById(indexRow).cells[2].innerHTML = lastname;
    document.getElementById(indexRow).cells[3].innerHTML = age;
    document.getElementById(indexRow).cells[4].innerHTML = email;

    var roleList = JSON.parse(roleListJSON);

    var ul = document.getElementById('listRoles'+id);
    ul.innerHTML = '';

    for(var j = 0; j < roleList.length; j++){
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(roleList[j].roleName.replace("ROLE_", "")));
        ul.appendChild(li);
    }

    document.getElementById(buttonId).setAttribute("data-bs-firstname", firstname)
    document.getElementById(buttonId).setAttribute("data-bs-lastname", lastname)
    document.getElementById(buttonId).setAttribute("data-bs-age", age)
    document.getElementById(buttonId).setAttribute("data-bs-email", email)
    document.getElementById(buttonId).setAttribute("data-bs-roleList", roleListJSON)

    document.getElementById('buttonDelete'+id).setAttribute("data-bs-firstname", firstname)
    document.getElementById('buttonDelete'+id).setAttribute("data-bs-lastname", lastname)
    document.getElementById('buttonDelete'+id).setAttribute("data-bs-age", age)
    document.getElementById('buttonDelete'+id).setAttribute("data-bs-email", email)
    document.getElementById('buttonDelete'+id).setAttribute("data-bs-roleList", roleListJSON)


    let user = {};
    user.id = id;
    user.firstName = firstname;
    user.lastName = lastname;
    user.age = age;
    user.email = email;
    user.password = password;
    user.roleList = roleList;

    const response = await fetch('http://localhost:8080/api/users', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    });

    let authUserJSON = getAuthUser();
    let authUser = JSON.parse(await authUserJSON);

    let userAuth = await response.json();

    if(authUser.id+'' === user.id+''){


        let header_user_auth_email = document.getElementById("header_user_auth_email");
        header_user_auth_email.innerHTML = userAuth.email;


        let header_user_auth_roleList = document.getElementById("header_user_auth_roleList");

        header_user_auth_roleList.innerHTML = '';


        let roleList = userAuth.roleList;

        for(let i = 0; i < roleList.length; i++){
            let rowRole = document.createElement('li');
            let rowRole2 = document.createElement('li');
            rowRole.appendChild(document.createTextNode(roleList[i].roleName.replace("ROLE_", "")))
            rowRole2.appendChild(document.createTextNode(roleList[i].roleName.replace("ROLE_", "")))
            header_user_auth_roleList.appendChild(rowRole)

        }
    }
}

async function deleteRow(rowId, id){
   var row = document.getElementById(rowId);
   row.parentElement.removeChild(row);

    const response = await fetch('http://localhost:8080/api/users/'+id, {
        method: 'DELETE'
    });
}

async function setSelect(){
    let urlRoles = 'http://localhost:8080/api/roles';
    let responseRoles = await fetch(urlRoles);
    let allRoles = await responseRoles.json();

    var modalRolesSelector = document.getElementById('roles1');
    for(var i = 0; i < allRoles.length; i++){
        var text = allRoles[i].roleName.replace("ROLE_", "");
        // получаем значение для элемента
        var value = JSON.stringify(allRoles[i]);
        // создаем новый элемента
        var newOption = new Option(text, value);

        modalRolesSelector.options[i] = newOption;
    }

    var modalAgeInput = document.getElementById('age')
    modalAgeInput.value = 0;

}

function validateAddUser(){
    var modalFirstnameInput = document.getElementById('Firstname').value;
    if(modalFirstnameInput.length===0){
        alert('Поле Firstname не должно быть пустым')
        return false;
    }
    var modalLastnameInput = document.getElementById('Lastname').value;
    if(modalLastnameInput.length === 0){
        alert('Поле Lastname не должно быть пустым')
        return false;
    }
    var modalAgeInput = document.getElementById('age');
    if(modalAgeInput.value === ''){
        alert('Поле Age не должно быть пустым')
        return false;
    }
    var modalEmailInput = document.getElementById('Email');
    if(modalEmailInput.value === ''){
        alert('Поле Email не должно быть пустым')
        return false;
    }
    var modalPasswordInput = document.getElementById('Password');
    if(modalPasswordInput.value === ''){
        alert('Поле Password не должно быть пустым')
        return false;
    }
    var modalRolesSelector = document.getElementById('roles1');
    var options = modalRolesSelector.selectedOptions;
    if(options.length === 0){
        alert('Должна быть выбрана хотябы одна роль!')
        return false;
    }

    return true;
}

function validateEditUser(){
    var modalFirstnameInput = document.getElementById('Firstname_edit').value;
    if(modalFirstnameInput.length===0){
        alert('Поле Firstname не должно быть пустым')
        return false;
    }
    var modalLastnameInput = document.getElementById('Lastname_edit').value;
    if(modalLastnameInput.length === 0){
        alert('Поле Lastname не должно быть пустым')
        return false;
    }
    var modalAgeInput = document.getElementById('age_edit');
    if(modalAgeInput.value === ''){
        alert('Поле Age не должно быть пустым')
        return false;
    }
    var modalEmailInput = document.getElementById('Email_edit');
    if(modalEmailInput.value === ''){
        alert('Поле Email не должно быть пустым')
        return false;
    }
    // var modalPasswordInput = document.getElementById('Password_edit');
    // if(modalPasswordInput.value === ''){
    //     alert('Поле Password не должно быть пустым')
    //     return false;
    // }
    var modalRolesSelector = document.getElementById('roles');
    var options = modalRolesSelector.selectedOptions;
    if(options.length === 0){
        alert('Должна быть выбрана хотябы одна роль!')
        return false;
    }

    return true;
}

async function addUser(){
        // alert("zero")
    var modalFirstnameInput = document.getElementById('Firstname');
    var modalLastnameInput = document.getElementById('Lastname');
    var modalAgeInput = document.getElementById('age');
    var modalEmailInput = document.getElementById('Email');
    var modalPasswordInput = document.getElementById('Password');
    var modalRolesSelector = document.getElementById('roles1');

    var options = modalRolesSelector.selectedOptions;
    var values = Array.from(options).map(({ value }) => value);
    var roleListJSON ='['+values+']';
    var roleList = JSON.parse(roleListJSON);


    var user = {}
    user.firstName = modalFirstnameInput.value;
    user.lastName = modalLastnameInput.value;
    user.age = modalAgeInput.value;
    user.email = modalEmailInput.value;
    user.password = modalPasswordInput.value;
    user.roleList = roleList;

    let response = await fetch('http://localhost:8080/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    });

    let commit = await response.json();
    addRow(commit);

    modalFirstnameInput.value = null;
    modalLastnameInput.value = null;

    var section1 = document.getElementById("home");
    var vkladka1 = document.getElementById('home-tab');

    var vkladka2 = document.getElementById('profile-tab');
    var section2 = document.getElementById("profile");

    vkladka2.className= "nav-link"
    section2.className = "tab-pane fade";
    vkladka1.className="nav-link active";
    section1.className = "tab-pane fade show active";


}
