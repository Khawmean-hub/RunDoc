import ihttp from "@/util/http-client"

export const documentService = {
    create,
    list,
    get,
    updateStatus,
    listMyDocuments
}

function create(data: any) {
    return ihttp.post(`/api/documents`, data)
}

function listMyDocuments() {
    return ihttp.get(`/api/documents/my-documents`)
}

function list() {
    return ihttp.get(`/api/documents`)
}
function get(id: string) {
    return ihttp.get(`/api/documents/${id}`)
}
function updateStatus(status: 'PENDING' | 'HOLD' | 'PROGRESS' | 'COMPLETE', doc_id: string, level_id:string) {
    return ihttp.patch(`/api/documents/${doc_id}/levels/${level_id}/status`, {
        status
    })
}