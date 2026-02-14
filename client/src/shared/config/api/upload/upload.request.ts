import httpClient from '../httpClient';
import { ENDP_UPLOAD } from '../URLs';

export const uploadRequest = {
  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    const response = await httpClient.post<{ url: string; message: string }>(
      ENDP_UPLOAD,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  },
};
