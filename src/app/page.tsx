import { Hero } from "@/components/hero";
import contentfulClient from "@/contentful/contentfulClient";
import {
  TypeBlogPostSkeleton,
  IContentfulAsset,
} from "@/contentful/types/blogPost.types";
import Image from "next/image";
import Link from "next/link";

const getBlogPostsContentful = async () => {
  try {
    const data = await contentfulClient.getEntries<TypeBlogPostSkeleton>();
    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
  }
};
export default async function Home() {
  const posts = await getBlogPostsContentful();
  return (
    <div className="py-14 bg-white">
      <Hero />
      <div className="flex flex-wrap gap-5 pt-5 justify-center">
        {posts &&
          posts.items?.map((blog, idx) => (
            <div key={idx}>
              <Link href={`article/${blog.fields.slug}`}>
                <div className="max-w-md h-80 bg-white border border-gray-200 rounded-xl shadow dark:bg-gray-800 dark:border-gray-700">
                  <div className="relative h-[200px]">
                    <Image
                      src={`https:${
                        (blog.fields.image as IContentfulAsset)?.fields.file.url
                      }`}
                      alt="gambar"
                      fill
                      className="rounded-t-xl"
                    />
                  </div>
                  <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {blog.fields.title}
                  </h1>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
contentfulClient;
