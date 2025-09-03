import React, { useEffect, useState } from 'react'
import './List.css'
import axios from "axios"

const List = () => {

  const url = "http://localhost:4000"
  const [list, setList] = useState([]);

  const fetchList = async ()=> {
    const response = await axios.get(`${url}/api/food/list`)
    console.log(response.data);
    if (response.data.success){
      setList(response.data.data)
    }
    else{
      console.log("Error");
    }
  }

  const removeFood = async (foodId)=>{
    console.log(foodId)
  const response = await axios.delete(`http://localhost:4000/api/food/romove${id}`)
  await fetchList(); 
  }

  useEffect(()=>{
    fetchList()
  },[])

  return (
    <div className='list add flex-col'>
      <p>All Foods list</p>
      <div className="list-table">
        <div className="list-table-format title">
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b>Action</b>
        </div>
        {list.map((item,index)=>{
           return (
            <div key={index}className='list-table-format'>
              <img src={`${url}/image/`+item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={()=>removeFood(item._id)}>X</p>
            </div>
           )
        })}
      </div>
      
    </div>
  )
}

export default List
