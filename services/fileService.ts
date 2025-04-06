import { useMutation } from "@tanstack/react-query";
import { api, apiWithAuth } from "./api";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";

type GetPresignedUrlRequest = {
  fileName: string;
  fileType: string;
};

type GetPresignedUrlResponse = {
  url: string;
  key: string;
};

export function useGetPresignedUrlMutation() {
  return useMutation<
    GetPresignedUrlResponse,
    AxiosError,
    GetPresignedUrlRequest
  >({
    mutationFn: async ({ fileName, fileType }) => {
      const response = await apiWithAuth.post<GetPresignedUrlResponse>(
        "/user/upload-image",
        {
          fileName,
          fileType,
        },
      );

      return response.data;
    },
    onError: (error) => {
      toast.error("Erro ao criar atualizar imagem. Tente novamente.");
      console.error("Error creating user:", error);
    },
  });
}

export const useUploadToS3Mutation = () =>
  useMutation({
    mutationFn: async ({ url, file }: { url: string; file: File }) => {
      const response = await axios.put(url, file, {
        headers: {
          "Content-Type": file.type,
        },
      });
      return response;
    },
  });
