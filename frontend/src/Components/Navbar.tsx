import Button from "./ui/Button";
import { HamburgerMenuIcon, PlusIcon, Share1Icon } from "@radix-ui/react-icons";
import { useModal } from "../Hooks/useModal";



const Navbar = () => {


  
  return ( 
        <>
        <div className=" lg:px-0 flex justify-end bg-gray-400">
        <Button variant="secondary" className="" >Share Content</Button>
        <Button variant="primary" className="">Add Content</Button>
        </div>
        </>
     );
}
 
export default Navbar;