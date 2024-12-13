import fs from "fs";
import cloudinary from "../config/cloudinary.config.js";

export const uploadToCloud = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: process.env.CLOUDINARY_FOLDER,
            resource_type: 'auto',
        });

        return { url: result.url, public_id: result.public_id };
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    } finally {
        fs.unlinkSync(filePath);
    }
};

export const deleteFromCloud = async (publicId) => {
    try {
        if(!publicId) {
            return null;
        }
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        console.error('Error deleting image:', error);
        throw error;
    }
};