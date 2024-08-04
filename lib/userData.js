import { getToken } from "./authenticate";

const headers = async () => ({
    'Authorization': `JWT ${await getToken()}`,
    'Content-Type': 'application/json'
});

const handleResponse = async (response) => {
    if (response.status === 200) {
        return await response.json();
    } else {
        return [];
    }
};

export const addToFavorites = async (id) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favorites/${id}`, {
        method: 'PUT',
        headers: await headers()
    });
    return handleResponse(response);
};

export const removeFromFavorites = async (id) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favorites/${id}`, {
        method: 'DELETE',
        headers: await headers()
    });
    return handleResponse(response);
};


export const getFavorites = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favorites`, {
        method: 'GET',
        headers: await headers()
    });
    return handleResponse(response);
};

export const addToHistory = async (id) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
        method: 'PUT',
        headers: await headers()
    });
    return handleResponse(response);
};

export const removeFromHistory = async (id) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
        method: 'DELETE',
        headers: await headers()
    });
    return handleResponse(response);
};

export const getHistory = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history`, {
        method: 'GET',
        headers: await headers()
    });
    return handleResponse(response);
};
