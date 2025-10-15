import axios  from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true
});

instance.interceptors.request.use(config => {
    return config;
})

instance.interceptors.response.use(
    async response => {
        return response;
    },
    async error => {
        const { status, data } = error.response;
        switch (status) {
            case 400:
                if (data.errors) {
                    const modalStateErrors = [];
                    for (const key in data.errors) {
                        if (data.errors[key]) {
                            modalStateErrors.push(data.errors[key]);
                        }
                    }
                    throw modalStateErrors.flat();
                } else {
                    toast.error(data);
                }
                break;
            case 401:
                toast.error('Unauthorised');
                break;
            // case 404:
            //     router.navigate('/not-found');
            //     break;
            // case 500:
            //     router.navigate('/server-error', {state: {error: data}})
            //     break;
            default:
                break;
        }

        return Promise.reject(error);
    }
);

export default instance;
