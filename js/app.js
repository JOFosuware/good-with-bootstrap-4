

const loginEl = document.querySelector('#login')
const formEl = document.querySelector('#login-form')
const userReport = document.querySelector('#userReport')

//Style user report 
userReport.setAttribute('class', 'text-danger')

//listen and handle login in button
loginEl.addEventListener('click', (e) => {
    e.preventDefault()
    loginEl.setAttribute('class', 'btn btn-dark btn-lg btn-center d-none')
    formEl.setAttribute('class', 'col-md-4 form-center')
})

formEl.addEventListener('submit',(e) => {
    e.preventDefault()
    const username = e.target.elements.username.value
    const password = e.target.elements.password.value 
    const html = document.querySelector('html')

    userReport.textContent = ''

    if(username === '' || password === ''){
        userReport.textContent = 'Form must be filled completely'
    }else if(password.length < 8){
        userReport.textContent = 'Your password must be a least 8 characters'
    }else{
        fetch('/login', {
            method: 'post',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        }).then((response) => response.json()).then((data) => {
            if(data.message === 'User found'){
                //Save token to browser storage
                localStorage.setItem('UserToken', JSON.stringify(data.token))
                //Redirect the user to the dashboard
                location.assign(`/dashboard?authorization=${data.token}`)
            }

            userReport.textContent = data.error
        }).catch((e) => {
            userReport.textContent = e.message
        })
       
    
    }    
})