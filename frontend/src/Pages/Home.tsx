import ContentCard from "../Components/ContentCard";
import { useCallback, useEffect, useMemo, useState } from "react";
import useContentType from "../Hooks/ContentTypeHook";
import api from "../config/api";
import toast from "react-hot-toast";

/* ---------- Types ---------- */
interface UserType {
  username: string;
  _id?: string;
}

interface TagsType {
  _id: string;
  title: string;
}

export interface ContentType {
  _id: string;
  tags: TagsType[];
  title: string;
  type: string;
  url: string;
  user: UserType;
  __v?: number;
}

const Home = () => {
  const [contents, setContents] = useState<ContentType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState<string>(""); // search text
  const [debouncedQuery, setDebouncedQuery] = useState<string>(""); // debounced search
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const { selectedType } = useContentType();

  useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(query.trim()), 300);
    return () => clearTimeout(id);
  }, [query]);

  const fetchContents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/api/v1/content", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      const fetchedData: ContentType[] = response.data?.data ?? [];
      setContents(fetchedData);
    } catch (err) {
      console.error("Error fetching contents:", err);
      setError("Failed to load content. Try refreshing.");
      toast.error("Failed to load content.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContents();
  }, [fetchContents]);


  const allTags = useMemo(() => {
    const set = new Map<string, TagsType>();
    contents.forEach((c) => c.tags?.forEach((t) => set.set(t.title, t)));
    return Array.from(set.values());
  }, [contents]);


  const filteredContent = useMemo(() => {
    let result = contents;

    if (selectedType) {
      result = result.filter((c) => c.type.toLowerCase() === selectedType.toLowerCase());
    }

    if (activeTag) {
      result = result.filter((c) => c.tags.some((t) => t.title.toLowerCase() === activeTag.toLowerCase()));
    }

    if (debouncedQuery) {
      const q = debouncedQuery.toLowerCase();
      result = result.filter((c) => c.title.toLowerCase().includes(q) || c.user?.username?.toLowerCase().includes(q));
    }

    return result.slice().reverse();
  }, [contents, selectedType, activeTag, debouncedQuery]);

  const onRefresh = async () => {
    await fetchContents();
    toast.success("Refreshed");
  };

  const handleCopyLink = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard");
    } catch (err) {
      console.error("Copy failed", err);
      toast.error("Copy failed");
    }
  };

  return (
    <div className="w-full h-full p-4 bg-neutral-400 overflow-auto">
      <div className="max-w-[1300px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">Explore Content</h2>
            <p className="text-sm text-gray-700">Browse content uploaded by the community</p>
          </div>

          <div className="flex gap-3 items-center w-full lg:w-auto">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title or author..."
              className="flex-1 lg:flex-none px-3 py-2 rounded border outline-none"
            />
            <button
              onClick={() => {
                setQuery("");
                setActiveTag(null);
              }}
              type="button"
              className="px-3 py-2 rounded bg-gray-800 text-white hover:bg-gray-700"
            >
              Clear
            </button>
            <button
              onClick={onRefresh}
              type="button"
              className="px-3 py-2 rounded bg-black text-white hover:bg-gray-800"
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Tag chips */}
        <div className="flex gap-2 flex-wrap items-center mb-4">
          <button
            onClick={() => setActiveTag(null)}
            type="button"
            className={`px-3 py-1 rounded-full border ${!activeTag ? "bg-black text-white" : "bg-white/40 text-black"}`}
          >
            All
          </button>

          {allTags.slice(0, 20).map((t) => (
            <button
              key={t._id}
              type="button"
              onClick={() => setActiveTag((prev) => (prev === t.title ? null : t.title))}
              className={`px-3 py-1 rounded-full border ${activeTag === t.title ? "bg-black text-white" : "bg-white/40 text-black"}`}
            >
              {t.title}
            </button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 rounded bg-red-200 text-red-800">
            {error}
            <button onClick={onRefresh} className="ml-4 underline">
              Retry
            </button>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {loading && contents.length === 0 ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse space-y-2 p-4 bg-white/30 rounded">
                <div className="h-36 bg-white/20 rounded" />
                <div className="h-4 bg-white/20 rounded w-3/4 mt-2" />
                <div className="h-3 bg-white/20 rounded w-1/2 mt-1" />
              </div>
            ))
          ) : filteredContent.length === 0 ? (
            // empty state
            <div className="col-span-full p-6 bg-white/30 rounded text-center">
              <h3 className="text-xl font-semibold mb-2">No content found</h3>
              <p className="text-sm text-gray-700">Try clearing filters or adding new content.</p>
            </div>
          ) : (
            // actual content cards
            filteredContent.map((content) => (
              <div key={content._id} className="relative group">
                <ContentCard content={content} />
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleCopyLink(content.url)}
                    type="button"
                    aria-label="Copy link"
                    className="px-2 py-1 rounded bg-black text-white text-sm"
                  >
                    Copy link
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
