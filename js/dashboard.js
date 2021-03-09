//Dashboard setup 
window.addEventListener('load', (e) => {
    if(fetchData('UserToken').length !== 0){
        fetch(`/users/me?authorization=${fetchData('UserToken')}`).then((response) => response.json()).then((username) => {
            const userId = document.querySelector('#userId')
            const userImage = document.querySelector('#userImage')
            //Set Username
            userId.textContent = username.username.toUpperCase()
            //Set user profile image
            userImage.setAttribute('src', `http://localhost:3000/user/${username.id}/profile`)
        })
    }
})


//Grub the log out buttons and handle the event for logging out
const oneDevice = document.querySelector('#oneDevice')
const allDevices = document.querySelector('#allDevices')

oneDevice.addEventListener('click', (e) => {
    if(fetchData('UserToken').length !== 0){
        location.assign(`/dashboard/logout?authorization=${fetchData('UserToken')}`)
        localStorage.removeItem('UserToken')
    }
})

allDevices.addEventListener('click', (e) => {
    if(fetchData('UserToken').length !== 0){
        location.assign(`/dashboard/logoutall?authorization=${fetchData('UserToken')}`)
        localStorage.removeItem('UserToken')
    }
})

//Process product form data for storage
//Grab the input data from the form of product entry
const serialNumber = document.getElementsByName("serial[]")
const itemDescription = document.getElementsByName("itemDescription[]")
const price = document.getElementsByName("price[]")
const quantity = document.getElementsByName("quantity[]")

elementOnload("#productEntry", 0).then(() => {
    //Grab form for product entry
    const productEntryForm = document.querySelector("#productEntry");

    //Handle the product entry form for data processing and storage
    productEntryForm.addEventListener('submit', (evt) => {
        evt.preventDefault()
        //Fetch each input array from product entry form
        const serialNumArray = productData(serialNumber)
        const itemDesArray = productData(itemDescription)
        const priceArray = productData(price)
        const quantityArray = productData(quantity)

        //Select error message element
        const errorMessage = document.querySelector('#errorMessage')
        errorMessage.setAttribute('class', 'text-danger')

        //intiatilized error message content to empty
        errorMessage.textContent = ''

        //Group the input data into each item
        const formOneData = [serialNumArray[0], itemDesArray[0], priceArray[0], quantityArray[0]]
        const formTwoData = [serialNumArray[1], itemDesArray[1], priceArray[1], quantityArray[1]]
        const formThreeData = [serialNumArray[2], itemDesArray[2], priceArray[2], quantityArray[2]]

        //Check if each item form is filled
        const itemOneFilled = formOneData.every((data) => data !== '')
        const itemTwoFilled = formTwoData.every((data) => data !== '')
        const itemThreeFilled = formThreeData.every((data) => data !== '')

        //Check if all form is not filled and warn or save the data to db
        if(itemOneFilled || itemTwoFilled || itemThreeFilled){
            if(itemOneFilled && itemTwoFilled && itemThreeFilled){

                if(fetchData('UserToken') !== 0){
                    fetch(`/dashboard/me/newproduct?authorization=${fetchData('UserToken')}`, {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify([{
                            serial: formOneData[0],
                            description: formOneData[1],
                            price: formOneData[2],
                            quantity: formOneData[3]
                        },{
                            serial: formTwoData[0],
                            description: formTwoData[1],
                            price: formTwoData[2],
                            quantity: formTwoData[3]
                        },{
                            serial: formThreeData[0],
                            description: formThreeData[1],
                            price: formThreeData[2],
                            quantity: formThreeData[3]
                        }])
                    }).then(response => {
                        if(response.status === 400){
                            return response.json()
                        }else{
                            return response.json()
                        }
                    }).then((product) => {
                        //Display the created product
                        displayProductCreated(product, '#newProduct')
                    }).catch((error) => {
                        console.log(error)
                    })
                }
            }else if(itemOneFilled && itemTwoFilled){

                if(fetchData('UserToken') !== 0){
                    fetch(`/dashboard/me/newproduct?authorization=${fetchData('UserToken')}`, {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify([{
                            serial: formOneData[0],
                            description: formOneData[1],
                            price: formOneData[2],
                            quantity: formOneData[3]
                        },{
                            serial: formTwoData[0],
                            description: formTwoData[1],
                            price: formTwoData[2],
                            quantity: formTwoData[3]
                        }])
                    }).then(response => {
                        if(response.status === 400){
                            return response.json()
                        }else{
                            return response.json()
                        }
                    }).then((product) => {
                        //Display the created product
                        displayProductCreated(product, '#newProduct')
                    }).catch((error) => {
                        console.log(error)
                    })
                }
        
            }else if(itemOneFilled && itemThreeFilled){

                if(fetchData('UserToken') !== 0){
                    fetch(`/dashboard/me/newproduct?authorization=${fetchData('UserToken')}`, {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify([{
                            serial: formOneData[0],
                            description: formOneData[1],
                            price: formOneData[2],
                            quantity: formOneData[3]
                        },{
                            serial: formThreeData[0],
                            description: formThreeData[1],
                            price: formThreeData[2],
                            quantity: formThreeData[3]
                        }])
                    }).then(response => {
                        if(response.status === 400){
                            return response.json()
                        }else{
                            return response.json()
                        }
                    }).then((product) => {
                        //Display the created product
                        displayProductCreated(product, '#newProduct')
                    }).catch((error) => {
                        console.log(error)
                    })
                }
            }else if(itemTwoFilled && itemThreeFilled){

                if(fetchData('UserToken') !== 0){
                    fetch(`/dashboard/me/newproduct?authorization=${fetchData('UserToken')}`, {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify([{
                            serial: formTwoData[0],
                            description: formTwoData[1],
                            price: formTwoData[2],
                            quantity: formTwoData[3]
                        },{
                            serial: formThreeData[0],
                            description: formThreeData[1],
                            price: formThreeData[2],
                            quantity: formThreeData[3]
                        }])
                    }).then(response => {
                        if(response.status === 400){
                            return response.json()
                        }else{
                            return response.json()
                        }
                    }).then((product) => {
                        console.log(product)
                        //Display the created product
                        displayProductCreated(product, '#newProduct')
                    }).catch((error) => {
                        console.log(error)
                    })
                }
            }else if(itemOneFilled){

                if(fetchData('UserToken') !== 0){
                    fetch(`/dashboard/me/newproduct?authorization=${fetchData('UserToken')}`, {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            serial: formOneData[0],
                            description: formOneData[1],
                            price: formOneData[2],
                            quantity: formOneData[3]
                        })
                    }).then(response => {
                        if(response.status === 400){
                            return response.json()
                        }else{
                            return response.json()
                        }
                    }).then((product) => {
                        //Display the created product
                        displayProductCreated(product, '#newProduct')
                    }).catch((error) => {
                        console.log(error)
                    })
                }
            }else if(itemTwoFilled){
                
                if(fetchData('UserToken') !== 0){
                    fetch(`/dashboard/me/newproduct?authorization=${fetchData('UserToken')}`, {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            serial: formTwoData[0],
                            description: formTwoData[1],
                            price: formTwoData[2],
                            quantity: formTwoData[3]
                        })
                    }).then(response => {
                        if(response.status === 400){
                            return response.json()
                        }else{
                            return response.json()
                        }
                    }).then((product) => {
                        //Display the created product
                        displayProductCreated(product, '#newProduct')
                    }).catch((error) => {
                        console.log(error)
                    })
                }
            }else if(itemThreeFilled){

                if(fetchData('UserToken') !== 0){
                    fetch(`/dashboard/me/newproduct?authorization=${fetchData('UserToken')}`, {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            serial: formThreeData[0],
                            description: formThreeData[1],
                            price: formThreeData[2],
                            quantity: formThreeData[3]
                        })
                    }).then(response => {
                        if(response.status === 400){
                            return response.json()
                        }else{
                            return response.json()
                        }
                    }).then((product) => {
                        //Display the created product
                        displayProductCreated(product, '#newProduct')
                    }).catch((error) => {
                        console.log(error)
                    })
                }
            } else {
            errorMessage.textContent = "At least one Item form must be filled"
            }
            
        }
    })
  })

