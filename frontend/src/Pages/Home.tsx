import axios from "axios";
import Applayout from "../Components/Applayout";
import ContentCard from '../Components/ContentCard'
import { useEffect, useState } from "react";


interface UserType {
  username:string,
  _id?:string
}

interface TagsType {
  _id:string,
  title:string,
}
interface ContentType {
  _id:string,
  tags:TagsType[],
  title:string,
  type:string,
  url:string,
  user:UserType,
  __v?: number
}

const Home = () => {
    const [contents,setContents] = useState<ContentType[]>([])
    const fetchContents = async () => {
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:3000/api/v1/content`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const fetchedData: ContentType[] = response.data.data;
      setContents(fetchedData);
      
    } catch (err) {
      console.error("Error fetching contents:", err);
    } 
  };

  useEffect(() => {
    fetchContents();
  },[]);


  
    console.log(contents)

    // const content = fetchContent
    return ( 
        <>
        <Applayout>
          <div className="  grid grid-cols-1 lg:grid-cols-3 justify-center lg:justify-around  gap-x-2 w-full h-screen bg-gray-400 overflow-auto">
              {contents.map(content=>(
                <ContentCard key={content._id} content={content} />
              ))}
              
          </div>
        </Applayout>
        </>
     );
}
 
export default Home;