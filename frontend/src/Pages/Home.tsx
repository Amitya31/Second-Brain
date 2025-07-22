import axios from "axios";
import Applayout from "../Components/Applayout";
import ContentCard from '../Components/ContentCard'
import { useEffect, useState } from "react";
import { useModal } from "../Hooks/useModal";


interface Content {
  id:string,
  url:string,
  user:string,
  type:string,
  title:string,
  tags:string,
}

const Home = () => {
    const [contents,setContents] = useState<Content[]>([])
    const {isOpen} = useModal()
    const fetchContents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:3000/api/v1/content`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setContents(response.data);
      console.log(contents)
      
    } catch (err) {
      console.error("Error fetching contents:", err);
    } 
  };

  useEffect(() => {
    fetchContents();
  },[]);

    // const content = fetchContent
    return ( 
        <>
        <Applayout>
          <div className="  grid grid-cols-1 lg:grid-cols-3 justify-center lg:justify-around  gap-x-2 w-full h-screen bg-gray-400 overflow-auto">
              <ContentCard />
          </div>
        </Applayout>
          
          
          
          
        </>
     );
}
 
export default Home;