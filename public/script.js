window.addEventListener('load', initSite);

let selected = false;

function initSite() {
    populate()
    eventListeners()
    modal()
}

//add true false boolean to edit and expand 
function eventListeners(){ 
    const card = document.getElementsByClassName('container')
    const buttons = document.getElementsByClassName('button')
    const expand = document.getElementById('expandButton')
    expand.addEventListener('click', expandData)
    for(const button of buttons){ button.addEventListener('click', modal) }
    setTimeout(()=> {
        for(const cards of card){ cards.addEventListener('click', selectCard) }
    }, 50) 
}

async function populate() {
    const allData = await makeRequest("/api/users", "GET")
    allData.map(i => {
        const userDiv = document.getElementById('allData')
        const img = document.createElement('img')
        const containerDiv = document.createElement('div');
        const textContainerDiv = document.createElement('div');
        const name = document.createElement('li');
        const status = document.createElement('li');
        containerDiv.className = 'container';
        textContainerDiv.className = 'textContainerDiv';
        containerDiv.id = i.id;
        img.src = i.url;
        img.className = "container-image";
        name.innerHTML = "Name: " + i.name;
        status.innerHTML = "Status: "+ i.status;
        containerDiv.appendChild(img)
        textContainerDiv.appendChild(name)
        textContainerDiv.appendChild(status)
        containerDiv.appendChild(textContainerDiv)
        userDiv.appendChild(containerDiv)    
    })
}

function selectCard(event){
    const cards = document.getElementsByClassName('container');
    const deselect = document.getElementById("new");
    const close = document.getElementById("close")
    for(const card of cards){
            deselect.addEventListener('click', () => {
                selected = false;
                card.classList.remove('highlighted');
            });
            close.addEventListener('click', () => card.classList.remove('highlighted'))
        if(event.target.id === card.id){
            selected = true;
            card.classList.add('highlighted');
            deleteUsers(card.id);
            updateSelected(card.id);
            getSpecificUserData(card.id);
        } else {
            card.classList.remove('highlighted');
        }
    }
};

function modal(event){
    const editView = document.getElementById('editUser')
    const newView = document.getElementById('newUser')
    if(selected){
        event.target.id === "editButton" 
        ? editView.style.display = "flex" 
        : editView.style.display = "none";
    }
    event.target.id === "new" ? newView.style.display = "flex" : newView.style.display = "none";
}

function deleteUsers(id) {
    const deleteUsers = document.getElementById('deleteButton')
    deleteUsers.addEventListener('click', async () => {
        await makeRequest("/api/users/" + id, "DELETE")
        location.reload();
        selected = false;
    }) 
}

async function updateSelected(id){
    const allData = await makeRequest("/api/users", "GET")
    const editUser = document.getElementById('editUserForm')
    const editingTitle = document.getElementById('editing')
     
    for(const data of allData){
            if(data.id === id){
                editingTitle.innerHTML = "Editing: " + data.name;
                editUser.name.value = data.name;
                editUser.appeared.value = data.appeared;
                editUser.status.value = data.status;
                editUser.url.value = data.url;
                editUser.description.value = data.description;
        }
    }
    editUser.action = `/api/users/${id}`;
    editUser.onsubmit = async () => {
        await updateUserData(
            id, 
            editUser.name.value, 
            editUser.appeared.value, 
            editUser.status.value, 
            editUser.url.value, 
            editUser.description.value
            ) 
        location.reload();
        selected = false;
    }
}

function expandData(){
    if(selected){
        const expand = document.getElementById('expand');
        const close = document.getElementById('close');
        expand.style.display = "flex";
        close.addEventListener('click', () => {
            expand.style.display = "none";
            selected = false;
        })
    }
}

async function getSpecificUserData(id) {
    const meme = await makeRequest("/api/users/" + id, "GET")
    if(selected){
        meme.map(i => {
            const img = document.getElementById('exImg');
            const name = document.getElementById('exName');
            const appeared = document.getElementById('exEmail');
            const status = document.getElementById('exStatus');
            const description = document.getElementById('exDescription');
            img.src = i.url
            name.innerHTML = "Name: " + i.name;
            appeared.innerHTML = "First appeared: " + i.appeared;
            status.innerHTML = "Status: " + i.status;
            description.innerHTML = "Description: " + i.description; 
        }) 
    } 
    return meme
}

async function updateUserData(id, name, appeared, status, url, description){
    const body = {
        name: name,
        appeared: appeared,
        status: status,
        url: url,
        description: description
    }
    const updatedData = await makeRequest("/api/users/" + id, "PUT", body)
    return updatedData
}

async function saveNewUser(name, appeared, status, url, description) {
    const body = {
        name: name,
        appeared: appeared,
        status: status,
        url: url,
        description: description
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

