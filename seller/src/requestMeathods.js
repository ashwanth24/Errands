import axios from 'axios'

const BASE_URL = "http://localhost:5000/api/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTg5ZWIxNjQzYjM1NTI3ODE3OGQyMCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3NjU2NTg0NiwiZXhwIjoxNjc3MTcwNjQ2fQ.4VaxxU7CtSaObUgv0IXvjX5QbzCx50TJCLsxCwYbMB0"

export const publicRequest = axios.create({
    baseURL : BASE_URL,
});

export const userRequest = axios.create({
    baseURL : BASE_URL,
    headers : {token:`Bearer ${TOKEN}`}
})