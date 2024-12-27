"use client";

import { useState, useEffect } from "react";
import {
  IContentfulAsset,
  TypeBlogPostSkeleton,
} from "@/contentful/types/blogPost.types";
import contentfulClient from "@/contentful/contentfulClient";
import Image from "next/image";
import { useParams } from "next/navigation";
import RichText from "@/components/global/richText";

export default function Article() {
  const params = useParams<{ slug: string }>();
  const [article, setArticle] = useState<any>();

  const fetchArticle = async () => {
    try {
      const data = await contentfulClient.getEntries<TypeBlogPostSkeleton>({
        content_type: "blogPost",
        limit: 1,
        "fields.slug": params.slug,
      });
      setArticle(data.items[0].fields);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, []);

  return (
    <div className=" px-4 py-20">
      {article && (
        <div className="">
          <center className="align">
            <header className="text-3xl font-bold">{article?.title}</header>
            <div className=" max-w-screen h-[500px] relative">
              <Image
                src={`https:${
                  (article?.image as IContentfulAsset)?.fields.file.url
                }`}
                fill
                style={{ objectFit: "cover" }}
                alt="article-image"
              />
            </div>
          </center>
          <RichText document={article.body} />
        </div>
      )}
    </div>
  );
}
