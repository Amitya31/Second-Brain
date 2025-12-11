// SharedContent.tsx
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../config/api";
import toast from "react-hot-toast";
import { Share1Icon } from "@radix-ui/react-icons";

/* ---------- Types (same shape as ContentCard) ---------- */
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

/* ---------- Helpers ---------- */
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

/* ---------- Component ---------- */
export default function SharedContent() {
  const { sharedContent } = useParams<{ sharedContent: string }>();
  const [content, setContent] = useState<ContentType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isTweet, setIsTweet] = useState<boolean>(false);

  const embedUrl = useMemo(() => (content ? getEmbedUrl(content.url, content.type) : null), [content]);

  useEffect(() => {
    // try to fetch using two reasonable endpoints:
    // 1) shared-specific endpoint
    // 2) fallback to content by id
    if (!sharedContent) {
      setError("No shared content ID provided.");
      setLoading(false);
      return;
    }

    const fetchShared = async () => {
      setLoading(true);
      setError(null);
      try {
        // try shared endpoint first
       

        // fallback: content by id


        // final fallback: try a generic /share endpoint that may return url or content
        try {
          const alt = await api.get(`/api/v1/share/${sharedContent}`);
           console.log(alt.data)
          if (alt?.data?.data) {
           
            const d = alt.data.data;
            if (d._id && d.url) {
              setContent(d as ContentType);
              return;
            }
            // if alt returns a contentId, attempt to refetch
            if (typeof d === "string") {
              const next = await api.get(`/api/v1/content/${d}`);
              if (next?.data?.data) {
                setContent(next.data.data as ContentType);
                return;
              }
            }
          }
        } catch (e) {
          // final ignore
        }

        setError("Shared content not found.");
      } catch (err) {
        console.error("Error fetching shared content:", err);
        setError("Failed to load shared content.");
      } finally {
        setLoading(false);
      }
    };

    fetchShared();
  }, [sharedContent]);

  // Twitter widget injection & ensuring reflow on resize
  useEffect(() => {
    if (!content) return;
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
      // re-run widgets
      // @ts-ignore
      (window as any).twttr?.widgets?.load?.();
    }

    const onResize = () => {
      // @ts-ignore
      (window as any).twttr?.widgets?.load?.();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [content]);

  const handleCopy = async () => {
    if (!content) return;
    try {
      await navigator.clipboard.writeText(content.url);
      toast.success("Link copied to clipboard");
    } catch (err) {
      console.error("copy failed", err);
      toast.error("Failed to copy link");
    }
  };

  if (loading) {
    return (
      <div className="p-6 w-full h-full flex items-center justify-center">
        <div className="animate-pulse space-y-2 w-full max-w-3xl">
          <div className="h-8 bg-white/20 rounded w-2/3" />
          <div className="h-64 bg-white/10 rounded mt-4" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 w-full h-full flex items-start justify-center">
        <div className="max-w-3xl w-full bg-white/10 p-6 rounded">
          <h2 className="text-xl font-semibold mb-2">Unable to load</h2>
          <p className="text-sm mb-4">{error}</p>
          <p className="text-sm text-muted-foreground">Check the link or contact the owner for a valid share link.</p>
        </div>
      </div>
    );
  }

  if (!content) {
    return null;
  }

  return (
    <div className="p-6 w-full h-full flex items-start justify-center bg-neutral-400 overflow-auto">
      <div className="w-full max-w-3xl">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{content.title}</h1>
            <div className="text-sm text-white/80 mt-1">
              {content.user?.username ? `By ${content.user.username}` : "By unknown"}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="px-3 py-1 rounded bg-black text-white hover:bg-gray-800"
            >
              <span className="inline-flex items-center gap-2">
                <Share1Icon />
                Copy link
              </span>
            </button>

            <a
              href={content.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 rounded bg-white/10 text-white hover:bg-white/20"
            >
              Open original
            </a>
          </div>
        </div>

        <div className="bg-gradient-to-b from-neutral-900 to-neutral-800 border border-white/10 shadow-xl rounded-xl overflow-hidden p-4">
          {/* embed container - constrain overflow so Twitter iframe doesn't escape */}
          <div className="w-full overflow-hidden rounded-lg">
            {isTweet && (
              <div className="prose max-w-full">
                <blockquote className="twitter-tweet max-w-full overflow-hidden">
                  <a href={content.url}>{content.url}</a>
                </blockquote>
              </div>
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
              <div className="p-4 bg-white/5 rounded-md break-words">
                <a href={content.url} target="_blank" rel="noopener noreferrer" className="text-sm underline break-words">
                  {content.url}
                </a>
                <div className="mt-2 text-sm text-white/80">Type: {content.type}</div>
              </div>
            )}
          </div>

          {/* tags */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            {content.tags?.map((t) => (
              <div
                key={t._id}
                className="inline-block bg-cyan-100 text-cyan-800 rounded-full px-3 py-1 text-sm truncate"
                title={t.title.startsWith("#") ? t.title : `#${t.title}`}
              >
                {t.title.startsWith("#") ? t.title : `#${t.title}`}
              </div>
            ))}
          </div>
        </div>

        {/* small footer info */}
        <div className="mt-4 text-xs text-white/70">
          Shared link ID: <span className="font-mono">{sharedContent}</span>
        </div>
      </div>
    </div>
  );
}
