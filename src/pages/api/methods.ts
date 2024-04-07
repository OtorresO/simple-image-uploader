import type { APIRoute, APIContext } from "astro"
import { uploadImage } from "../../helpers/fetchApi";

export const POST: APIRoute = async ({ request }: APIContext) => {
    let body: FormData = {} as FormData

    try {
        body = await request.formData();
        const file: File = body.get('file') as File
        const arrayBuffer = await file.arrayBuffer()
        const uit8Array = new Uint8Array(arrayBuffer)
        const response = await uploadImage(uit8Array, {
            folder: 'simple-image-uploader'
        })
        const { secure_url } = response as { secure_url: string }
        const splitSecureUrl = secure_url.split('/upload') 
        let firstPart = splitSecureUrl[0]+'/upload/f_auto,q_auto:low'
        let secondPart = splitSecureUrl[1]
        let newSecureUrl = firstPart+secondPart

        return new Response(JSON.stringify(newSecureUrl), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 })
    }


}
