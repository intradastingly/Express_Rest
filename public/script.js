

window.addEventListener('load', initSite);

async function initSite() {
    showData()
    eventListeners()
    /* getSpecificUserData('5682c6dc-779d-4752-a4cd-a94110afce2a') */
   /*  
    const UserData = await getSpecificUserData('b59a594e-a244-4819-8d8b-a7fc74261014') */
    /* const deleted = await deleteUser('f58bd98d-8856-467f-b619-fe1588bdc174')
    const allData = await getAlluserData() */
    /* const stuff = await saveNewUser("asaf", 'haha', 'w') */
    /*
    console.log(UserData)
    console.log(stuff) */
    /* console.log(allData)
    console.log(deleted) */
}

let selected = false;

function eventListeners(){    
    const card = document.getElementsByClassName('container')
    card.onclick = selectCard;
}


async function showData() {
    const allData = await makeRequest("/api/users", "GET")
    for(const user of allData){
        const userDiv = document.getElementById('allData')
        const containerDiv = document.createElement('div');
        const name = document.createElement('p');
        const email = document.createElement('p');
        const status = document.createElement('p');
        containerDiv.className = 'container'
        name.innerHTML = user.name;
        email.innerHTML = user.email;
        status.innerHTML = user.status;
        containerDiv.appendChild(name)
        containerDiv.appendChild(email)
        containerDiv.appendChild(status)
        userDiv.appendChild(containerDiv)    
    }
}



function selectCard(){
    console.log('test')
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

async function deleteUser(id) {
    const deleteButton = document.getElementById('')
    const deleted = await makeRequest("/api/users/" + id, "DELETE")
    return deleted
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

