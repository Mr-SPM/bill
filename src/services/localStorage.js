const STORAGE_KEY = 'MYBILL';

export default {
    fetch() {
        return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
    },
    save(item) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(item))
    },
    add(item) {
        let origin = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
        if (!Array.isArray(origin)) {
            origin = [];
        }
        origin.push(item)
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(origin));
    },
    reset() {
        window.localStorage.removeItem(STORAGE_KEY);
    }
}