elementOnload("#swapContent").then(function(){
    const swapContentBtn = document.querySelector('#swapContent')

    swapContentBtn.addEventListener('click', (e) => {
        if(fetchData('UserToken') !==0){
            window.location.href = `/dashboard/me/createproduct?authorization=${fetchData('UserToken')}`
        }
    })
}).catch(()=>{
    alert("element did not load in 3 seconds")
})

//Grub the sign up form
const signupForm = document.querySelector('#signupForm')
const userReport = document.querySelector('#userReport')
const signupContainer = document.querySelector('#signupContainer')

//Set the danger arribute of user reports
userReport.setAttribute('class', 'text-danger')

//Listen to sign up form event and handle it for data processing
signupForm.addEventListener('submit', (e) => {
    e.preventDefault()

    //Grub the values
    const username = e.target.elements.username.value
    const password = e.target.elements.password.value
    const repeat = e.target.elements.repeat.value

    userReport.textContent = ''

    if(password.length < 8 || repeat.length < 8){
        userReport.textContent = 'Password must be at least 8 characters'
    }else if(password !== repeat){
        userReport.textContent = 'Passwords do not match'
    }else if(password.toLowerCase().includes('password')){
        userReport.textContent = 'Password must not include the word "password"'
    }else{
        fetch('/users', {
            method: 'post',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        }).then((response) => {
            if(response.status === 201){
                signupContainer.innerHTML = `
                <div class="container-fluid">
                    <div class="row mt-5 ml-3">
                        <div class="col-md-3">
                            <div class="picBox">
                                
                            </div>
                        </div>
                        <div class="col-md-9">
                            <h4 class="display-5">Username</h4>
                            <span class="text-danger" id="username">${username}</span>
                            <h4>Position</h4>
                            <span class="text-danger">Record Manager</span>
                        </div>
                        <div class="col-md-12">
                            <form id="picUploadForm" enctype="multipart/form-data">
                                <div id="uploadReport">
                            
                                </div>
                                <div class="form-group">
                                    <label for="upload">Upload profile picture</label>
                                    <input type="file" name="upload" id="upload" class="form-control-file" required>
                                </div>
                                <button type="submit" class="btn btn-outline-dark">Upload</button>
                                <button id="addAnotherUser" class="btn btn-outline-dark ml-5">Add another user</button>
                            </form>
                        </div>
                    </div>
                </div>`
            }
        }).catch((error) => {
            userReport.textContent = error.message
        })
        
    }

})


