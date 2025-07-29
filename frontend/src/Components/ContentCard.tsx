
import { Share1Icon, TrashIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/Card";
import { useEffect, useState } from "react";

interface UserType {
  username:string,
  _id?:string
}
interface ContentType {
  _id:string,
  tags:string[],
  title:string,
  type:string,
  url:string,
  user:UserType,
  __v?: number
}

function ContentCard({content}:ContentType) {
  const [isTweet,setIsTweet] = useState<boolean>(false)

  const tags :Array<string> = [
    '#productivity',
    '#tech',
    '#work',
    'needs'
  ]
  

  useEffect(() => {

    if (content.url.includes("twitter.com")) {
      setIsTweet(true);
    }
  }, [content]);
  return (
    <div className="p-3 m-4 w-85 ">
    <Card>
    <CardHeader>
        <div className="text-white " >
          {isTweet && <TwitterLogoIcon />}
        </div>
        <div className="font-semibold">
          {content.title}  
        </div>
        <div className="flex text-white gap-x-3">
          <Share1Icon />
          <TrashIcon />
        </div>
    </CardHeader>
    <CardContent>
      <div className="h-max-fit w-max-fit">
        <blockquote className="twitter-tweet border-transparent h-5 " >
          <a href={content}></a>
        </blockquote> 
      </div>
    </CardContent>
    <CardFooter>
      <div className="grid grid-cols-3 gap-2">
        {
        
        content.tags.map((tag=>{if(tag.title.includes('#')){
          return <div className="bg-cyan-100 text-cyan-300 rounded-2xl cursor-pointer bg-center flex justify-around">{tag}</div>
        }
          return <div className="bg-cyan-100 text-cyan-300 rounded-2xl cursor-pointer bg-center flex justify-around">#{tag}</div>
        }))}
      </div>
    </CardFooter>
    </Card>  
    </div>    
  )
}

export default ContentCard