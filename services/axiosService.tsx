import axios, { AxiosError } from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

const api = axios.create({
    baseURL,
    withCredentials: true,
});

const isBrowser = typeof window !== 'undefined';

const getToken = () => (isBrowser ? localStorage.getItem('token') : null);

api.interceptors.request.use(
    (config) => {
        if (!isBrowser) return config;
        const token = getToken();
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        const status = (error.response && error.response.status) || null;
        const requestConfig: any = (error as any)?.config || {};
        const skipRedirect = requestConfig?.headers?.['x-skip-auth-redirect'];

        if (isBrowser && (status === 401 || status === 403) && !skipRedirect) {
            try {
                localStorage.removeItem('token');
            } catch (e) {
                // ignore
            }
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const setAuthToken = (token: string | null) => {
    if (!isBrowser) return;
    if (token) {
        localStorage.setItem('token', token);
        api.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
        try {
            localStorage.removeItem('token');
        } catch (e) {
            // ignore
        }
        // remove header
        if (api.defaults.headers.common) {
            // @ts-ignore
            delete api.defaults.headers.common.Authorization;
        }
    }
};

export default api;
