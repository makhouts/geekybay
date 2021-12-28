import React from 'react'

export const AddProduct = () => {
    return (
        <div>
            <input type="text" name='productName' placeholder='Product Name' />
            <input type="text" name='productDescription' placeholder='Product Description' />          
            <input type="text" name='price' placeholder='Price' />       
            <input type="text" name='inStock' placeholder='Stock' value='999' />       
            <input type="text" name='visible' placeholder='Visible' />       
            <input type="text" name='shipping' placeholder='Free shipping?' />   
            <br />
            <label htmlFor="">Image</label>    
            <input type="file" multiple/>
        </div>
    )
}
