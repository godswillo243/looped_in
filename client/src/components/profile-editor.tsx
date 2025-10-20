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
import { XIcon } from "lucide-react";
import { Badge } from "./ui/badge";

interface Props {
  onSave: () => void;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  location: string;
  headline: string;
  about: string;
  skills: string[];
}

function ProfileEditor({ onSave, isOpen, setIsOpen }: Props) {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]) as IUser;
  const [formData, setFormData] = useState<FormData>({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    location: user.location || "",
    headline: user.headline || "",
    about: user.about || "",
    skills: user.skills || [],
  });

  const [skill, setSkill] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
        toast.success("Profile updated!");
        onSave();
      },
    });
  };

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit profile</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] w-full  max-h-dvh overflow-auto">
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
                onChange={handleChange}
              />
            </Field>
            <Field className="">
              <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Field>
            <Field className="">
              <FieldLabel htmlFor="location">Location</FieldLabel>
              <Input
                id="location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
              />
            </Field>
            <Field className="">
              <FieldLabel htmlFor="headline">Headline</FieldLabel>
              <Input
                id="headline"
                name="headline"
                type="text"
                value={formData.headline}
                onChange={handleChange}
              />
            </Field>
            <Field className="">
              <FieldLabel htmlFor="about">About</FieldLabel>
              <Textarea
                id="about"
                name="about"
                value={formData.about}
                onChange={handleChange}
              />
            </Field>
            <Field className="">
              <FieldLabel htmlFor="about">Skills</FieldLabel>
              <span className="flex items-center gap-2">
                <Input
                  id="skills"
                  name="skills"
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
                />
                <Button
                  variant={"outline"}
                  type="button"
                  className="w-fit!"
                  onClick={() => {
                    setFormData((state) => {
                      if (state.skills.includes(skill)) return state;
                      state.skills.push(skill);
                      return state;
                    });
                    setSkill("");
                  }}
                >
                  Add
                </Button>
              </span>
              <ul className="flex items-center justify-center flex-wrap">
                {formData.skills.map((skill) => (
                  <Badge
                    className="rounded-full"
                    key={skill}
                    variant={"secondary"}
                  >
                    <span className="text-base ">{skill}</span>
                    <span
                      className=""
                      onClick={() => {
                        setFormData((state) => ({
                          ...state,
                          skills: state.skills.filter((s) => s !== skill),
                        }));
                      }}
                    >
                      <XIcon />
                    </span>
                  </Badge>
                ))}
              </ul>
            </Field>
          </FieldGroup>
          <DialogFooter className="mt-6">
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
