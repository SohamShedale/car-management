import express from 'express';
import isLoogedIn from '../middlewares/auth.js';
import { deleteCarDetails, getCarDetailById, getCarDetails, register, updateCarDetails } from '../controllers/car.js';
import {multipleUpload} from "../middlewares/multer.js";

const router = express.Router();

router.post("/register", isLoogedIn, multipleUpload, register);
router.get("/list", isLoogedIn, getCarDetails);
router.get("/list/:id", isLoogedIn, getCarDetailById);
router.put("/update/:id", isLoogedIn, multipleUpload, updateCarDetails);
router.delete("/delete/:id", isLoogedIn, deleteCarDetails);

export default router;