import { useProfileStore } from "@/stores/profile";

const checkRolePermission = (permission) => {
    const rolePermission = JSON.parse(sessionStorage.getItem('user_role_permission'));
    if (permission === 'all_enable') return true;
    else return permission === rolePermission.role_name

};
export default checkRolePermission;
