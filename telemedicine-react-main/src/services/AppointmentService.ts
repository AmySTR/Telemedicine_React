import { backend } from '../constants/DefaultConstant';

export const getAllRecord = async () => {
    const url = `${backend}/appointments`;
    const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    return data;
}

export const getRecordByForm = async (formData: any) => {
    const url = `${backend}/appointments/search`;
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    });
    const data = await response.json();
    return data;
}

export const updateRecord = async (formData: any) => {
    const url = `${backend}/appointments`;
    const offset = '+0800';
    const isoDate = formData.appointment_at.toISOString().replace('Z', offset);
    const newFormData = {
        id: formData.id,
        patient: formData.patient.id,
        doctor: formData.doctor.id,
        appointment_at: isoDate,
    }
    const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFormData),
    });
    if (response.status === 200) {
        return true;
    }
}

export const createRecord = async (formData: any) => {
    const url = `${backend}/appointments`;
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    });
    if (response.status === 200) {
        return true;
    }
}