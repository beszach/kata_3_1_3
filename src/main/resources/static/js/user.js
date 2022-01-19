window.onload = function (){
    initValues();
}

async function initValues(){
    let urlAuth = 'http://localhost:8080/api/auth_user';
    let responseAuth = await fetch(urlAuth);
    let userAuth = await responseAuth.json();

    document.getElementById("auth_user_id").innerHTML = userAuth.id;
    document.getElementById("auth_user_Firstname").innerHTML = userAuth.firstName;
    document.getElementById("auth_user_Lastname").innerHTML = userAuth.lastName;
    document.getElementById("auth_user_Age").innerHTML = userAuth.age;
    document.getElementById("auth_user_Email").innerHTML = userAuth.email;
    let auth_user_roles = document.getElementById("auth_user_roles");
    let roleList = userAuth.roleList;
    for(let i = 0; i < roleList.length; i++){
        let rowRole = document.createElement('li');
        rowRole.appendChild(document.createTextNode(roleList[i].roleName.replace("ROLE_", "")))
        auth_user_roles.appendChild(rowRole)
    }

    let header_user_auth_email = document.getElementById("header_user_auth_email");
    header_user_auth_email.innerHTML = userAuth.email;

    let header_user_auth_roleList = document.getElementById("header_user_auth_roleList");
    for(let i = 0; i < roleList.length; i++){
        let rowRole = document.createElement('li');
        rowRole.appendChild(document.createTextNode(roleList[i].roleName.replace("ROLE_", "")))
        header_user_auth_roleList.appendChild(rowRole)
    }
}