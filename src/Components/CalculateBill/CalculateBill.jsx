import React, { useState,useEffect } from 'react';
import { products } from '../../assets/products';
import './CalculateBill.css'


const CalculateBill = () => {
  const [selectedName, setSelectedName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const [savedBills, setSavedBills] = useState([]);

const handleAddProduct = () => {
    const product = products.find(p => p.product_name === selectedName);

    if (product && quantity > 0) {
      const existingIndex = selectedItems.findIndex(item => item.product_name === selectedName);

      if (existingIndex !== -1) {
        // Update quantity if product already exists
        const updatedItems = [...selectedItems];
        updatedItems[existingIndex].quantity += quantity;
        updatedItems[existingIndex].total = updatedItems[existingIndex].price * updatedItems[existingIndex].quantity;
        setSelectedItems(updatedItems);
      } else {
        const newItem = {
          ...product,
          quantity,
          total: product.price * quantity,
        };
        setSelectedItems([...selectedItems, newItem]);
      }

      setSelectedName('');
      setQuantity(1);
    }
  };


  const handleSaveBill = () => {
  if (selectedItems.length === 0) return;

  const date = new Date().toLocaleString(); // e.g. "19/07/2025, 10:00 AM"

  const newBill = {
    date,
    items: selectedItems,
    total: selectedItems.reduce((sum, item) => sum + item.total, 0),
  };

  setSavedBills([...savedBills, newBill]);
  setSelectedItems([]); // Clear after saving
  alert("Bill saved successfully!");
};

useEffect(() => {
  const saved = localStorage.getItem('bills');
  if (saved) {
    setSavedBills(JSON.parse(saved));
  }
}, []);

useEffect(() => {
  localStorage.setItem('bills', JSON.stringify(savedBills));
}, [savedBills]);


  

  const handleRemoveProduct = (indexToRemove) => {
    const updated = selectedItems.filter((_, index) => index !== indexToRemove);
    setSelectedItems(updated);
  };

  const handleEditQuantity = (index, newQuantity) => {
    const updatedItems = [...selectedItems];
    updatedItems[index].quantity = newQuantity;
    updatedItems[index].total = newQuantity * updatedItems[index].price;
    setSelectedItems(updatedItems);
  };

  const totalBill = selectedItems.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="bill-container" style={{ padding: '20px' }}>
      <h2>Select a Product</h2>
<div style={{textAlign:"center"}}>
 <select value={selectedName} onChange={(e) => setSelectedName(e.target.value)}>
        <option value="" disabled>Select a product</option>
        {products.map((product, key) => (
          <option key={key} value={product.product_name}>
            {product.product_name}
          </option>
        ))}
      </select>

      <label style={{ marginLeft: '20px' }}>
        Quantity:
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          style={{ marginLeft: '10px', width: '60px' }}
        />
      </label>

      <button onClick={handleAddProduct} className='add-btn'>
        Add to Bill
      </button>
</div>
     


      {/* Selected Products Table */}
      {selectedItems.length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <h3>Bill Summary:</h3>
          <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price (₹)</th>
                <th>Quantity</th>
                <th>Subtotal (₹)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {selectedItems.map((item, index) => (
                <tr key={index}>
                  <td className='items-center'>{item.product_name}</td>
                  <td>{item.price}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleEditQuantity(index, Number(e.target.value))}
                      style={{ width: '60px' }}
                    />
                  </td>
                  <td>{item.total}</td>
                  <td>
                    <button onClick={() => handleRemoveProduct(index)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 style={{ marginTop: '20px' }}>Total Bill: ₹{totalBill}</h3>
        </div>
      )}
      {selectedItems.length>0?<button onClick={handleSaveBill} className='save-btn'>Save Bill</button>:""}
      

      {savedBills.length > 0 && (
  <div style={{ marginTop: '20px' }}>
    <h3>Saved Bills</h3>
    {savedBills.map((bill, i) => (
      <div key={i} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '10px' }}>
        <p><strong>Date:</strong> {bill.date}</p>
        <ul>
          {bill.items.map((item, idx) => (
            <li key={idx}>
              {item.product_name} - Qty: {item.quantity} - ₹{item.total}
            </li>
          ))}
        </ul>
        <p><strong>Total:</strong> ₹{bill.total}</p>
      </div>
    ))}
  </div>
)}

    </div>
    
  );
};

export default CalculateBill;
