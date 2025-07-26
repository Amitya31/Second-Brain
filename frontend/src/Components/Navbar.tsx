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

type FormData = {
  url: string;
  title: string;
  type: string;
  tags: string[];
};

const Navbar = () => {
  const [formData, setFormData] = useState<FormData>({
    url: "",
    title: "",
    type: "",
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
  };

  return (
    <div className="lg:px-0 flex justify-end bg-gray-400 p-4 gap-x-4">
      <Button className="text-xl" variant="secondary">Share Content</Button>

      <Dialog>
        <DialogTrigger asChild>
          <Button className="text-xl" variant="primary">Add Content</Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Content</DialogTitle>
            <DialogDescription>
              Fill in the details to add your content.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
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

            <div>
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

            <div>
              <label htmlFor="type">Type</label>
              <input
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                placeholder="Video, Blog, Tool, etc."
                required
              />
            </div>

            <div>
              <label htmlFor="tags">Tags</label>
              <input
                id="tags"
                name="tags"
                value={formData.tags.join(" ")}
                onChange={handleChange}
                placeholder="#react #ui"
              />
            </div>

            <DialogFooter className="pt-4">
              <DialogClose asChild>
                <Button className="text-xl" type="button" variant="primary">
                  Cancel
                </Button>
              </DialogClose>

              <Button className="text-xl" type="submit" variant="primary">
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
