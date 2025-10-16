import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import axiosInstance from "@/lib/axiosInstance";
import { Spinner } from "./ui/spinner";
import { toast } from "sonner";

function SignOutBtn() {
  const queryClient = useQueryClient();
  const { isPending, mutate: signOut } = useMutation({
    mutationFn: async function () {
      const res = await axiosInstance.delete("/auth/sign-out");
      return res.data as string;
    },
  });

  const handleSignOut = () => {
    signOut(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["user"],
        });
        toast.success("Signed out");
      },
      onError: () => {},
    });
  };

  return (
    <Button variant={"outline"} onClick={handleSignOut}>
      {isPending ? <Spinner /> : "Sign Out"}
    </Button>
  );
}
export default SignOutBtn;
