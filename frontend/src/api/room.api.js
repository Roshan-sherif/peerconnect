import API from './axios'

export const generateRoom = (roomData) => API.post('/room/create',roomData,
    {withCredentials:true}
)
