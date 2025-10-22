"use client";

import {  useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "./ui/Dialog"; // update this path if needed
import  Button  from "./ui/Button";
import { CopyIcon } from "@radix-ui/react-icons";
import { CopyCheckIcon, Loader } from "lucide-react";
import api from "../config/api";


type FormData = {
  url: string;
  title: string;
  contentType: string;
  tags: string[];
};

const Navbar = () => {
  const [modalOpen,setModalOpen] = useState<boolean>(false)
  const [tagInput, setTagInput] = useState("");
  const [link,setLink] = useState<string>('')
  const [shareable,setShareable] = useState<boolean|null>()
  const [loading,setLoading] = useState<boolean>(false)
  const [formData, setFormData] = useState<FormData>({
    url: "",
    title: "",
    contentType: "",
    tags: []
  });
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "tags") {
      setTagInput(value); // keep typing smooth
      const tagsArray = value.split(/[ ,]+/).filter(Boolean); // split by space/comma
      setFormData((prev) => ({ ...prev, tags: tagsArray }));
      
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  console.log("Submitted:", formData);
  console.log(formData)
  
  // Handle submission logic here (API call, validation, etc.)
  await uploadData();

  setModalOpen(prev=>!prev)
};

const handleCopy = ()=>{
  console.log('copied')

}




const shareContent = async ()=>{

try {
  const token = localStorage.getItem('token')
  
  const response = await api.post('/api/v1/share',{share:shareable},
    {
      headers:{
        Authorization:`Bearer ${token}`
      }
    }
  )
  if(shareable){
    console.log(response.data)
    setLink(response.data)
  }else{
    console.log("Sharing Stopped",response.data)
  }
  setLoading(false)
} catch (err){
  console.log('Error in sharing content',err)
}
}
if(shareable!==null){
  shareContent()
}
 

const uploadData = async ()=>{
  try{
    const token = await localStorage.getItem('token')
    const response = await api.post('/api/v1/content',formData,
        {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true
      }
    );
    const data = response.data;
    console.log(data)
    setLoading(false)
  }catch(e){
    if(e instanceof Error)
    console.log(e.message)
  }
  
}

  return (
    <div className="lg:x-0 p-4 flex justify-between bg-neutral-300 ">
      <h1 className=" text-xl lg:text-3xl font-bold bg-clip-text ml-12 bg-transparent bg-gradient-to-b from-neutral-300 to-neutral-400">Punk Records</h1>
      <div className="flex gap-x-4 justify-end">
        {shareable && <Button className="text-xl flex p-1 rounded-md" variant="secondary" onClick={()=>setShareable(false)}>Stop Sharing</Button>}
      <Dialog >
        <DialogTrigger asChild>
          <Button disabled={shareable?true:false} className="text-sm lg:text-xl p-1 rounded-md" variant="secondary" onClick={()=>setShareable(true)}>Share Content</Button>
        </DialogTrigger>

        <DialogContent className="bg-neutral-300 text-white ">
          <DialogHeader>
            <DialogClose>X</DialogClose>
            <DialogTitle >Share your brain</DialogTitle>
            <div className="flex"></div>
            <div className="bg-zinc-600 text-xl text-gray-300 p-1 rounded-sm">
              {loading?'...loading':link}
            </div>
            <button onClick={handleCopy}>
              <CopyIcon/>
              <CopyCheckIcon/>
            </button>
            <DialogDescription>
              
              Click on Share to share your contents
            </DialogDescription>
          </DialogHeader>

        </DialogContent>
      </Dialog >

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogTrigger asChild>
          <Button className="text-xl p-1 rounded-md" variant="primary">Add Content</Button>
        </DialogTrigger>

        <DialogContent className="bg-neutral-200 ">
          <DialogHeader className=" text-black">
            <DialogTitle className=" text-4xl">Add New Content</DialogTitle>
            <DialogDescription className="ml-23">
              Fill in the details to add your content.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4 text-black flex flex-col gap-y-2 ml-25 ">
            <div className="flex gap-x-4 w-20">
              <label htmlFor="url" className="mt-1 text-xl">URL</label>
              <input
                id="url"
                name="url"
                value={formData.url}
                onChange={handleChange}
                placeholder="https://example.com"
                className="text-xl outline-0 focus:outline-1 outline-neutral-300"
                required
              />
            </div>

            <div className="flex gap-x-4">
              <label htmlFor="title" className="mt-1 text-xl">Title</label>
              <input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Awesome Resource"
                className="text-xl outline-0 focus:outline-1 outline-neutral-300"
                required
              />
            </div>

            <div className="flex gap-x-4">
              <label htmlFor="type" className="mt-1 text-xl" >Type</label>
              <input
                id="type"
                name="contentType"
                value={formData.contentType}
                onChange={handleChange}
                placeholder="Video, Blog, Tool, etc."

                required
              />
            </div>

            <div className="flex gap-x-4">
              <label htmlFor="tags" className="mt-1 text-xl">Tags</label>
              <input
                id="tags"
                name="tags"
                value={tagInput}
                onChange={handleChange}
                className="text-xl outline-0 focus:outline-1 outline-neutral-300"
                placeholder="eg:#react,#ui"
              />
            </div>

            <DialogFooter className="pt-4 mr-35">
                <Button className="text-xl px-3 py-1 rounded-sm border-1 " type="button" variant="danger" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>

              <Button className="text-xl px-3 py-1 rounded-sm " disabled={loading} type="submit" variant="secondary">
                {loading ? <Loader className="animate-spin" /> : 'Submit'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog></div>
    </div>
  );
};

export default Navbar;
