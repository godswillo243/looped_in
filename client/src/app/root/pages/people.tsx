import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

import { useQueryClient } from "@tanstack/react-query";
import type { IConnection, IUser } from "@types";
import { ArrowRightIcon } from "lucide-react";
import { Link } from "react-router-dom";

function Networks() {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]) as IUser;
  const connections = queryClient.getQueryData([
    user.uid + "connections",
  ]) as IConnection[];

  const pendingConnections = connections
    ? connections.filter((connection) => connection.status === "pending")
    : [];
  const acceptedConnections = connections
    ? connections.filter((connection) => connection.status === "accepted")
    : [];

  return (
    <article className="w-full h-full">
      <Card className="max-w-xl mx-auto p-4 ">
        <CardTitle className="text-center">Connections overview</CardTitle>
        <CardContent className="flex flex-row items-center justify-center gap-6">
          <div className="flex flex-col items-center justify-center gap-2">
            <span className="text-2xl font-bold">
              {pendingConnections.length}
            </span>
            <CardDescription className="">Pending</CardDescription>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <span className="text-2xl font-bold">
              {acceptedConnections.length}
            </span>
            <CardDescription className="">Accepted</CardDescription>
          </div>
        </CardContent>

        <Link
          to={"/"}
          className="flex items-center justify-center gap-2 hover:underline active:underline w-fit mx-auto"
        >
          View accepted connections
          <ArrowRightIcon className="size-4" />
        </Link>
      </Card>
    </article>
  );
}
export default Networks;