//Profile picture processing and storage
//Grab picture upload form and handle it for display and storage

elementOnload('#picUploadForm').then(() => {
    const picUploadForm = document.querySelector('#picUploadForm')
    const addAnotherUser = document.querySelector('#addAnotherUser')

    picUploadForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const formData = new FormData(picUploadForm)
        const username = document.querySelector('#username')
        const uploadReport = document.querySelector('#uploadReport')
        const userPicDiv = document.querySelector('.picBox')
        
        if(fetchData('UserToken').length !== 0){
            fetch(`/upload?authorization=${fetchData('UserToken')}&username=${username.textContent}`, {
                method: 'post',
                body: formData
            }).then((response) => response.json()).then((user) => {
                
                uploadReport.setAttribute('class', 'text-success')
                uploadReport.textContent = 'Profile Updated'

                const img = document.createElement('img')
                img.setAttribute('src', `http://localhost:3000/user/${user.id}/profile`)
                img.setAttribute('class', 'img-thumbnail')
                userPicDiv.appendChild(img)
            }).catch((error) => {
                uploadReport.setAttribute('class', 'text-danger')
                uploadReport.textContent = error.error
            })
        }

    })

    addAnotherUser.addEventListener('click', (e) => {
        e.preventDefault()

        location.href = 'http://localhost:3000/dashboard/adduser'
    })
})

//Grap and handle update user event
elementOnload('#updateUser').then(() => {
    const updateForm = document.querySelector('#updateForm')
    const updateReport = document.querySelector('#updateReport')
    const updateContainer = document.querySelector('#updateUser')

    updateForm.addEventListener('submit', (e) => {
        e.preventDefault()

        const cUsername = e.target.elements.cUsername.value
        const nUsername = e.target.elements.nUsername.value
        const password = e.target.elements.password.value
        const repeat = e.target.elements.repeat.value


        updateReport.textContent = ''

        if(password.length < 8 || repeat.length < 8){
            updateReport.textContent = 'Password must be at least 8 characters'
        }else if(password !== repeat){
            updateReport.textContent = 'Passwords do not match'
        }else if(password.toLowerCase().includes('password')){
            updateReport.textContent = 'Password must not include the word "password"'
        }else{
            if(fetchData('UserToken') !== 0){
                fetch(`/users/me?authorization=${fetchData('UserToken')}&userid=${cUsername}`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: nUsername,
                        password
                    })
                }).then((response) => {
                    if(response.status === 201){
                        updateContainer.innerHTML = `
                        <div class="container-fluid">
                            <div class="row mt-5 ml-3">
                                <div class="col-md-3">
                                    <div class="picBox">
                                        
                                    </div>
                                </div>
                                <div class="col-md-9">
                                    <h4 class="display-5">Username</h4>
                                    <span class="text-danger" id="username">${nUsername}</span>
                                    <h4>Position</h4>
                                    <span class="text-danger">Record Manager</span>
                                </div>
                                <div class="col-md-12">
                                    <form id="picUploadForm" enctype="multipart/form-data">
                                        <div id="uploadReport">
                                    
                                        </div>
                                        <div class="form-group">
                                            <label for="upload">Upload profile picture</label>
                                            <input type="file" name="upload" id="upload" class="form-control-file" required>
                                        </div>
                                        <button type="submit" class="btn btn-outline-dark">Upload</button>
                                        <button id="addAnotherUser" class="btn btn-outline-dark ml-5">Add another user</button>
                                    </form>
                                </div>
                            </div>
                        </div>`
                    }
                }).catch((error) => {
                    updateReport.textContent = error.message
                })
            }
            
        }
    })
})


//Handle removing user activity
elementOnload('#removeUser').then(() => {
    const searchUser = document.querySelector('#searchUser')
    const userInfo = document.querySelector('#userInfo')

    searchUser.addEventListener('submit', (e) => {
        e.preventDefault()

        const searchValue = e.target.elements.search.value

        if(fetchData('UserToken') !== 0){
            fetch(`/users/new?authorization=${fetchData('UserToken')}`, {
               method: 'post',
               headers: {
                   'Content-Type': 'application/json'
               },
               body: JSON.stringify({username: searchValue})
            }).then(response => response.json()).then((response) => {
                if(response.username){
                    userInfo.setAttribute('class', 'text-danger')
                    userInfo.innerHTML = `<b>Do you really want to delete <code id="resName">${response.username}</code></b>
                    <button class="btn btn-outline-dark" id="deleteUser">Yes Delete</button>`
                }
            })
        }
    })
})

