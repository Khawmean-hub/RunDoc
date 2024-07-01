import ihttp from "@/util/http-client"

export const departmentService = {
    list,
    create,
    getUsers,
    getHierarchy
}

function list() {
    return ihttp.get(`/api/departments`)
}
function get(id: string) {
    return ihttp.get(`/api/departments`)
}

function create(data: any) {
    return ihttp.post(`/api/departments`, data)
}
function getUsers(departmentId:string){
    return ihttp.get(`/api/departments/${departmentId}/users`)
}

function getHierarchy(){
    return ihttp.get(`/api/departments/all/with-children`)
}