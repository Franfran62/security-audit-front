import { ref } from 'vue';

const permissions = ref([]);

const setCurrentPermission = (role) => {
    permissions.value = role;
}

const clearPermission = () => {
    permissions.value = [];
}

const isGranted = (role) => {
    if (!permissions.value) {
        return false;
    }
    return permissions.value == role;
};


export function useCurrentPermission() {
    return { setCurrentPermission, clearPermission, isGranted };
}