elementOnload('#deleteUser').then(() => {
    const deleteUser = document.querySelector('#deleteUser')
    let resName = document.querySelector('#resName')
    const userInfo = document.querySelector('#userInfo')
    resName = resName.textContent
    
    deleteUser.addEventListener('click', () => {
        if(fetchData('UserToken') !== 0){
            fetch(`/dashboard/me/deleteuser?authorization=${fetchData('UserToken')}`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username: resName})
            }).then(response => response.json()).then((response) => {
                userInfo.setAttribute('class', 'text-success')
                userInfo.textContent = response.message
            })
        }
    })
})

//Grap and handle update product activity
let serialNum = undefined
elementOnload('#updateProduct').then(() => {
    const searchProduct = document.querySelector('#searchProduct')
    const productInfo = document.querySelector('#productInfo')

    searchProduct.addEventListener('submit', (e) => {
        e.preventDefault()
        serialNum = e.target.elements.search.value
        
        if(fetchData('UserToken') !== 0){
            fetch(`/dashboard/me/searchproduct?authorization=${fetchData('UserToken')}`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    serial: serialNum
                })
            }).then((response) => response.json().then((product) => {
                //Display product form with filled product data
                prodUpdateForm(product, '#productInfo')

                //Filling the item description input of update form
                elementOnload('#itemDesc').then(() => {
                    const itemDesc = document.querySelector('#itemDesc')

                    itemDesc.textContent = product.description
                })
            }))
        }
    })
})

//Grab product update form and process for product update
elementOnload('#productUpdate').then(() => {
    const updateForm = document.querySelector('#productUpdate')
    const updateReport = document.querySelector('#prodUpdateReport')

    updateForm.addEventListener('submit', (e) => {
        e.preventDefault()

        const description = e.target.elements.itemDescription.value
        const price = e.target.elements.price.value
        const quantity = e.target.elements.quantity.value

        if(description === '' || price === '' || quantity === ''){
            updateReport.setAttribute('class', 'text-warning')
            updateReport.textContent = 'Form must be filled completely'
        }else{
            const update = {
                description,
                price,
                quantity 
            }
            
            if(fetchData('UserToken') !== 0){
                fetch(`/dashboard/me/updateproduct?authorization=${fetchData('UserToken')}&serial=${serialNum}`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(update)
                }).then(response => response.json()).then((product) => {
                    displayProductCreated(product, '#updateProduct')
                })
            }
        }
    })
})

elementOnload("#updateBtn").then(function(){
    const updateBtn = document.querySelector('#updateBtn')

    updateBtn.addEventListener('click', (e) => {
        if(fetchData('UserToken') !==0){
            window.location.href = `/dashboard/me/updateproduct?authorization=${fetchData('UserToken')}`
        }
    })
}).catch(()=>{
    alert("element did not load in 3 seconds")
})

//Handle removing product activity
elementOnload('#removeProduct').then(() => {
    const removeSearch = document.querySelector('#removeSearch')
    const removeProdInfo = document.querySelector('#removeProdInfo')

    removeSearch.addEventListener('submit', (e) => {
        e.preventDefault()

        const searchValue = e.target.elements.search.value
        
        if(fetchData('UserToken') !== 0){
            fetch(`/dashboard/me/removeproduct?authorization=${fetchData('UserToken')}`, {
               method: 'post',
               headers: {
                   'Content-Type': 'application/json'
               },
               body: JSON.stringify({serial: searchValue})
            }).then(response => response.json()).then((product) => {
                if(product.message !== undefined){
                    removeProdInfo.setAttribute('class', 'text-danger')
                    removeProdInfo.innerHTML = `<b>${product.message}</b>
                    `
                }else{
                    removeProdInfo.setAttribute('class', 'text-danger')
                    removeProdInfo.innerHTML = `<b>Do you really want to delete <code id="resName">${product.description}</code></b>
                    <span id="serial" hidden>${product.serial}</span>
                    <button class="btn btn-outline-dark" id="deleteProduct">Yes Delete</button>`
                }
            })
        }
    })
})

elementOnload('#deleteProduct').then(() => {
    const deleteProduct = document.querySelector('#deleteProduct')
    let serial = document.querySelector('#serial')
    const removeProdInfo = document.querySelector('#removeProdInfo')
    serial = serial.textContent
    
    deleteProduct.addEventListener('click', () => {
        if(fetchData('UserToken') !== 0){
            fetch(`/dashboard/me/deleteproduct?authorization=${fetchData('UserToken')}`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({serial})
            }).then(response => response.json()).then((response) => {
                if(response.message === 'deleted'){
                    removeProdInfo.setAttribute('class', 'text-success')
                    removeProdInfo.innerHTML = `Product '<span class="text-danger">${response.product}</span>'
                     is deleted successfully`
                }
            })
        }
    })
})

