import { userStore } from "@/store/auth/userStore"
import { storeToRefs } from "pinia"

export function PermissionUtil() {

    const { oUser } = storeToRefs(userStore())

    // 
    const hasPermission = (permission: string) : boolean => {       
        if (!oUser.value) return false;
        return oUser.value.roles.some(r => r.permissions?.some(p => p.name === permission));
    }

    const hasPermissionById = (id: number) : boolean => {
        if (!oUser.value) return false;
        return oUser.value.roles.some(role => role.permissions.some(p => p.id === id));
    }

    return {
        hasPermission,
        hasPermissionById
    }
}