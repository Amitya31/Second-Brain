"use client";

import { useEffect, useState } from "react";
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
import axios from "axios";
import { CopyIcon } from "@radix-ui/react-icons";
import { CopyCheckIcon, Loader } from "lucide-react";

type FormData = {
  url: string;
  title: string;
  contentType: string;
  tags: string[];
};

const Navbar = () => {
  const [modalOpen,setModalOpen] = useState<boolean>(false)
  const [link,setLink] = useState<string>('')
  const [shareable,setShareable] = useState<boolean|null>()
  const [loading,setLoading] = useState<boolean>(true)
  const [formData, setFormData] = useState<FormData>({
    url: "",
    title: "",
    contentType: "",
    tags: []
  });
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "tags") {
      const tagsArray = value.split(/[ ,]+/).filter(Boolean); // split on space or comma
      setFormData((prev) => ({ ...prev, tags: tagsArray }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  console.log("Submitted:", formData);
  
  // Handle submission logic here (API call, validation, etc.)
  uploadData();

  setModalOpen(prev=>!prev)
};

const handleCopy = ()=>{
  console.log('copied')

}



useEffect(()=>{
  const shareContent = async ()=>{
  
  try {
    const token = localStorage.getItem('token')
    
    const response = await axios.post('http://localhost:3000/api/v1/share',{share:shareable},
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    )
    if(shareable){
      console.log(response.data)
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
},[shareable]) 

const uploadData = async ()=>{
  try{
    const token =localStorage.getItem('token')
    const response = await axios.post('http://localhost:3000/api/v1/content',formData,
        {
        headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
        }
    );
    const data = response.data;
    setLink(`http://localhost:5173/content/${data}`)
    setLoading(false)
  }catch(e){
    if(e instanceof Error)
    console.log(e.message)
  }
  
}

  return (
    <div className="lg:px-0 flex justify-end bg-black p-4 gap-x-4">
      {shareable && <Button className="text-xl p-1 rounded-md" variant="secondary" onClick={()=>setShareable(false)}>Stop Sharing</Button>}
      <Dialog>
        <DialogTrigger asChild>
          <Button disabled={shareable?true:false} className="text-xl p-1 rounded-md" variant="secondary" onClick={()=>setShareable(true)}>Share Content</Button>
        </DialogTrigger>

        <DialogContent className="bg-black text-white">
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
      </Dialog>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogTrigger asChild>
          <Button className="text-xl p-1 rounded-md" variant="primary">Add Content</Button>
        </DialogTrigger>

        <DialogContent className="bg-black ">
          <DialogHeader className=" text-white/40">
            <DialogTitle className="ml-33">Add New Content</DialogTitle>
            <DialogDescription className="ml-23">
              Fill in the details to add your content.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4 text-white flex flex-col gap-y-2 ml-25">
            <div className="flex gap-x-4 w-20">
              <label htmlFor="url">URL</label>
              <input
                id="url"
                name="url"
                value={formData.url}
                onChange={handleChange}
                placeholder="https://example.com"
                required
              />
            </div>

            <div className="flex gap-x-4">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Awesome Resource"
                required
              />
            </div>

            <div className="flex gap-x-4">
              <label htmlFor="type">Type</label>
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
              <label htmlFor="tags">Tags</label>
              <input
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="#react #ui"
              />
            </div>

            <DialogFooter className="pt-4">
                <Button className="text-xl" type="button" variant="danger" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>

              <Button className="text-xl" disabled={loading?false:true} type="submit" variant="secondary">
                {loading?<Loader/>:'Submit'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Navbar;