//Grap and handle Contract form for processing and storage
//New Contract
const contractForm = document.querySelector('#contractForm')
const newContractDiv = document.querySelector('#newContract')

contractForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const formData = {
        clientId: e.target.clientid.value,
        cName: e.target.clientname.value,
        cNumber: e.target.clientnumber.value,
        wName: e.target.witnessname.value,
        wNumber: e.target.witnessnumber.value,
        cResidence: e.target.residence.value,
        cLocation: e.target.location.value,
        cLandmark: e.target.landmark.value,
        status: 'on'
    }

    if(fetchData('UserToken') !== 0){
        fetch(`/dashboard/me/newcontract?authorization=${fetchData('UserToken')}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then(response => response.json()).then(response => {
            if(response.message){
                throw Error(response.message)
            }else{
                const {clientId, cName, cNumber, cLocation, cLandmark, cResidence, wName, wNumber} = response
                newContractDiv.innerHTML = `
                <table class="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Customer ID</th>
                            <th>Customer Name</th>
                            <th>Customer Number</th>
                            <th>Residential Area</th>
                            <th>Location</th>
                            <th>Landmark</th>
                            <th>Witness Name</th>
                            <th>Witness Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Client 1</th>
                            <td>${clientId}</td>
                            <td>${cName}</td>
                            <td>${cNumber}</td>
                            <td>${cLocation}</td>
                            <td>${cLandmark}</td>
                            <td>${cResidence}</td>
                            <td>${wName}</td>
                            <td>${wNumber}</td>
                        </tr>
                    </tbody>
                </table>
                <button class="btn btn-outline-dark" id="updateContract">Update</button>
                <button class="btn btn-outline-dark btn-inline" id="continueBtn">Continue</button>
                `
                localStorage.setItem('ClientID', `${clientId}`)
            }
        }).catch(error => {
            console.log(error.message)
        })
    }
    
    
})

//Handle continue button to take further client information
elementOnload('#continueBtn').then(() =>{
    const continueBtn = document.querySelector('#continueBtn')

    continueBtn.addEventListener('click', () => {
        newContractDiv.innerHTML = `
        <div class="row jumbotron">       
        <div class="col-3">
            <div class="picBox">
            
            </div>
        </div>

        <div class="col-6 my-auto">
        <div class="h4 text-info my-auto">
            <small>Upload Client's picture</small>
        </div> 
            <form id="clientPicForm" enctype="multipart/form-data">
                <div class="input-group mb-3">
                    <div class="custom-file">
                        <input type="file" name="clientimage" id="clientImage" class="custom-file-input">
                        <label for="clientImage" class="custom-file-label">Choose file</label>
                    </div>
            
                    
                </div>
                <button type="submit" class="btn btn-outline-dark">Upload</button>
            </form>
        </div>

    </div>

    <div class="row jumbotron">
        <form id="idCardForm" enctype="multipart/form-data">
            <div class="col-3">
                <div class="form-group">
                    <label for="cardtype">ID card type</label>
                    <select class="form-control" name="cardtype" id="" required>
                        <option value="not specified">Choose ID type</option>
                        <option value="Voter ID">Voter ID</option>
                        <option value="NHIS card">NHIS Card</option>
                        <option value="Driver liences">Driver liences</option>
                        <option value="Passport">Passport</option>
                    </select>
                </div>
            </div>
    
            <div class="col-5 my-auto">
                <div class="h4 text-info my-auto">
                    <small>Upload Client's ID picture</small>
                </div> 
                <div class="picBox1" id="idCardBox">
                    
                </div>
            </div>
    
            <div class="col-4">               
                <div class="input-group mb-3">
                    <div class="custom-file">
                        <input type="file" name="idimage" id="idImage" class="custom-file-input">
                        <label for="idImage" class="custom-file-label">Choose file</label>
                    </div>
                    
                </div>
                <button type="submit" class="btn btn-outline-dark">Upload</button>
            </div>
        </form>
    </div>

    <div class="row jumbotron">         
        <div class="col-3">
            <div class="picBox" id="witnessImage">
            
            </div>
        </div>

        <div class="col-6 my-auto">
        <div class="h4 text-info my-auto">
            <small>Upload Witness's picture</small>
        </div>
            <form id="witnessImageForm" enctype="multipart/form-data">
                <div class="input-group mb-3">
                    <div class="custom-file">
                        <input type="file" name="witnessimage" id="witnessImage" class="custom-file-input">
                        <label for="witnessImage" class="custom-file-label">Choose file</label>
                    </div>
                
                    
                </div>
                <button type="submit" class="btn btn-outline-dark">Upload</button>
            </form>
        </div>

    </div>

    <div class="row jumbotron">
        <div class="col-12 m-auto">
            <button id="continueBtn2" class="btn btn-outline-dark">Continue</button>
        </div>
    </div>
        `
    })
})

//Process Client picture information
elementOnload('#clientPicForm').then(() => {
    const clientPicForm = document.querySelector('#clientPicForm')
    const clientPicBox = document.querySelector('.picBox')

    clientPicForm.addEventListener('submit', (e) => {
        e.preventDefault()

        const formData = new FormData(clientPicForm)

        if(fetchData('UserToken') !== 0 && fetchData('ClientID') !== 0){
            fetch(`/dashboard/me/client/picture?authorization=${fetchData('UserToken')}&clientid=${fetchData('ClientID')}`, {
                method: 'post',
                body: formData
            }).then(response => response.json()).then(client => {
                if(client.message){
                    throw Error(client.message)
                }else{
                    const {clientId} = client
                    const img = document.createElement('img')

                    img.setAttribute('class', 'img-thumbnail')
                    img.setAttribute('src', `http://localhost:3000/client/${clientId}/picture`)
                    
                    clientPicBox.appendChild(img)
                }
            }).catch(e => {
                console.log(e.message)
            })
        }
    })
})

