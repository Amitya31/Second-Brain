
import { Share1Icon, TrashIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/Card";
import { useEffect, useState } from "react";

function ContentCard() {
  const [isTweet,setIsTweet] = useState<boolean>(false)

  const tweet:string = "https://twitter.com/pratyush__dev/status/1935628528961159299"

  const tags :Array<string> = [
    '#productivity',
    '#tech',
    '#work',
    'needs'
  ]

  useEffect(() => {
    if (tweet.includes("twitter.com")) {
      setIsTweet(true);
    }
  }, [tweet]);
  return (
    <div className="p-3 m-4">
      <Card>
    <CardHeader>
        <div className="text-gray-400 " >
          {isTweet && <TwitterLogoIcon />}
        </div>
        <div className="font-semibold font-">
          content.title  
        </div>
        <div className="flex text-gray-400 gap-x-3">
          <Share1Icon />
          <TrashIcon />
        </div>
    </CardHeader>
    <CardContent>
      <div className="max-h-fit">
        <blockquote className="twitter-tweet border-transparent" >
          <a href="https://twitter.com/pratyush__dev/status/1935628528961159299"></a>
        </blockquote> 
      </div>
    </CardContent>
    <CardFooter>
      <div className="grid grid-cols-3 gap-2">
        {tags.map((tag=>{if(tag.includes('#')){
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