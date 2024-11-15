import multer from "multer";

const storage = multer.memoryStorage();

export const multipleUpload = multer({storage}).array("files", 10);