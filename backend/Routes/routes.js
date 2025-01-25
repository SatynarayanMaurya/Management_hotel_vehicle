const express = require("express");
const { SignupValidator, loginValidator } = require("../Controller/validator");
const { signup, login } = require("../Controller/auth.controller");
const { authMiddleware } = require("../Middleware/auth.middleware");
const { addHotel, getAllHotels, updateHotel, deleteHotel } = require("../Controller/hotel.controller");
const { addVehicle, getAllVehicles, updateVehicle, deleteVehicle } = require("../Controller/vehicle.controller");
const { addRegion, getAllRegion, updateRegion, deleteRegion } = require("../Controller/region.controller");
const router = express.Router();


// Auth Routes
router.post ("/signup",SignupValidator,signup)
router.post ("/login",loginValidator,login)


// Hotels Routes 
router.post("/add-hotel", authMiddleware, addHotel)
router.get("/get-all-hotels", authMiddleware, getAllHotels)
router.put("/update-hotel", authMiddleware, updateHotel)
router.delete("/delete-hotel", authMiddleware, deleteHotel)

// Vehicles Routes 
router.post("/add-vehicle", authMiddleware, addVehicle);
router.get("/get-all-vehicles",authMiddleware,getAllVehicles);
router.put("/update-vehicle", authMiddleware, updateVehicle);
router.delete("/delete-vehicle", authMiddleware,deleteVehicle)

// Region Routes
router.post("/add-region", authMiddleware, addRegion);
router.get("/get-all-regions", authMiddleware, getAllRegion);
router.put("/update-region",authMiddleware,updateRegion);
router.delete("/delete-region", authMiddleware, deleteRegion)

module.exports = router