//Process client's ID informantion
elementOnload('#idCardForm').then(() => {
    const idCardForm = document.querySelector('#idCardForm')
    const idCardBox = document.querySelector('#idCardBox')

    idCardForm.addEventListener('submit', (e) => {
        e.preventDefault()

        const formData = new FormData(idCardForm)

        if(fetchData('UserToken') !== 0 && fetchData('ClientID') !== 0){
            fetch(`/dashboard/me/client/id?authorization=${fetchData('UserToken')}&clientid=${fetchData('ClientID')}`,{
                method: 'post',
                body: formData
            }).then(response => response.json()).then(client => {
                if(client.message){
                    throw Error(client.message)
                }

                const img = document.createElement('img')
                const {clientId} = client

                img.setAttribute('class', 'img-thumbnail')
                img.setAttribute('src', `http://localhost:3000/client/${clientId}/id`)
                idCardBox.appendChild(img)
            }).catch(e => {
                console.log(e.message)
            })
        }
    })
})

//Processing witness picture information
elementOnload('#witnessImageForm').then(() => {
    const witnessImageForm = document.querySelector('#witnessImageForm')
    const witnessImage = document.querySelector('#witnessImage')

    witnessImageForm.addEventListener('submit', (e) => {
        e.preventDefault()

        const formData = new FormData(witnessImageForm)

        if(fetchData('UserToken') !== 0 && fetchData('ClientID') !== 0){
            fetch(`/dashboard/me/client/witness/picture?authorization=${fetchData('UserToken')}&clientid=${fetchData('ClientID')}`,{
                method: 'post',
                body: formData
            }).then(response => response.json()).then(client => {
                if(client.message){
                    throw Error(client.message)
                }

                const {clientId} = client
                const img = document.createElement('img')

                img.setAttribute('class', 'img-thumbnail')
                img.setAttribute('src', `http://localhost:3000/witness/${clientId}/picture`)
                witnessImage.appendChild(img)
                
            }).catch(e => {
                console.log(e.message)
            })
        }
    })
})

