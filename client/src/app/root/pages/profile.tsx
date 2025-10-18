import Icon from "@/components/icon";
import ProfileEditor from "@/components/profile-editor";
import SignOutBtn from "@/components/sign-out-btn";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axiosInstance from "@/lib/axiosInstance";
import { ICON_PATHS } from "@/lib/icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { IUser } from "@types";
import type { AxiosError } from "axios";
import { CameraIcon } from "lucide-react";
import { useParams } from "react-router-dom";

function Profile() {
  const queryClient = useQueryClient();
  const authUser = queryClient.getQueryData(["user"]) as IUser;
  const uid = useParams().uid;

  const isMyProfile = authUser?.uid === uid;
  const fullname = `${authUser?.firstName} ${authUser?.lastName}`;

  const { data } = useQuery<IUser, AxiosError, IUser, string[]>({
    queryKey: [uid as string],
    enabled: !isMyProfile,
    queryFn: async () => {
      const res = await axiosInstance.get(`/users/${uid}`);
      return res.data;
    },
  });

  const user = isMyProfile ? authUser : data;

  if (!user)
    return (
      <article className="w-full h-full overflow-auto">
        <div></div>
      </article>
    );

  const handleSave = () => {
    queryClient.invalidateQueries({ queryKey: ["user"] });
  };

  return (
    <article className="w-full h-full overflow-auto">
      <div className="p-2 space-y-4">
        <Card>
          <CardHeader>
            <div className="relative p-2 size-fit">
              <Avatar className="size-24 ">
                <AvatarImage
                  src={user?.profilePictureUrl}
                  onClick={() => console.log("clicked")}
                />
                <AvatarFallback className="text-6xl text-center">
                  {fullname[0]}
                </AvatarFallback>
              </Avatar>
              {isMyProfile && (
                <Button variant={"ghost"} className="absolute right-0 bottom-0">
                  <CameraIcon className="size-6" />
                </Button>
              )}
            </div>
            <div>
              <CardTitle className="text-2xl">{fullname}</CardTitle>
              <p className="text-foreground/65 ">{user.email}</p>
              <p className="text-foreground/65 ">
                <span className="text-foreground">UID: </span>
                {user.uid}
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <CardDescription>
              <span className="font-medium! text-foreground">Location: </span>
              {user.location || "Rivers State, Nigeria"}
            </CardDescription>
            <CardDescription>
              <span className="font-medium! text-foreground">Headline: </span>
              <br />
              {user.headline || "Headline"}
            </CardDescription>
          </CardContent>
          <CardFooter className="flex items-center gap-2">
            {isMyProfile ? (
              <>
                <CardAction>
                  <ProfileEditor onSave={handleSave} />
                </CardAction>
                <CardAction>
                  {" "}
                  <SignOutBtn />
                </CardAction>
              </>
            ) : (
              <>
                <CardAction>
                  <Button variant={"outline"}>
                    <Icon paths={ICON_PATHS.personAdd} />
                    <span className="ml-2">Connect</span>
                  </Button>
                </CardAction>
                <CardAction>
                  <Button variant={"outline"}>Message</Button>
                </CardAction>
              </>
            )}
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{user.about}</CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Education</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{}</CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{}</CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{}</CardDescription>
          </CardContent>
        </Card>
      </div>
    </article>
  );
}
export default Profile;
