"use client";

import { useState, useRef } from "react";
import { Loader2, UploadIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/stores/authStore";
import {
  useGetPresignedUrlMutation,
  useUploadToS3Mutation,
} from "@/services/fileService";
import { toast } from "sonner";
import { useConfirmProfilePictureMutation } from "@/services/userService";
import { useUserStore } from "@/stores/userStore";
import { Skeleton } from "@/components/ui/skeleton";

export function ProfileUploadAvatar() {
  const { firebaseUser } = useAuthStore();
  const { user } = useUserStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const getPresignedUrlMutation = useGetPresignedUrlMutation();
  const confirmProfilePictureMutation = useConfirmProfilePictureMutation();
  const uploadToS3Mutation = useUploadToS3Mutation();
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !firebaseUser) return;

    setIsLoading(true);
    try {
      const presignedData = await getPresignedUrlMutation.mutateAsync({
        fileName: file.name,
        fileType: file.type,
      });

      await uploadToS3Mutation.mutateAsync({
        url: presignedData.url,
        file,
      });

      await confirmProfilePictureMutation.mutateAsync(presignedData.key);

      toast.success("Foto de perfil atualizada com sucesso!");
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Erro ao atualizar a foto de perfil. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const openFileInput = () => {
    fileInputRef.current?.click();
  };

  const fallBackName =
    user?.name
      ?.split(" ")
      .map((name) => name[0])
      .join("") ?? "";

  if (!firebaseUser || !user) {
    return <Skeleton className="h-32 w-32 rounded-full" />;
  }

  return (
    <div
      className="group relative cursor-pointer rounded-full transition-all duration-500 ease-in-out hover:shadow-lg"
      onClick={openFileInput}
      aria-label="Upload profile picture"
      aria-disabled={isLoading}
    >
      <Avatar className="h-32 w-32">
        <AvatarImage
          src={user?.profilePicture ?? ""}
          alt={user?.name ?? "User Avatar"}
          className="h-full w-full object-cover"
        />
        <AvatarFallback>{fallBackName}</AvatarFallback>
      </Avatar>

      <div
        className={`absolute inset-0 flex items-center justify-center rounded-full bg-black/50 text-white transition-opacity duration-300 ease-in-out ${
          isLoading ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      >
        {isLoading ? (
          <Loader2 className="h-8 w-8 animate-spin" />
        ) : (
          <UploadIcon className="h-8 w-8" />
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/png, image/jpeg, image/gif, image/webp"
        onChange={handleUpload}
        disabled={isLoading}
      />
    </div>
  );
}
