import Applayout from "../Components/Applayout";
import ContentCard from '../Components/ContentCard'


const Home = () => {

    // const fetchContent: ()=>{}
    // useEffect(()=>{
    //     async fetchContent(){
    //         try{
    //             const response = await axios.get('/')
    //             const content = res.data
    //             return content
    //         }catch{

    //         }
    //     }
    // },[])

    // const content = fetchContent
    return ( 
        <>
        <Applayout>
            <div className="px-35 py-10 grid grid-cols-3 justify-around gap-x-2 w-full h-214 bg-gray-400 overflow-auto">
                <ContentCard

                />
                
            </div>
          </Applayout>
        </>
     );
}
 
export default Home;