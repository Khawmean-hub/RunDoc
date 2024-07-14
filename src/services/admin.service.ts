import ihttp from "@/util/http-client"

export const adminService = {
    addUser,
    getUsers,
    deleteUser
}

interface User {
    username: string;
    email: string;
    password: string;
    role?:any
}

function deleteUser(id:string){
    return ihttp.delete(`/api/admin/users/${id}`)
}
function addUser(user: any) {
    return ihttp.post('/api/admin/users', user);
}

function getUsers() {
    return ihttp.get('/api/admin/users')
}