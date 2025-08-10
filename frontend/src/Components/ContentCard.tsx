import { Share1Icon, TrashIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/Card";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

interface UserType {
  username: string;
  _id?: string;
}

interface TagsType {
  _id: string;
  title: string;
}

interface ContentType {
  _id: string;
  tags: TagsType[];
  title: string;
  type: string;
  url: string;
  user: UserType;
  __v?: number;
}

function getEmbedUrl(url: string, type: string): string {
  if (type === "video" && url.includes("youtube.com/watch?v=")) {
    const id = url.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${id}`;
  }
  return url;
}

function ContentCard({ content }: ContentType) {
  const [isTweet, setIsTweet] = useState<boolean>(false);

  async function handleDelete(id:string){
    const contentId = id;
    try{
      const token = localStorage.getItem('token')
      await axios.post(`http://localhost:3000/api/v1/content/${contentId}`,
        {
          header:{
            'Authorization': `Bearer ${token}`
          }
        }
      )
      console.log(id)
    }catch(err){
      console.log('Error in deleting Content',err)
      console.log(id)
    }
  }

  useEffect(() => {
    if (content.url.includes("twitter.com")|| content.type==='tweet') {
      setIsTweet(true);

      // Load Twitter script
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.charset = "utf-8";
      document.body.appendChild(script);
    } else {
      setIsTweet(false);
    }
  }, [content.url,content.type]);

  return (
    <div className="p-3 m-4 w-85">
      <Card>
        <CardHeader>
          <div className="text-white">
            {isTweet && <TwitterLogoIcon />}
          </div>
          <div className="font-semibold">
            {content.title}
          </div>
          <div className=" flex text-white gap-x-3">
            <Share1Icon />
            <button className="cursor-pointer" onClick={()=>handleDelete(content._id)}>
              <TrashIcon />
            </button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="h-max-fit w-max-fit">
            {isTweet ? (
              <blockquote className="twitter-tweet border-transparent h-5">
                <a href={content.url}></a>
              </blockquote>
            ) : (
              <iframe
                className="border-none w-full h-64 rounded-lg"
                src={getEmbedUrl(content.url, content.type)}
                title={content.title}
                allowFullScreen
                loading="lazy"
              ></iframe>
            )}
          </div>
        </CardContent>

        <CardFooter>
          <div className="grid grid-cols-3 gap-2">
            {content.tags.map((tag: TagsType) => (
              <div
                key={tag._id}
                className="bg-cyan-100 text-cyan-300 rounded-2xl cursor-pointer flex justify-around px-2 py-1 text-sm"
              >
                {tag.title.startsWith('#') ? tag.title : `#${tag.title}`}
              </div>
            ))}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ContentCard;
