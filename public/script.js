
window.addEventListener('load', initSite);

async function initSite() {
    populate()
    eventListeners()
    deleteSelected()
}

function eventListeners(){ 
    const card = document.getElementsByClassName('container')
    setTimeout(()=> {
        for(const cards of card){cards.addEventListener('click', selectCard)}
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

async function selectCard(event){
    const cards = document.getElementsByClassName('container')
    for(const card of cards){
        if(event.target.id === card.id){
            card.classList.add('highlighted')
            deleteUser(card.id)
        } else {
            card.classList.remove('highlighted')
        }
    }
}

async function deleteUser(id) {
    const deleteUserr = document.getElementById('deleteButton')
    deleteUserr.addEventListener('click', async () => {
        await makeRequest("/api/users/" + id, "DELETE")
        location.reload();
    }) 
}

async function getSpecificUserData(id) {
    const user = await makeRequest("/api/users/" + id, "GET")
    return user
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

