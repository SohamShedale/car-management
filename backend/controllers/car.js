import { Car } from "../models/car-model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const files = req.files;
    if (!title || !description || !tags || !files) {
      return res.status(400).json({
        message: "Fill all the details",
        success: false,
      });
    }

    const userId = req.id;
    let cloudResponse,
      imageArray = [];

    if (files) {
      if (files.length > 10) {
        return res.status(413).json({
          message: "Upload 10 images only",
          success: false,
        });
      }
      if (files.length === 0) {
        return res.status(400).json({
          message: "Upload atleast 1 image",
          success: false,
        });
      }
      const uploadFiles = files.map(async (file) => {
        let fileURI = getDataUri(file);
        cloudResponse = await cloudinary.uploader.upload(fileURI.content);
        return cloudResponse.secure_url;
      });
      const imageUrls = await Promise.all(uploadFiles);
      imageArray.push(...imageUrls);
    }

    let tagsArray;
    if (tags) {
      tagsArray = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");
    }

    await Car.create({
      dealer: userId,
      images: imageArray,
      title,
      description,
      tags: tagsArray,
    });

    return res.status(200).json({
      message: "Car registered succesfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const getCarDetails = async (req, res) => {
  try {
    const userId = req.id;

    const cars = await Car.find({ dealer: userId });
    if (!cars) {
      return res.status(404).json({
        message: "No records found",
        success: false,
      });
    }
    return res.status(200).json({
      cars,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const getCarDetailById = async (req, res) => {
  try {
    const userId = req.id;
    const carId = req.params.id;
    const car = await Car.find({
      _id: carId,
      dealer: userId,
    });
    if (!car) {
      return res.status(404).json({
        message: "No record found",
        success: false,
      });
    }
    return res.status(200).json({
      car,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const updateCarDetails = async (req, res) => {
  try {
    const carId = req.params.id;
    const { title, description, tags } = req.body;

    const files = req.files;

    let cloudResponse,
      imageArray = [];

    if (files.length > 0) {
      try {
        const uploadFiles = files.map(async (file) => {
          let fileURI = getDataUri(file);
          cloudResponse = await cloudinary.uploader.upload(fileURI.content);
          return cloudResponse.secure_url;
        });
        const imageUrls = await Promise.all(uploadFiles);
        imageArray.push(...imageUrls);
      } catch (error) {
        return res.status(500).json({
          message: "Error in uploading files",
          success: false,
        });
      }
    }

    let tagsArray;
    if (tags) {
      tagsArray = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");
    }

    const car = await Car.findById(carId);

    if (!car) {
      return res.status(400).json({
        message: "Car not found",
        success: false,
      });
    }

    if (imageArray.length > 0) {
      car.images = imageArray;
    } else {
      car.images = [...car.images];
    }
    title ? (car.title = title) : (car.title = car.title);
    description
      ? (car.description = description)
      : (car.description = car.description);
    tagsArray ? (car.tags = tagsArray) : (car.tags = car.tags);

    await car.save();

    return res.status(200).json({
      message: "Updated successfully",
      car,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const deleteCarDetails = async (req, res) => {
  try {
    const carId = req.params.id;
    const car = await Car.findByIdAndDelete(carId);

    if (!car) {
      return res.status(200).json({
        message: "Something went wrong",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Deleted successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};
