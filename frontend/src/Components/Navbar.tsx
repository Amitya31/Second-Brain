"use client";

import { useState } from "react";
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

type FormData = {
  url: string;
  title: string;
  contentType: string;
  tags: string[];
};

const Navbar = () => {
  const [modalOpen,setModalOpen] = useState<boolean>(false)
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
    console.log(data)
  }catch(e){
    if(e instanceof Error)
    console.log(e.message)
  }
}

const handleShare = ()=>{
  
}

  return (
    <div className="lg:px-0 flex justify-end bg-gray-400 p-4 gap-x-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="text-xl" variant="secondary" onClick={handleShare}>Share Content</Button>
        </DialogTrigger>

        <DialogContent className="bg-black text-white">
          <DialogHeader>
            <DialogTitle >Share your brain</DialogTitle>
            <DialogDescription>
              Click on Share to share your contents
            </DialogDescription>
          </DialogHeader>

        </DialogContent>
      </Dialog>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogTrigger asChild>
          <Button className="text-xl" variant="primary">Add Content</Button>
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
                <Button className="text-xl" type="button" variant="secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>

              <Button className="text-xl" type="submit" variant="secondary">
                Submit
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Navbar;
