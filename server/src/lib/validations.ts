import z from "zod";

export const signUpSchema = z.object({
  firstName: z.string().nonempty("First name is required"),
  lastName: z.string().nonempty("Last name is required"),
  email: z.email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 digits long"),
});
export const signInSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().nonoptional("Password is required"),
});
//  {
//   body: {
//     type: "object",
//     required: ["firstName", "lastName", "email", "password"],
//     properties: {
//       firstName: { type: "string" },
//       lastName: { type: "string" },
//       email: { type: "string" },
//       password: { type: "string" },
//     },
//   },
// };
