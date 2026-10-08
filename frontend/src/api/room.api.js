import API from './axios'

export const generateRoom = (roomData) => API.post('/room/create',roomData,
    {withCredentials:true}
)
export const joinRoom=(inviteCode)=>API.post('/room/join',{inviteCode},
    {withCredentials:true}
)
export const getRoomById=(inviteCode)=>API.post('/room/members',{inviteCode},
    {withCredentials:true}
)