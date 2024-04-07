import { v2 as cloudinary } from 'cloudinary';


cloudinary.config({
    cloud_name: import.meta.env.CLOUD_NAME,
    api_key: import.meta.env.API_KEY,
    api_secret: import.meta.env.API_SECRET
});

export async function uploadImage(buffer: Uint8Array, options: any) {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(options, (error, result) => {
            if (error) return reject(error)
            resolve(result)
        }).end(buffer)
    })
}

