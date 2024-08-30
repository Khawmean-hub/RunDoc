import ihttp from "@/util/http-client"

export const userService = {
    getRole,
    listUser,
    getUsersByDepartmentId
}


function listUser() {
    return ihttp.get('/api/admin/users')
}
function getRole() {
    return ihttp.get('/api/roles/my-role')
}

function getUsersByDepartmentId(id: String) {
    return ihttp.get(`/api/users/department/${id}`)
}