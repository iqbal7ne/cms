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

interface ArticleFields {
  title: string;
  image: IContentfulAsset;
  body: any; // Replace 'any' with the actual type if known @typescript-eslint/no-explicit-any
}

export default function Article() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<ArticleFields | null>(null);

  const fetchArticle = async () => {
    try {
      const { items } = await contentfulClient.getEntries<TypeBlogPostSkeleton>(
        {
          content_type: "blogPost",
          limit: 1,
          "fields.slug": slug,
        }
      );
      console.log(
        "=================================ini data slug/page ==============================="
      );
      console.log(items);

      if (items.length > 0) {
        setArticle(items[0].fields);
      }
    } catch (error) {
      console.error("Error fetching article:", error);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, [slug]);

  return (
    <div className="px-4 py-20">
      {article && (
        <div>
          <center>
            <header className="text-3xl font-bold">{article.title}</header>
            <div className="max-w-screen h-[500px] relative">
              <Image
                src={`https:${article.image.fields.file.url}`}
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
