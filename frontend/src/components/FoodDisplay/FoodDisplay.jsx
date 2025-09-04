import React, { useContext } from "react"
import { StoreContext } from "../../Context/StoreContext"
import FoodItem from "../FoodItem/FoodItem"
import "./FoodDisplay.css"

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext)

  console.log("Active category:", category)
  food_list.forEach(f => console.log(f.name, "->", f.category))

  return (
    <div className="food-display">
      <h2>{category === "All" ? "All Foods" : category}</h2>
      <div className="food-display-list">
        {food_list
          .filter(
            item =>
              category === "All" ||
              item.category.toLowerCase() === category.toLowerCase()
          )
          .map(item => (
            <FoodItem
              key={item._id}
              id={item._id}
              name={item.name}
              price={item.price}
              description={item.description}
              image={`http://localhost:4000/image/${item.image}`}
            />
          ))}
      </div>
    </div>
  )
}

export default FoodDisplay
