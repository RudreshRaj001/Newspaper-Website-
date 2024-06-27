import { getName } from "@/app/actions";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  const name = await getName();

  return (
    <div className="py-20 flex flex-col items-center pt-10 justify-center ">
      <p className="text-5xl font-serif mb-10">
        This is home Page
      </p>

      {/* show name if name is present else show signin button */}

      {name ? (
        <p className="text-2xl">Welcome {" "}
          <span className="underline">{name}</span></p>
      ) : (
        <Link href="/signin" className={`${buttonVariants({ variant: 'default' })}`}>
          Sign In
        </Link>
      )}


    </div>
  );
}
