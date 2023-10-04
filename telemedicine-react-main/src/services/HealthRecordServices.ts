import { backend } from '../constants/DefaultConstant';

export const createRecord = async (formData: any) => {
    const url = `${backend}/healthrecords`;
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    });
    if (response.status === 200) {
        return true;
    }
}

export const getByPatientId = async (id: number) => {
    const url = `${backend}/healthrecords/${id}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    return data;
}

export const updateRecord = async (formData: any) => {
    const url = `${backend}/healthrecords`;
    const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    });
    if (response.status === 200) {
        return true;
    }
}