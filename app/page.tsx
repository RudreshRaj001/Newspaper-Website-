import { getAllBlogs, getName } from "@/app/actions";
import BlogCard from "@/components/BlogCard";
import AllCategories from "@/components/Home/AllCategories";
import TopBlogs from "@/components/TopBlogs";
import { Search } from "lucide-react";


export default async function Home() {
  const name = await getName();
  const blogs = await getAllBlogs();
  return (
    <div className="py-20 flex  bg-secondary h-full px-20 gap-8">
      <div className=" w-1/3 max-w-sm flex flex-col gap-5">
        <div className="relative">
          <input type="text" className="py-4 px-5 pr-12 rounded-full bg-white shadow-md w-full" placeholder="Search" />
          <Search className="absolute right-5 top-4 text-muted-foreground" size={20}/>
        </div>
        <AllCategories />
        <TopBlogs />
      </div>
      <div className=" w-2/3 
        grid
        grid-cols-2        
        gap-5

      ">
        {blogs.map((blog, index) => (
          <BlogCard key={index} blog={blog} />
        ))}

      </div>


    </div>
  );
}
