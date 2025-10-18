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
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { IUser } from "@types";
import { Textarea } from "./ui/textarea";
import type { AxiosError } from "axios";
import axiosInstance from "@/lib/axiosInstance";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Spinner } from "./ui/spinner";

interface Props {
  onSave: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  location: string;
  headline: string;
  about: string;
  profilePicture: string;
}

function ProfileEditor({ onSave }: Props) {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]) as IUser;
  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    location: user.location || "",
    headline: user.headline || "",
    about: user.about || "",
    profilePicture: user.profilePictureUrl || "",
  });
  const { mutate: editProfile, isPending } = useMutation<
    string,
    AxiosError,
    FormData,
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

    editProfile(formData, {
      onSuccess: () => {
        toast.success("Profile updated");
        onSave();
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-dvh overflow-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="">
            <Field className="">
              <FieldLabel htmlFor="firstName">First Name</FieldLabel>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData((state) => ({
                    ...state,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </Field>
            <Field className="">
              <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData((state) => ({
                    ...state,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </Field>
            <Field className="">
              <FieldLabel htmlFor="location">Location</FieldLabel>
              <Input
                id="location"
                name="location"
                type="text"
                value={formData.location}
                onChange={(e) =>
                  setFormData((state) => ({
                    ...state,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </Field>
            <Field className="">
              <FieldLabel htmlFor="headline">Headline</FieldLabel>
              <Input
                id="headline"
                name="headline"
                type="text"
                value={formData.headline}
                onChange={(e) =>
                  setFormData((state) => ({
                    ...state,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </Field>
            <Field className="">
              <FieldLabel htmlFor="about">About</FieldLabel>
              <Textarea
                id="about"
                name="about"
                value={formData.about}
                onChange={(e) =>
                  setFormData((state) => ({
                    ...state,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={isPending}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? <Spinner /> : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ProfileEditor;
