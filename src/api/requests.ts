import axios from 'axios'
import { API_ENDPOINT } from './config'

export interface IPictureRequest {
  id: number
  name: string
  amountOfPictures: number
  year: number
}

export interface IPictureError {
  value: number
  msg: string
  param: string
  location: string
}

export const fetchAllRequests = () => {
  return axios.get<{ requests: IPictureRequest[] }>(`${API_ENDPOINT}/requests`)
}

export const createPictureRequest = (request: Omit<IPictureRequest, 'id'>) => {
  return axios.post<{ request: IPictureRequest }>(`${API_ENDPOINT}/requests`, request)
}

export const fetchRequest = (id: number) => {
  return axios.get<IPictureRequest>(`${API_ENDPOINT}/requests/${id}`)
}
