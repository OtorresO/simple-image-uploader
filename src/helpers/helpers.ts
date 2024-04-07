import { toast } from "sonner";

export function toastError(message:string,objectTheme:any) {
    toast(message, {
        unstyled: true,
        closeButton: true,
        duration: 4000,
        classNames: {
            toast: `border-1 ${objectTheme.border} ${objectTheme.bgS} rounded-lg p-4`,
            title: `text-red-500 text-sm`,
            closeButton: `${objectTheme.border} ${objectTheme.text1} hover:${objectTheme.bgS}  ${objectTheme.bgS} `,
        },
    });
}