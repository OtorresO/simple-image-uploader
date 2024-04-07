// @ts-nocheck
import { v2  as cloudinary } from 'cloudinary';


cloudinary.config({
    cloud_name: import.meta.env.CLOUD_NAME,
    api_key: import.meta.env.API_KEY,
    api_secret: import.meta.env.API_SECRET
});

export async function uploadImage(buffer: any, options: any):Promise<any> {
    return new Promise((resolve, reject) => {
        
        cloudinary.uploader.upload_stream(options, (error:any, result:any) => {
            if (error) return reject(error)
            return resolve(result)
        }).end(buffer)
    })
}

