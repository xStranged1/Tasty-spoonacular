import * as SecureStore from 'expo-secure-store';

export async function saveItem(key: string, value: string): Promise<void> {
    try {
        await SecureStore.setItemAsync(key, value);
    } catch (e) {
        console.error('SecureStore › error guardando:', e);
    }
}

export async function getItem(key: string): Promise<string | null> {
    try {
        return await SecureStore.getItemAsync(key);
    } catch (e) {
        console.error('SecureStore › error leyendo:', e);
        return null;
    }
}

export async function deleteItem(key: string): Promise<void> {
    try {
        await SecureStore.deleteItemAsync(key);
    } catch (e) {
        console.error('SecureStore › error eliminando:', e);
    }
}
