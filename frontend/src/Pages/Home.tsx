import axios from "axios";
import Applayout from "../Components/Applayout";
import ContentCard from '../Components/ContentCard'
import { useEffect, useState } from "react";
import useContentType from "../Hooks/ContentTypeHook";


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
    const [filteredContent,setFilteredContent]=useState<ContentType[]>([])
    const {selectedType} = useContentType()
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


  useEffect(() => {
  if (selectedType){

  console.log("Filtering for:", selectedType);
  const filter = contents.filter(
    (content) => content.type.toLowerCase() === selectedType.toLowerCase()
  );
  console.log("Filtered result:", filter);
  setFilteredContent(filter)
  }else{
    
  setFilteredContent(contents);
  }

  
}, [contents, selectedType]);

useEffect(() => {
  console.log("filteredContent updated:", filteredContent);
}, [filteredContent]);


    // const content = fetchContent
    return ( 
        <>
      
          <div className="  grid grid-cols-1 lg:grid-cols-3 justify-center lg:justify-around  gap-x-2 w-full h-screen bg-black overflow-auto">
              {filteredContent.map(content=>(
                <ContentCard key={content._id} content={content} />
              ))}
              
          </div>
        
        </>
     );
}
 
export default Home;