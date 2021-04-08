

window.addEventListener('load', initSite);

async function initSite() {
    console.log('init')
    /* getSpecificUserData('5682c6dc-779d-4752-a4cd-a94110afce2a') */
    const allData = await getAlluserData()
    const UserData = await getSpecificUserData('b59a594e-a244-4819-8d8b-a7fc74261014')
    const deleted = await getSpecificUserData('5682c6dc-779d-4752-a4cd-a94110afce2a')
    const stuff = await saveNewUser("asaf", 'haha', 'w')
    console.log(allData)
    console.log(UserData)
    console.log(stuff)
    console.log(deleted)
}

async function getAlluserData() {
    const userData = await makeRequest("/api/users", "GET")
    return userData
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

