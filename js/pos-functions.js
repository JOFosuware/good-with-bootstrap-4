//Fetch user from local storage
const fetchData = (key) => {
    const data = localStorage.getItem(key)

    if(data !== null){
        return JSON.parse(data)
    }else{
        return []
    }
}

/**
 * Wait for an element before resolving a promise
 * @param {String} querySelector - Selector of element to wait for
 * @param {Integer} timeout - Milliseconds to wait before timing out, or 0 for no timeout              
 */
function elementOnload(querySelector, timeout=0){
    const startTime = new Date().getTime();
    return new Promise((resolve, reject)=>{
        const timer = setInterval(()=>{
            const now = new Date().getTime();
            if(document.querySelector(querySelector)){
                clearInterval(timer);
                resolve();
            }else if(timeout && now - startTime >= timeout){
                clearInterval(timer);
                reject();
            }
        }, 100);
    });
}

//Generating product list in table
function createProductList(docs, querySelector){
    let itemsArray = []

    for (let index = 0; index < docs.length; index++) {
        let prodNum = `Product ${index + 1}`
        const items = docs[index]

        if(docs.length > 3){
            prodNum = 'Product 1'
            if(index === 0){
                itemsArray[index] = prodNum
                continue
            }

            itemsArray[index] = docs[index]
            if(index === 4) break
            
        }else{
            
            itemsArray = [prodNum,items.serial, items.description, items.price, items.quantity]
            const nodes = itemsArray.map((item) => {
            const td = document.createElement('td')
            td.textContent = item
            return td
            })

            const tr = document.createElement('tr')
            const tbody = document.querySelector(querySelector)
            tr.append(...nodes)
            tbody.appendChild(tr)
            itemsArray = []
        }
    }

    if(itemsArray.length === 5){
        const nodes = itemsArray.map((item) => {
        const td = document.createElement('td')
        td.textContent = item
        return td
        })

        const tr = document.createElement('tr')
        const tbody = document.querySelector(querySelector)
        tr.append(...nodes)
        tbody.appendChild(tr)
    }
}

//function to swap the content of new product section
const displayProductCreated = (product, querySelector) => {
    const newProduct = document.querySelector(querySelector)
    
    if(typeof product === "object"){
        const itemArray = Object.values(product)
        newProduct.innerHTML = `
        <div class="table-responsive" id="entryReview">
            <table class="table">
                <caption>Products Created</caption>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Serial no.</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                    </tr>
                </thead>
                <tbody id="productList">
                    
                </tbody>
            </table>
        </div>
        <button class="btn btn-outline-dark" id="swapContent">New Product</button>
        <button class="btn btn-outline-dark" id="updateBtn">Update Product</button>
        `
        elementOnload('#productList', 0).then(function(){
            createProductList(itemArray, '#productList')
        })
    }

}



//Grab individual value from the product entry form into an array
const productData = (nodeList) => {
    let data = []
    for (let count = 0; count < nodeList.length; count++) {
        data[count] = nodeList[count].value
    }

    return data
}

//Generating product update form with filled product data
const prodUpdateForm = (product, querySelector) => {
    const updateForm = document.querySelector(querySelector)

    updateForm.innerHTML =  `
    <form class="col-md-6" id="productUpdate">
    <em class="text-info" id="prodUpdateReport">Change the values to update the product</em>
        <div class="form-group">
            <label class="text-dark text-center display-5" for="itemDescription">Item Description</label>
            <textarea name="itemDescription" id="itemDesc" placeholder="Enter Item Description here" cols="10" rows="10" class="form-control"></textarea>
        </div>
        <div class="form-group">
            <label class="text-dark text-center" for="price">Price</label>
            <nodeList type="number" name="price" value="${product.price}" placeholder="0.00" class="form-control">
        </div>
        <div class="form-group">
            <label class="text-dark text-center" for="quantity">Quantity</label>
            <nodeList type="number" name="quantity" value="${product.quantity}" placeholder="Quantity" class="form-control">
        </div>
        <button type="submit" class="btn btn-outline-dark">Continue</button>
    </form>
    `
}

//Extract an input value from the element by index
const eachInputValue = (els, index) => {
    const values = productData(els)
    return values[index]
}