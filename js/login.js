const elLoginForm = document.querySelector('.login__form');
const elLoginMailInput = document.querySelector('.login__email-input');
const elLoginPasswordInput = document.querySelector('.login__password-input');

elLoginForm.addEventListener('submit', (evt)=>{
    evt.preventDefault();

    const emailValue = elLoginMailInput.value.trim();
    const passwordValue = elLoginPasswordInput.value.trim();

    fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(
            {
                "email": emailValue,
                "password": passwordValue,
            }
        ),
    }).then(response => response.json()).then(data=>{
        if(data?.token){
            window.localStorage.setItem('token', data.token);
            window.location.replace('index.html')
        }
    })

})