import foodModel from "../models/foodModel.js";
import fs from 'fs'

//add food item

const addFood = async (req,res)=>{
    
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })
      try {
        await food.save();
        res.json({success:true,message:"Food Added"})
      }catch(error){
        console.log(error)
        res.json({success:false,message:"error"})

      }
          
}

//all food list

   const listFood = async (req,res)=>{
       try {
        const food = await foodModel.find({});
        res.json({success:true,data:food})
       } catch (error) {
         console.log(error);
         res.json({success:false,message:"Error"})
       }
   }

   //remove food item

  const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.params.foodId);
    if (!food) return res.status(404).json({ success: false, message: "Food not found" });

    // Delete image file
    fs.unlink(`uploads/${food.image}`, (err) => {
      if (err) console.log("Error deleting file:", err);
    });

    await foodModel.findByIdAndDelete(req.params.foodId);
    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error removing food" });
  }
};

// update food

const updateFood = async(req,res)=>{
      try{
        const food = await foodModel.findById(req.params.foodId);
        if(!food)return res.status(404).json({message:"Food not found"})
        if(req.file){
          fs.unlink(`uploads/${food.image}`,(err)=>{
            if(err) console.log("Error deleting old image:",err)
          })
        food.image= req.file.filename
        }
        food.name = req.body.name || food.name;
        food.category = req.body.category || food.category;
        food.price = req.food.price || food.price;

        await food.save();

        res.json({success:true,message:"Food updated success", data: food})
      }
      catch(error) {
          console.log(error);
          res.status(500).json({success:false,message:"Error updating food",})
      }
}



export {addFood,listFood,removeFood,updateFood}