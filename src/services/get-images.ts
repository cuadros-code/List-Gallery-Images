import { API_URL } from "../constants/service.constants"
import { ImageResponse } from "../interfaces/images.interface"

export const getImages = async (page: number = 1, size: number = 10): Promise<ImageResponse[]> => {
  const response = await fetch(`${API_URL}/images?page=${page}&size=${size}`)
  const data = await response.json() as ImageResponse[]
  return data.map((image) => {
    image.unique_id = crypto.randomUUID()
    return image
  })
}