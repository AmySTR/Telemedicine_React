import { backend } from '../constants/DefaultConstant';

export const createRecord = async (formData: any) => {
    const url = `${backend}/medication`;
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    });
    if (response.status === 200) {
        return true;
    }
}

export const updateRecord = async (formData: any) => {
    const url = `${backend}/medication`;
    const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    });
    if (response.status === 200) {
        return true;
    }
}

export const getAllRecord = async () => {
    const url = `${backend}/medication`;
    const response = await fetch(url, {
        method: 'GET',
    });
    const data = await response.json();
    return data;
}