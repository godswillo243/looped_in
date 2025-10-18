import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { IUser } from "@types";
import type { AxiosError } from "axios";
import axiosInstance from "@/lib/axiosInstance";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { toast } from "sonner";
import { Spinner } from "./ui/spinner";
import { CameraIcon } from "lucide-react";
import { Card, CardAction, CardContent, CardFooter } from "./ui/card";

interface Props {
  onSave: () => void;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}

function ProfileImageEditor({ onSave, isOpen, setIsOpen }: Props) {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]) as IUser;
  const [picture, setPicture] = useState(user.profilePictureUrl || "");
  const { mutate: editProfile, isPending } = useMutation<
    string,
    AxiosError,
    Record<"profilePicture", string>,
    unknown
  >({
    mutationFn: async (formData) => {
      const res = await axiosInstance.patch("/users/", formData);
      return res.data;
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("hello");

    editProfile(
      { profilePicture: picture },
      {
        onSuccess: () => {
          toast.success("Profile");
          onSave();
        },
      }
    );
  };

  const handlePictureChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files![0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPicture(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="absolute right-0 bottom-0">
          <CameraIcon className="size-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-dvh overflow-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Upload a profile picture</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <Card className="w-full max-w-sm mx-auto p-4 shadow-lg rounded-2xl text-center">
            <CardContent className="flex flex-col items-center space-y-4">
              <div className="relative">
                {picture ? (
                  <div className="relative">
                    <img
                      src={picture}
                      alt="Profile"
                      className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                    />
                  </div>
                ) : (
                  <div className="w-32 h-32 flex items-center justify-center rounded-full bg-gray-100 border-2 border-dashed border-gray-300">
                    <CameraIcon className="text-gray-400" size={32} />
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="fileInput"
                  className="cursor-pointer inline-flex items-center gap-2 bg-secondary hover:bg-secondary/60 text-white text-sm font-medium px-4 py-2 rounded-xl transition"
                >
                  <CameraIcon size={16} />
                  {picture ? "Change Photo" : "Upload Photo"}
                </label>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePictureChange}
                />
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <CardAction>
                <DialogClose asChild>
                  <Button variant="outline" disabled={isPending}>
                    Cancel
                  </Button>
                </DialogClose>
              </CardAction>
              <CardAction>
                <Button type="submit" disabled={isPending}>
                  {isPending ? <Spinner /> : "Save changes"}
                </Button>
              </CardAction>
            </CardFooter>
          </Card>
          <DialogFooter></DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ProfileImageEditor;
