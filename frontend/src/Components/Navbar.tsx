import Button from "./ui/Button";
import { PlusIcon, Share1Icon } from "@radix-ui/react-icons";

const Navbar = () => {
    const hero = ()=>{
    console.log('User clicked')
  }

  
  return ( 
        <>
        <div className=" flex justify-end gap-x-4 p-4 w-full h-20 bg-linear-150 from-gray-300 to-gray-600 border-b-black">
            <Button variant='primary' className='text-xl ml-7' onClick={hero} startIcon={<Share1Icon/>}>
               Share Content
            </Button>
            <Button variant='secondary' className='text-xl mr-7' onClick={hero} startIcon={<PlusIcon />}>
               Create 
            </Button>
        </div>
        </>
     );
}
 
export default Navbar;