"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "./ui/Dialog";
import Button from "./ui/Button";
import { CopyIcon } from "@radix-ui/react-icons";
import { CopyCheckIcon, Loader } from "lucide-react";
import api from "../config/api";
import toast from "react-hot-toast";

type FormDataType = {
  url: string;
  title: string;
  contentType: string;
  tags: string[];
};

const Navbar = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [tagInput, setTagInput] = useState("");
  const [link, setLink] = useState<string>("");
  const [shareable, setShareable] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormDataType>({
    url: "",
    title: "",
    contentType: "",
    tags: []
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "tags") {
      setTagInput(value);
      const tagsArray = value.split(/[ ,]+/).filter(Boolean);
      setFormData(prev => ({ ...prev, tags: tagsArray }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  useEffect(() => {
    if (shareable === null) return;

    const shareContent = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      try {
        const response = await api.post(
          "/api/v1/share",
          { share: shareable },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const returned = response.data.message;
        if (shareable) {
          setLink(typeof returned === "string" ? returned : returned?.link ?? JSON.stringify(returned));
          toast.success("Sharing enabled");
        } else {
          setLink("");
          toast.success("Sharing disabled");
        }
      } catch (err) {
        console.error("Error in sharing content", err);
        toast.error("Failed to toggle sharing");
      } finally {
        setLoading(false);
      }
    };

    shareContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shareable]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await uploadData();
    setModalOpen(false);
  };

  const handleCopy = async () => {
    try {
      if (!link) {
        toast("Nothing to copy");
        return;
      }
      await navigator.clipboard.writeText(link);
      toast.success("Link copied to clipboard");
    } catch (err) {
      console.error(err);
      toast.error("Copy failed");
    }
  };

  const uploadData = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await api.post(
        "/api/v1/content",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          withCredentials: true
        }
      );
      toast.success("Content uploaded");
      setFormData({ url: "", title: "", contentType: "", tags: [] });
      setTagInput("");
      return response.data;
    } catch (e) {
      console.error(e);
      const msg = e instanceof Error ? e.message : "Upload failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg:px-6 p-4 flex justify-between items-center bg-neutral-800 text-white">
      <div className="font-bold ml-4 flex items=center justify-between gap-x-2">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-600 to-violet-600 flex items-center justify-center shadow-lg">
              <span className="font-bold">PR</span>
             </div>
      <div className="text-xl font-semibold pt-1">Punk Records</div>
      </div>

      <div className="flex gap-x-4 items-center">
        {shareable && (
          <Button className="text-sm lg:text-xl p-1 rounded-md" variant="secondary" onClick={() => setShareable(false)}>
            Stop Sharing
          </Button>
        )}

        <Dialog>
          <DialogTrigger asChild>
            <Button
              disabled={Boolean(shareable)}
              className="text-sm lg:text-xl p-1 rounded-md"
              variant="secondary"
              onClick={() => setShareable(true)}
              type="button"
            >
              Share Content
            </Button>
          </DialogTrigger>

          <DialogContent className="bg-neutral-700 text-white">
            <DialogHeader>
              <DialogClose>X</DialogClose>
              <DialogTitle>Share your brain</DialogTitle>

              <div className="mt-3 mb-3 bg-zinc-600 text-sm text-gray-300 p-2 rounded-sm">
                {loading ? "…loading" : (link || "No share link yet")}
              </div>

              <div className="flex gap-2 items-center">
                <button
                  type="button"
                  onClick={handleCopy}
                  aria-label="Copy share link"
                  className="rounded p-1 hover:bg-gray-600"
                >
                  <CopyIcon />
                </button>
                <CopyCheckIcon className="h-5 w-5 text-green-400" />
              </div>

              <DialogDescription>Click on Share to share your contents</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogTrigger asChild>
            <Button className="text-xl p-1 rounded-md" variant="primary" type="button">
              Add Content
            </Button>
          </DialogTrigger>

          <DialogContent className="bg-neutral-200 text-black">
            <DialogHeader>
              <DialogTitle className="text-3xl">Add New Content</DialogTitle>
              <DialogDescription>Fill in the details to add your content.</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4 text-black">
              <div className="flex flex-col gap-1">
                <label htmlFor="url" className="font-medium">URL</label>
                <input
                  id="url"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  placeholder="https://example.com"
                  className="p-2 border rounded outline-none"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="title" className="font-medium">Title</label>
                <input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Awesome Resource"
                  className="p-2 border rounded outline-none"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="type" className="font-medium">Type</label>
                <input
                  id="type"
                  name="contentType"
                  value={formData.contentType}
                  onChange={handleChange}
                  placeholder="Video, Blog, Tool, etc."
                  className="p-2 border rounded outline-none"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="tags" className="font-medium">Tags</label>
                <input
                  id="tags"
                  name="tags"
                  value={tagInput}
                  onChange={handleChange}
                  className="p-2 border rounded outline-none"
                  placeholder="eg: react ui"
                />
                <p className="text-sm text-gray-600">Separate tags by space or comma</p>
              </div>

              <DialogFooter className="flex gap-3 justify-end pt-4">
                <Button type="button" variant="danger" className="p-2 rounded-md cursor-pointer" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="secondary" className="p-2 rounded-md cursor-pointer" disabled={loading}>
                  {loading ? <Loader className="animate-spin" /> : "Submit"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Navbar;
