// // src/app/sign-up/complete/page.tsx

// import { auth, currentUser } from "@clerk/nextjs/server";
// import { addUserToDB } from "@/lib/actions/add-user-to-db"; // you'll create this
// import { redirect } from "next/navigation";

// export default async function SignUpComplete() {
//   const { userId } = auth();

//   if (userId) {
//     const user = await currentUser();
//     await addUserToDB(user); // You define this action
//   }

//   redirect("/dashboard"); // or wherever you want to go
// }
