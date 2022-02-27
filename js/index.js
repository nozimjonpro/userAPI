const logoutBtn = document.querySelector('.log-out')
const token = window.localStorage.getItem('token');
const elUserList = document.querySelector('.users__list');
const elUserTemplate = document.querySelector('#users-template').content;



if(!token){
    window.location.replace('login.html')
}

logoutBtn.addEventListener('click', (evt)=>{
    window.localStorage.removeItem('token');
    window.location.replace('index.html')
})

fetch("https://jsonplaceholder.typicode.com/users")
.then(response=>response.json())
.then(data=>{
        getUsers(data, elUserList)
})


elUserList.addEventListener('click', (evt)=>{
    if(evt.target.matches('.user__post-btn')){
        const userId = evt.target.dataset.userId;

        window.localStorage.setItem('userId', userId);

        window.location.replace('posts.html')
    }
})



function getUsers(array, node){
    node.innerHTML = null;
    const userFragment = document.createDocumentFragment()
    array.forEach(user => {
        const userTemplate = elUserTemplate.cloneNode(true);
        userTemplate.querySelector('.user__name').textContent = 'Fullname:' +' '+ user.name;
        userTemplate.querySelector('.username').textContent = user.username;
        userTemplate.querySelector('.user__email').textContent = user.email;
        userTemplate.querySelector('.user__street').textContent ='Street:' + ' ' + user.address.street;
        userTemplate.querySelector('.user__suite').textContent = 'Suite:' + ' ' + user.address.suite;
        userTemplate.querySelector('.user__city').textContent = 'City:' + ' ' + user.address.city;
        userTemplate.querySelector('.user__zipcode').textContent = 'Zipcode:' + ' ' + user.address.zipcode;
        userTemplate.querySelector('.user__latitude').textContent = 'lap:' + ' ' + user.address.geo.lat;
        userTemplate.querySelector('.user__longtitude').textContent = 'lng:' + ' ' + user.address.geo.lng;
        userTemplate.querySelector('.user__phone').textContent = 'Phone:' +' '+ user.phone;
        userTemplate.querySelector('.user__website').textContent = 'Email:' + ' ' +  user.website;
        userTemplate.querySelector('.user__company-name').textContent = 'Company:'+ ' ' + user.company.name;
        userTemplate.querySelector('.user__catch-phrase').textContent = user.company.catchPhrase;
        userTemplate.querySelector('.user__bachelor-science').textContent = user.company.bs;
        userTemplate.querySelector('.user__post-btn').dataset.userId = user.id;
        userFragment.appendChild(userTemplate)
    });
    
    node.appendChild(userFragment)
}

