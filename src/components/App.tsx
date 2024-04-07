import React, { useRef, useState } from 'react'
import './styleApp.css'
import Logo from './icons/Logo';
import Moon from './icons/Moon';
import Exit from './icons/Exit';
import Link from './icons/Link';
import Download from './icons/Download'
import Sun from './icons/Sun';
import { Toaster, toast } from 'sonner'
import { themes } from './constantes/constants'
import { toastError } from '../helpers/helpers';



export default function App() {
    const [urlImage, setUrlImage] = useState('');
    const [isDraggingOver, setIsDraggingOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [uploadingImg, setUploadingImg] = useState(false)
    const [theme, setTheme] = useState<'light' | 'dark'>('light')
    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDraggingOver(false);
        const file = event.dataTransfer.files[0];
        sendImage(file, themes[theme])

    };

    const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return
        sendImage(file, themes[theme])

    };

    const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDraggingOver(true);
    };
    const handleDragLeave = () => {
        setIsDraggingOver(false);
    };
    const onDownload = () => {
        let link = document.createElement('a');
        link.href = urlImage;
        link.download = `image-${crypto.randomUUID()}.png`;
        link.target = '_blank';
        link.click();

    }

    function sendImage(file: File, objectTheme: any) {
        if (file && !file.type.startsWith('image/')) {
            toastError('The file uploaded is not an image', objectTheme);
            return
        }
        if (file && file.size > 2000000) {
            toastError('The image cannot exceed 2MB. Please choose a lighter image to proceed', objectTheme);
            return
        }
        const formData = new FormData();
        formData.append('file', file);
        setUploadingImg(true)
        fetch('/api/methods', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(url => { setUrlImage(url); setUploadingImg(false) })
        .catch(error => {
            throw new Error(error);
            

        })
    }


    return (
        <main className={`min-h-screen grid grid-rows-[70px,1fr] grid-cols-1 ${themes[theme].bgP}`}>

            <nav className={`border-b ${themes[theme].border} flex justify-between items-center px-20`}>
                <Logo color={theme == 'light' ? '#121826' : '#F9FAFB'} />
                <span className={`border ${themes[theme].border} p-2 ${themes[theme].bgS} rounded-lg`} onClick={() => { theme == 'light' ? setTheme('dark') : setTheme('light') }}>
                    {
                        theme == 'dark' ? <Sun /> : <Moon />
                    }
                </span>
            </nav>
            <section className='flex justify-center items-center flex-col'>

                {

                    (urlImage == '' && !uploadingImg) && (<div
                        className={`${themes[theme].border} ${isDraggingOver ? themes[theme].bgD : themes[theme].bgS} min-w-[400px] p-3 w-4/5 sm:w-3/5 lg:w-2/5 h-3/5 shadow-lg rounded-lg`}
                        onDragOver={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <div className={`border-2 ${themes[theme].borderD} border-spacing-4 border-dashed p-3 w-full h-full flex justify-center items-center flex-col gap-4 rounded-lg`}>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleFileInput}
                                style={{ display: 'none' }}
                            />
                            <Exit />
                            <div className='flex flex-col gap-2'>
                                <div className={` text-sm font-medium ${themes[theme].text1}`}>Drag & drop a file or <button onClick={() => fileInputRef.current?.click()} className='text-[#3662E3]'>browse files</button>
                                </div>
                                <div className={`text-xs ${themes[theme].text2}`}>JPG, PNG or GIF - Max file size 2MB</div>

                            </div>

                        </div>
                    </div>)
                }

                {
                    (urlImage != '' && !uploadingImg) &&
                    (<div className='flex flex-col items-center justify-center gap-6'>
                        <div className={`${themes[theme].border} ${themes[theme].bgS} p-2 w-[40%] h-auto shadow-xl rounded-lg`}>
                            <img src={urlImage} className='rounded-lg w-full h-auto overflow-hidden' loading='lazy' alt="Image uploaded" decoding="async" />
                        </div>
                        <div className='flex gap-2'>
                            <button className='bg-[#3662E3] text-[#E5E7EB] text-[10px] px-4 py-2 font-semibold rounded-lg flex gap-1 items-center' onClick={async () => await navigator.clipboard.writeText(urlImage)}><Link /> <span>Share</span></button>
                            <button className='bg-[#3662E3] text-[#E5E7EB] text-[10px] px-4  py-2 font-semibold rounded-lg flex gap-1 items-center' onClick={onDownload}><Download /> <span>Download</span></button>
                        </div>
                    </div>)
                }

                {
                    uploadingImg &&
                    (<div className={`${themes[theme].border} p-3 w-5/12 h-1/6 shadow-lg rounded-lg ${themes[theme].bgS} flex flex-col items-center justify-center gap-2`}>
                        <div className={`text-xs ${themes[theme].text1}`}><span className='font-semibold '>Uploading</span>, please wait..</div>
                        <div className='w-full h-auto'>

                            <div className={`${themes[theme].bgL} h-[6px] w-2/3 mx-auto rounded-lg overflow-hidden`} >
                                <div className='bg-[#3662E3] h-full w-2/12 rounded-lg animate-load '>

                                </div>
                            </div>
                        </div>

                    </div>)
                }




            </section>
            <Toaster position="top-right" />
        </main >
    )
}