elementOnload('#continueBtn2').then(() => {
    const continueBtn = document.querySelector('#continueBtn2')

    continueBtn.addEventListener('click', () => {
        //localStorage.removeItem('ClientID')

        newContractDiv.innerHTML = `
        <form id="itemsOnCredit" enctype="multipart/form-data">
            <div id="errorMessage">

            </div>
            <div class="row mx-4">
                <div class="col-md-4">
                    <div class="form-group">
                        <p class="text-center">
                            <small>Item One</small>
                        </p>
                        <label class="text-dark text-center display-5" for="serialOne">Serial number</label>
                        <input type="number" name="cSerial[]" placeholder="Serial no." id="serialOne" class="form-control">
                    </div>
                    <div class="form-group">
                        <label class="text-dark text-center display-5" for="itemOne">Item Description</label>
                        <textarea name="cItem[]" placeholder="Enter Item Description here" id="itemOne" cols="10" rows="10" class="form-control"></textarea>
                    </div>
                    <div class="form-group">
                        <label class="text-dark text-center" for="priceOne">Price</label>
                        <input type="number" name="cPrice[]" placeholder="0.00" id="priceOne" class="form-control">
                    </div>
                    <div class="form-group">
                        <label class="text-dark text-center" for="quantityOne">Quantity</label>
                    <input type="number" name="cQuantity[]" placeholder="Quantity" id="quantityOne" class="form-control quantity">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <p class="text-center">
                            <small>Item Two</small>
                        </p>
                        <label class="text-dark text-center display-5" for="serialTwo">Serial number</label>
                        <input type="number" name="cSerial[]" placeholder="Serial no." id="serialTwo" class="form-control">
                    </div>
                    <div class="form-group">
                        <label class="text-dark text-center display-5" for="itemTwo">Item Description</label>
                        <textarea name="cItem[]" placeholder="Enter Item Description here" id="itemTwo" cols="10" rows="10" class="form-control"></textarea>
                    </div>
                    <div class="form-group">
                        <label class="text-dark text-center" for="priceTwo">Price</label>
                        <input type="number" name="cPrice[]" placeholder="0.00" id="priceTwo" class="form-control">
                    </div>
                    <div class="form-group">
                        <label class="text-dark text-center" for="quantityTwo">Quantity</label>
                        <input type="number" name="cQuantity[]" placeholder="Quantity" id="quantityTwo" class="form-control quantity">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <p class="text-center">
                            <small>Item Three</small>
                        </p>
                        <label class="text-dark text-center display-5" for="serialThree">Serial number</label>
                        <input type="number" name="cSerial[]" placeholder="Serial no." id="serialThree" class="form-control">
                    </div>
                    <div class="form-group">
                        <label class="text-dark text-center display-5" for="itemThree">Item Description</label>
                        <textarea name="cItem[]" placeholder="Enter Item Description here" id="itemThree" cols="10" rows="10" class="form-control"></textarea>
                    </div>
                    <div class="form-group">
                        <label class="text-dark text-center" for="priceThree">Price</label>
                        <input type="number" name="cPrice[]" placeholder="0.00" id="priceThree" class="form-control">
                    </div>
                    <div class="form-group">
                        <label class="text-dark text-center" for="quantityThree">Quantity</label>
                        <input type="number" name="cQuantity[]" placeholder="Quantity" id="quantityThree" class="form-control quantity">
                    </div>
                </div>
            </div>
            <div class="row mx-4">
                <div class="col">
                    <div class="form-group">
                        <label for="totalAmount">Total Amount</label>
                        <input type="number" readonly name="total" value="0.00" id="totalAmount" class="form-control-plaintext">
                    </div>
                </div>
                <div class="col">
                    <div class="form-group">
                        <label for="depositAmount">Deposit</label>
                        <input type="number" name="deposit" id="depositAmount" placeholder="Enter client's deposit" class="form-control">
                    </div>
                </div>
                <div class="col">
                    <div class="form-group">
                        <label for="amountLeft">Balance</label>
                        <input type="number" readonly name="balance" value="0.00" id="amountLeft" class="form-control-plaintext">
                    </div>
                </div>
                <div class="col">
                    <label for="signedOn">Date of Agreement</label>
                    <input type="datetime-local" name="signedon" id="signedOn" class="form-control">
                </div>
            </div>
            <div class="row">
                <div class="col">
                <button type="submit" class="btn btn-outline-dark ml-2">Save</button>
                </div>
            </div>
    </form>
        `
    })
})

