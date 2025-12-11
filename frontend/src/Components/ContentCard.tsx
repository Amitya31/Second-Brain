import { Share1Icon, TrashIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/Card";
import { useEffect, useMemo, useState } from "react";
import api from "../config/api";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/Dialog";
import Button from "./ui/Button";
import toast from "react-hot-toast";

interface UserType {
  username: string;
  _id?: string;
}

interface TagsType {
  _id: string;
  title: string;
}

interface ContentType {
  _id: string;
  tags: TagsType[];
  title: string;
  type: string;
  url: string;
  user: UserType;
  __v?: number;
}

function ContentCard({
  content,
  onDeleted,
}: {
  content: ContentType;
  onDeleted?: (id: string) => void; // optional callback so parent can remove the card
}) {
  const [isTweet, setIsTweet] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [loadingShare, setLoadingShare] = useState<boolean>(false);

  // build embed URL for known providers (YouTube handled)
  function getEmbedUrl(url: string, type: string) {
    try {
      const parsedUrl = new URL(url);

      if ((parsedUrl.hostname.includes("youtube.com") || parsedUrl.hostname.includes("www.youtube.com")) && type === "video") {
        const videoId = parsedUrl.searchParams.get("v");
        if (videoId) return `https://www.youtube.com/embed/${videoId}`;
      }

      if ((parsedUrl.hostname.includes("youtu.be") || parsedUrl.hostname === "youtu.be") && type === "video") {
        const videoId = parsedUrl.pathname.slice(1);
        if (videoId) return `https://www.youtube.com/embed/${videoId}`;
      }

      return null;
    } catch (error) {
      console.error("Invalid URL:", error);
      return null;
    }

  }

  const embedUrl = useMemo(() => getEmbedUrl(content.url, content.type), [content.url, content.type]);

  // only add twitter widgets script once
  useEffect(() => {
    const isTwitter = content.url.includes("twitter.com") || content.type === "tweet";
    setIsTweet(isTwitter);

    if (!isTwitter) return;

    const scriptId = "twitter-wjs";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.charset = "utf-8";
      document.body.appendChild(script);
    } else {
      // If script already present, try to re-render widgets (safe no-op if not loaded yet)
      // @ts-ignore
      if ((window as any).twttr && (window as any).twttr.widgets) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        (window as any).twttr.widgets.load?.();
      }
    }
  }, [content.url, content.type]);

  // delete content
  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this content?")) return;

    setDeleting(true);
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/api/v1/content/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Content deleted");
      if (typeof onDeleted === "function") onDeleted(id);
    } catch (err) {
      console.error("Error in deleting Content", err);
      toast.error("Failed to delete content");
    } finally {
      setDeleting(false);
    }
  }

  const handleShare = async () => {
    setLoadingShare(true);
    try {
      await navigator.clipboard.writeText(content.url);
      toast.success("Link copied to clipboard");
    } catch (err) {
      console.error("Copy failed", err);
      toast.error("Failed to copy link");
    } finally {
      setLoadingShare(false);
    }
  };

  const typeColors: Record<string, string> = {
  video: "from-red-600 to-red-800",
  audio: "from-blue-600 to-blue-800",
  document: "from-green-600 to-green-800",
  tweet: "from-sky-600 to-sky-800",
};


  return (
    <div className="p-3 m-4 w-full max-w-md">
      <Card className={`bg-gradient-to-b ${
    typeColors[content.type] || "from-neutral-800 to-neutral-900"
  } border border-white/10 shadow-xl rounded-xl transition-all duration-300 hover:shadow-2xl`}>
        <CardHeader>
          <div className="flex items-center gap-3">
            {isTweet ? <TwitterLogoIcon className="h-5 w-5 text-white" /> : null}
            <div className="font-semibold text-white">{content.title}</div>
          </div>

          <div className="flex items-center gap-3">
            {/* Share / copy */}
            <button
              type="button"
              aria-label="Share copy link"
              onClick={handleShare}
              disabled={loadingShare}
              className="p-1 rounded hover:bg-white/10"
            >
              <Share1Icon className="h-4 w-4 text-white" />
            </button>

            <Dialog>
              <DialogTrigger asChild>
                <button type="button" className="p-1 rounded hover:bg-white/10" aria-label="Open delete dialog">
                  <TrashIcon className="h-4 w-4 text-white" />
                </button>
              </DialogTrigger>

              <DialogContent className="bg-black text-white max-w-sm">
                <DialogHeader className="flex items-center justify-between">
                  <DialogTitle>Delete the Content</DialogTitle>
                  <DialogClose className="cursor-pointer">X</DialogClose>
                </DialogHeader>

                <div className="py-4">
                  <p>Are you sure you want to delete this content?</p>
                </div>

                <div className="flex gap-2 justify-end">
                  <Button className="" type="button" variant="primary" onClick={() => {}} >
                    Cancel
                  </Button>
                  <Button
                    className=""
                    type="button"
                    variant="danger"
                    onClick={() => handleDelete(content._id)}
                    disabled={deleting}
                  >
                    {deleting ? "Deleting..." : "Delete"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>

        <CardContent>
          <div className="w-full">
           {/* Embed wrapper: keeps iframe/tweet within bounds */}
            <div className="relative w-full overflow-hidden rounded-lg">
              {isTweet && (
                <blockquote className="twitter-tweet max-w-full !important overflow-hidden">
                  <a href={content.url}>{content.url}</a>
                </blockquote>
              )}

              {embedUrl && (
                <div className="w-full overflow-hidden rounded-lg">
                  <iframe
                    className="border-none w-full max-w-full h-64 rounded-lg"
                    src={embedUrl}
                    title={content.title}
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              )}

            {!isTweet && !embedUrl && (
              <div className="p-4 bg-white/10 rounded-md">
                <a href={content.url} target="_blank" rel="noopener noreferrer" className="text-sm underline break-words">
                  {content.url}
                </a>
                <div className="mt-2 text-sm text-white/80">Type: {content.type}</div>
                {content.user?.username && <div className="mt-1 text-xs text-white/60">By {content.user.username}</div>}
              </div>
            )}
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <div className="grid grid-cols-3 gap-2 w-full">
            {content.tags?.map((tag: TagsType) => (
              <div
                key={tag._id}
                className="bg-cyan-100 text-cyan-800 rounded-full cursor-pointer px-3 py-1 text-sm text-center truncate"
                title={tag.title.startsWith("#") ? tag.title : `#${tag.title}`}
              >
                {tag.title.startsWith("#") ? tag.title : `#${tag.title}`}
              </div>
            ))}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ContentCard;
