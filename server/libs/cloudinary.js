import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({
    cloud_name: 'porfiriokempes',
    api_key: '182389698919123',
    api_secret: 'ScwECatPYb7jBTIVLBusaie2AEM'
})

export const uploadImage = async filePath => {
    return await cloudinary.uploader.upload(filePath, {
        folder: 'posts'
    });
};

export const deleteImage = async id => await cloudinary.uploader.destroy(id);