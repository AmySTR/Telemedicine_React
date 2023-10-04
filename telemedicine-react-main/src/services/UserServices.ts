import { backend } from '../constants/DefaultConstant';
async function fetchData(url: RequestInfo | URL, options = {}) {
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok) {
        return data;
    } else {
        throw new Error(data.message || response.statusText);
    }
}

export const register = async (formData: any) => {
    const url = `${backend}/users`;
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    });
    if (response.status === 200) {
        return true;
    }
}

export const getAllUser = async () => {
    const url = `${backend}/users`;
    const response = await fetch(url, {
        method: 'GET',
    });
    const data = await response.json();
    return data;
}

export const login = async (email: string, password: string) => {
    const requestBody = { email, password };
    const url = `${backend}/users/login`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
    if (response.status === 200) {
        return true;
    }
}

export async function getPosts() {
    return fetchData('https://jsonplaceholder.typicode.com/posts');
}

export async function createPost(post: any) {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
    };
    return fetchData('https://jsonplaceholder.typicode.com/posts', options);
}
