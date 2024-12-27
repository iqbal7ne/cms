import contentfulClient from "@/contentful/contentfulClient";
import {
  IContentfulAsset,
  TypeBlogPostSkeleton,
} from "@/contentful/types/blogPost.types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const mainPost = async () => {
  try {
    const data = await contentfulClient.getEntries<TypeBlogPostSkeleton>({
      content_type: "blogPost",
      limit: 1,
    });
    // console.log(data);

    return data;
  } catch (error) {
    console.log(error);
  }
};
export async function Hero() {
  const posts = await mainPost();
  console.log(
    "=============================ini data posts di hero ========================================="
  );

  console.log(posts);

  return (
    <div>
      {posts?.items.map((blog, idx) => (
        <div key={idx}>
          <div className="hero bg-base-200 min-h-56">
            <div className="hero-content flex-col lg:flex-row">
              <div className=" w-6/12 h-[300px]  rounded-lg shadow-2xl relative">
                <Image
                  src={`https:${
                    (blog.fields.image as IContentfulAsset)?.fields.file.url
                  }`}
                  alt="gambar"
                  fill
                  className="rounded-t-xl"
                />
              </div>
              <div>
                <p>{blog.fields.title}</p>
                <Link href={`article/${blog.fields.slug}`}>
                  <button className="btn btn-primary">go to article</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
