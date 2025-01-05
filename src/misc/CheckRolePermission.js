
const checkRolePermission = (permission) => {
    const rolePermission = JSON.parse(sessionStorage.getItem('user_role_permission')) ||
        { "gender": "", "role_id": "", "employee_contact_phone": "", "employee_email": "", "employee_id": "", "employee_name": "", "role_name": "" }
        ;
    if (permission === 'all_enable') return true;
    else return permission === rolePermission.role_name

};
export default checkRolePermission;
