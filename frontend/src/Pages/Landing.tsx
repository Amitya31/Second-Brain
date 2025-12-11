

import { Link } from 'react-router-dom';
import Button from '../Components/ui/Button';
import { TwitterLogoIcon } from '@radix-ui/react-icons';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-900 to-black text-white">
      {/* NAV */}
      <header className="w-full border-b border-white/6">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-600 to-violet-600 flex items-center justify-center shadow-lg">
              <span className="font-bold">PR</span>
            </div>
            <div className="text-xl font-semibold">Punk Records</div>
            <span className="text-sm text-white/60 ml-2">Share · Collect · Discover</span>
          </div>

          <nav className="flex items-center gap-3">
            <Link to="/Home" className="ml-2">
              <Button className='py-1 px-2 rounded-full' variant="primary">Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <main className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <section>
          <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight">
            Build your second brain — share and discover content with <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-violet-400">Punk Records</span>
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-xl">
            Save links, videos, tweets and notes in one place. Collaborate with friends, generate public share links, and search your
            personal knowledge with powerful filtering and tags.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/auth">
              <Button className='py-1 px-2 ' variant="primary">Create an account</Button>
            </Link>
            <a href="#features" className="text-white/80 hover:text-white underline self-center">Explore features</a>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <div className="text-sm text-white/60">Trusted by</div>
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 bg-white/8 rounded">Developer Teams</div>
              <div className="px-3 py-1 bg-white/8 rounded">Creators</div>
              <div className="px-3 py-1 bg-white/8 rounded">Students</div>
            </div>
          </div>

        </section>

        <aside className="flex items-center justify-center">
          {/* Mock preview card */}
          <div className="w-full max-w-md bg-gradient-to-b from-neutral-800 to-neutral-700 border border-white/6 rounded-2xl p-4 shadow-2xl">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-sm text-white/70">Latest</div>
                <div className="font-semibold">Punk Records — Shared Feed</div>
              </div>
              <div className="text-xs text-white/50">Live</div>
            </div>

            <div className="space-y-3">
              <PreviewItem title="Understanding WebSockets" tag="#websockets" type="video" />
              <PreviewItem title="Designing microservices" tag="#microservices" type="document" />
              <PreviewItem title="Neat UI patterns" tag="#ui" type="tweet" />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-xs text-white/60">2,345 items</div>
              <div className="text-xs text-white/60">Updated now</div>
            </div>
          </div>
        </aside>
      </main>

      {/* FEATURES */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-6">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard title="Save anything" desc="Save links, videos, tweets, documents and more." />
          <FeatureCard title="Share links" desc="Create public shareable links with one click." />
          <FeatureCard title="Tag & Filter" desc="Organize content with tags and quick filters." />
          <FeatureCard title="Fast search" desc="Instant search across all your saved content." />
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-gradient-to-b from-neutral-900 to-neutral-800 border border-white/6 rounded-2xl p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold">Ready to build your Punk Records?</h3>
            <p className="text-white/70 mt-2">Start saving knowledge in a simple, fast and shareable way.</p>
          </div>
          <div className="flex gap-3">
            <Link to="/auth"><Button className="" variant="primary">Get started — it's free</Button></Link>
            <a href="#features" className="self-center text-white/80 underline">Learn more</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="max-w-6xl mx-auto px-6 py-8 text-white/60 border-t border-white/6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="font-semibold text-lg">Punk Records</div>
            <div className="text-sm mt-1">Made with ❤️ for creators & developers</div>
          </div>

          <div className="flex gap-4 items-center">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="flex items-center gap-2 hover:text-white"><TwitterLogoIcon/> @punkrecords</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ----------------- small helper components ----------------- */
function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-white/3 border border-white/6 rounded-xl p-4 shadow-sm hover:shadow-md transition">
      <div className="font-semibold">{title}</div>
      <div className="mt-2 text-sm text-white/70">{desc}</div>
    </div>
  );
}

function PreviewItem({ title, tag, type }: { title: string; tag: string; type: string }) {
  return (
    <div className="flex items-center justify-between bg-white/2 rounded-md p-3">
      <div>
        <div className="font-medium">{title}</div>
        <div className="text-xs text-white/60">{tag}</div>
      </div>
      <div className="text-xs text-white/70 uppercase tracking-wide">{type}</div>
    </div>
  );
}
