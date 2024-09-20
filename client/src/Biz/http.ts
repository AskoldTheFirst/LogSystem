import axios, { AxiosError, AxiosResponse } from "axios";
import { router } from "../App/Routes";
import { toast } from "react-toastify";

axios.defaults.baseURL = 'http://localhost:5009/api/';
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use(config => {
    const user = localStorage.getItem('user');
    if (user)
    {
        const userDto = JSON.parse(user);
        config.headers.Authorization = `Bearer ${userDto.token}`;
    }
    
    return config;
});

axios.interceptors.response.use(async response => {
    return response;
}, /*not 2xx responce range*/ (error: AxiosError) => {
    const { data, status } = error.response as AxiosResponse;
    
    switch (status) {
        case 400:
        case 401:
        case 404:
            toast.error(data?.title);
            break;
        case 500:
            router.navigate('/server-error', { state: { error: data } });
            break;
        default:
            break;
    }
    return Promise.reject(error.response);
});

const requests = {
    get: (url: string, params?: URLSearchParams) => axios.get(url, { params }).then(responseBody),
    post: (url: string, body: object) => axios.post(url, body).then(responseBody),
    put: (url: string, body: object) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}

const Log = {
    page: (filter: URLSearchParams) => requests.get(`log`, filter),
}

const Account = {
    login: (values: any) => requests.post('account/login', values),
    register: (values: any) => requests.post('account/register', values),
    currentUser: () => requests.get('account/currentUser'),
}

const http = {
    Account,
    Log
}

export default http;