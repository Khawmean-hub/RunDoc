import ihttp from "@/util/http-client"

export const positionService = {
    list,
    get,
    create,
    update,
    remove

}


function list() {
    return ihttp.get('/api/positions')
}

function get(id: string) {
    return ihttp.get(`/api/positions/${id}`)
}

function create(data: any) {
    return ihttp.post('/api/positions', data)
}

function update(id: string, data: any) {
    return ihttp.put(`/api/positions/${id}`, data)
}

function remove(id: string) {
    return ihttp.delete(`/api/positions/${id}`)
}