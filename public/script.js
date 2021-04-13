
window.addEventListener('load', initSite);

function initSite() {
    populate()
    eventListeners()
    modal()
}

function eventListeners(){ 
    const card = document.getElementsByClassName('container')
    const buttons = document.getElementsByClassName('button')
    for(const button of buttons){ button.addEventListener('click', modal) }
    setTimeout(()=> {
        for(const cards of card){ cards.addEventListener('click', selectCard) }
    }, 50) 
}

async function populate() {
    const allData = await makeRequest("/api/users", "GET")
    allData.map(i => {
        const userDiv = document.getElementById('allData')
        const containerDiv = document.createElement('div');
        const name = document.createElement('li');
        const email = document.createElement('li');
        const status = document.createElement('li');
        containerDiv.className = 'container';
        containerDiv.id = i.id;
        name.innerHTML = "name: " + i.name;
        email.innerHTML = "email: " + i.email;
        status.innerHTML = "status: "+ i.status;
        containerDiv.appendChild(name)
        containerDiv.appendChild(email)
        containerDiv.appendChild(status)
        userDiv.appendChild(containerDiv)    
    })
}

function selectCard(event){
    const cards = document.getElementsByClassName('container')
    for(const card of cards){
        if(event.target.id === card.id){
            card.classList.add('highlighted')
            deleteUser(card.id)
            update(card.id)
        } else {
            card.classList.remove('highlighted')
        }
    }
}

function modal(event){
    if(event.target === undefined) {return null};
    const editView = document.getElementById('editUser')
    const newView = document.getElementById('newUser')
    event.target.id === "editButton" ? editView.style.display = "flex" : editView.style.display = "none";
    event.target.id === "update" ? newView.style.display = "flex" : newView.style.display = "none";
}

function deleteUser(id) {
    const deleteUserr = document.getElementById('deleteButton')
    deleteUserr.addEventListener('click', async () => {
        await makeRequest("/api/users/" + id, "DELETE")
        location.reload();
    }) 
}

async function update(id){
    const allData = await makeRequest("/api/users", "GET")
    const editUser = document.getElementById('editUserForm')
    for(const data of allData){
            if(data.id === id){
            editUser.name.value = data.name
            editUser.email.value = data.email
            editUser.status.value = data.status
        }
    }
    editUser.action = `/api/users/${id}`;
    editUser.onsubmit = async () => {
        await updateUserData(id, editUser.name.value, editUser.email.value, editUser.status.value) 
        location.reload();
    }
}

async function getSpecificUserData(id) {
    const user = await makeRequest("/api/users/" + id, "GET")
    return user
}

async function updateUserData(id, name, email, status){
    const body = {
        name: name,
        email: email,
        status: status
    }
    const updatedData = await makeRequest("/api/users/" + id, "PUT", body)
    return updatedData
}

async function saveNewUser(name, email, dead) {
    const body = {
        name: name,
        email: email,
        status: dead
    }
    const stuff = await makeRequest("/api/users", "POST", body)
    return stuff
}

async function makeRequest(url,method,body){
    const response = await fetch(url, {
        method: method,
        body: JSON.stringify(body),
        headers: {
            'Content-type': 'application/json'
        }
    })
    const result = await response.json()
    return result
}

function formSubmit(){
    setTimeout(function(){window.location.reload();},10);
}

