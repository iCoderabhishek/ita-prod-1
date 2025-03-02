import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex mt-16 items-center justify-center">
      <SignIn />;
    </div>
  );
}
