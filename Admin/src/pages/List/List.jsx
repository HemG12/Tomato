import React, { useEffect, useState } from 'react'
import './List.css'
import axios from "axios"

const List = () => {
  const url = "https://tomato-dbv5.onrender.com"
  const [list, setList] = useState([]);
  const [editingFood, setEditingFood] = useState(null);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`)
    if (response.data.success) {
      setList(response.data.data)
    } else {
      console.log("Error fetching list");
    }
  }

  const removeFood = async (foodId) => {
    try {
      const response = await axios.delete(`${url}/api/food/remove/${foodId}`);
      if (response.data.success) {
        console.log("Food removed successfully");
        await fetchList();
      } else {
        console.log("Error removing food");
      }
    } catch (error) {
      console.error("Error in removeFood:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { _id, name, category, price } = editingFood;
      const response = await axios.put(`${url}/api/food/update/${_id}`, {
        name,
        category,
        price,
      });
      if (response.data.success) {
        console.log("Food updated successfully");
        setEditingFood(null); // close form
        fetchList(); // refresh
      }
    } catch (error) {
      console.error("Error updating food:", error);
    }
  };

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className='list add flex-col'>
      <p>All Foods list</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Actions</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className='list-table-format'>
              <img src={`${url}/image/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <div>
                <button onClick={() => setEditingFood(item)}>✎ Edit</button>
                <button onClick={() => removeFood(item._id)}>❌ Delete</button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Edit Form */}
      {editingFood && (
        <div className="edit-form">
          <h3>Edit Food</h3>
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              value={editingFood.name}
              onChange={(e) => setEditingFood({ ...editingFood, name: e.target.value })}
              placeholder="Food Name"
              required
            />
            <input
              type="text"
              value={editingFood.category}
              onChange={(e) => setEditingFood({ ...editingFood, category: e.target.value })}
              placeholder="Category"
              required
            />
            <input
              type="number"
              value={editingFood.price}
              onChange={(e) => setEditingFood({ ...editingFood, price: e.target.value })}
              placeholder="Price"
              required
            />
            <button type="submit">Update</button>
            <button type="button" onClick={() => setEditingFood(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  )
}

export default List