//Process items on credit form and send it to the server
elementOnload('#itemsOnCredit').then(() => {
    const itemsOnCredit = document.querySelector('#itemsOnCredit')
    const errorMessage = document.querySelector('#errorMessage')
    // const priceOne = document.querySelector('#priceOne')
    // const priceTwo = document.querySelector('#priceTwo')
    // const priceThree = document.querySelector('#priceThree')
    // const quantityOne = document.querySelector('#quantityOne')
    // const quantityTwo = document.querySelector('#quantityTwo')
    // const quantityThree = document.querySelector('#quantityThree')

    
    const totalAmountEl = document.querySelector('#totalAmount')
    const depositEl = document.querySelector('#depositAmount')
    const balanceEl = document.querySelector('#amountLeft')
    const signedOnEl = document.querySelector('#signedOn')

    const serialEls = document.getElementsByName('cSerial[]')
    const itemEls = document.getElementsByName('cItem[]')
    const priceEls = document.getElementsByName('cPrice[]')
    const quantityEls = document.getElementsByName('cQuantity[]')

    //Search product by serial and display in product form
    serialEls.forEach((serialEl, index) => {
        serialEl.addEventListener('blur', () => {
            const serial = eachInputValue(serialEls, index)
            if(fetchData('UserToken') !== 0){
                fetch(`/dashboard/me/searchproduct?authorization=${fetchData('UserToken')}`,{
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({serial})
                }).then((response) => response.json()).then((product) => {
                    if(product.message){
                        throw Error(product.message)
                    }

                    itemEls[index].value        = product.description
                    priceEls[index].value       = product.price
                    
                }).catch((error) => {
                    console.log(error.message)
                })
            }
        })
    })

    //Calculate and update Total amount input field
    quantityEls.forEach((quantityEl, index) => {
        quantityEl.addEventListener('blur', () => {
            const quantity  = eachInputValue(quantityEls, index)
            const price     = eachInputValue(priceEls, index)
            const totalAmt     = totalAmountEl.value
            
            totalAmountEl.value = parseInt(totalAmt) + parseInt(quantity) * parseInt(price)
        })
    })

    //Calculate and update balance
    depositEl.addEventListener('blur', () => {
        const initialAmt    = depositEl.value
        const totalAmt      = totalAmountEl.value
        balanceEl.value       = parseInt(totalAmt) - parseInt(initialAmt)
        console.log({
            initialAmt,
            totalAmt
        })
    })

    const docs = []
    quantityEls.forEach((quantityEl, index) => {
        quantityEl.addEventListener('blur', () => {
            if(fetchData('ClientID') !== 0){
                const serialNumber = eachInputValue(serialEls, index)
                const items = eachInputValue(itemEls, index)
                const quantity = eachInputValue(quantityEls, index)
                const price = eachInputValue(priceEls, index)
                const clientId = fetchData('ClientID')
    
                docs.push({
                    serialNumber,
                    items,
                    quantity,
                    price,
                    clientId
                })
            }
        })
    })

    itemsOnCredit.addEventListener('submit', (e) => {
        e.preventDefault()

        if(fetchData('UserToken') !== 0 && fetchData('ClientID')){
            fetch(`/dashboard/me/client/items?authorization=${fetchData('UserToken')}`,{
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(docs)
            }).then((response) => {
                if(response.status === 400){
                    throw Error('Bad request')
                }

                const total = totalAmountEl.value
                const deposit = depositEl.value
                const balance = balanceEl.value
                const signedOn = signedOnEl.value
                return fetch(`/dashboard/me/client/purchase/accounts?authorization=${fetchData('UserToken')}&clientid=${fetchData('ClientID')}`,{
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        total,
                        deposit,
                        balance,
                        signedOn
                    })
                })
            }).then(response => response.json()).then((clientData) => {
                if(clientData.message){
                    throw Error('Bad request')
                }
            
                const {client, items} = clientData
                const {
                    clientId,
                    cNumber,
                    cName,
                    cImage,
                    cResidence,
                    cLocation,
                    cLandmark,
                    clientIdType,
                    clientIdImage,
                    wName,
                    wNumber,
                    wImage,
                    deposit,
                    total,
                    balance,
                    signedOn,
                    status
                } = client

                newContractDiv.innerHTML = `
                <div class="row">
                <!--Main client information display-->
                <div class="col jumbotron">
                    <div class="col-3">
                        <div class="picBox" id="clientImage">
                    
                        </div>
                    </div>
                    <div class="col-9">
                        <table class="table">
                            <tbody>
                                <tr>
                                    <th>Client Name:</th>
                                    <td>${cName}</td>
                                </tr>
                                <tr>
                                    <th>ID Number:</th>
                                    <td>${clientId}</td>
                                </tr>
                                <tr>
                                    <th>Contact</th>
                                    <td>${cNumber}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
        
                <!--ID Card and place of living of client information display-->
                <div class="col jumbotron">
                    <div class="col-5">
                        <div class="picBox1" id="idCardBox">
                            
                        </div>
                    </div>
                    <div class="col-7">
                        <table class="table">
                            <tbody>
                                <tr>
                                    <th>ID Card Type</th>
                                    <td>${clientIdType}</td>
                                </tr>
                                <tr>
                                    <th>Location</th>
                                    <td>${cLocation}</td>
                                </tr>
                                <tr>
                                    <th>Residence</th>
                                    <td>${cResidence}</td>
                                </tr>
                                <tr>
                                    <th>Landmark</th>
                                    <td>${cLandmark}</td>
                                </tr>
                                <tr>
                                    <th>Satus</th>
                                    <td>${status}</td>
                                </tr>
                                <tr>
                                    <th>Date:</th>
                                    <td>${signedOn}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
        
                    <!--Witness information display-->
                    <div class="col jumbotron">
                        <div class="col-3">
                            <div class="picBox" id="witnessImage">
                        
                            </div>
                        </div>
                        <div class="col-9">
                            <table class="table">
                                <tbody>
                                    <tr>
                                        <th>Witness Name:</th>
                                        <td>${wName}</td>
                                    </tr>
                                    <tr>
                                        <th>Witness Number:</th>
                                        <td>${wNumber}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
        
                    <!--Items purchased information-->
                    <div class="col jumbotron">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Serial Number</th>
                                    <th>Item</th>
                                    <th>Quantity</th>
                                    <th>Price (Ghc)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                ${
                                    items.forEach((items) => {
                                        
                                    })
                                }
                                    <td>233445</td>
                                    <td>Air Conditioner</td>
                                    <td>40</td>
                                    <td>2000</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
        
                    <!--Product accounts information display-->
                    <div class="col jumbotron">
                        <table class="table">
                            <tbody>
                                <tr>
                                    <th>Total Amount:</th>
                                    <td>Ghc 5000.00</td>
                                </tr>
                                <tr>
                                    <th>Initial Payment:</th>
                                    <td>Ghc 2500.00</td>
                                </tr>
                                <tr>
                                    <th>Amount Remaining</th>
                                    <td>Ghc 2500.00</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
                `
                
            }).catch(e => {
                console.log(e.message)
            })
        }
    })
})