import { API_URL } from "../constants/service.constants"

export const postLike = async (imageId: number) => {
  const response = await fetch(`${API_URL}/images/${imageId}/likes`, {
    method: 'POST',
    body: JSON.stringify({}),
  })
  return response
}