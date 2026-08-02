'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Download, Heart, Receipt, User, Settings, ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/ui/reveal';
import { products } from '@/data/products';

const nav = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'orders', label: 'Orders', icon: Receipt },
  { id: 'downloads', label: 'Downloads', icon: Download },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'settings', label: 'Settings', icon: Settings },
] as const;

type Tab = (typeof nav)[number]['id'];

const mockOrders = [
  { id: 'ORD-2041', date: '12 Jul 2026', total: 78, status: 'Delivered' },
  { id: 'ORD-2038', date: '04 Jun 2026', total: 49, status: 'Delivered' },
  { id: 'ORD-2031', date: '18 May 2026', total: 29, status: 'Delivered' },
];

export default function DashboardPage() {
  const [tab, setTab] = useState<Tab>('profile');

  return (
    <main className="grain pt-32 md:pt-40">
      <section className="px-6 md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Account — Dashboard
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-8 font-display text-display font-medium tracking-tightest">
              Welcome <span className="italic">back</span>.
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="px-6 py-16 md:px-10">
        <div className="mx-auto grid max-w-[1600px] gap-10 md:grid-cols-12">
          {/* SIDEBAR */}
          <aside className="md:col-span-3">
            <nav className="flex flex-wrap gap-2 border-b border-hairline pb-4 md:flex-col md:border-b-0 md:pb-0">
              {nav.map((n) => (
                <button
                  key={n.id}
                  onClick={() => setTab(n.id)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-[0.15em] transition-colors ${
                    tab === n.id
                      ? 'bg-foreground text-background'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <n.icon className="h-3.5 w-3.5" />
                  {n.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* PANEL */}
          <div className="md:col-span-9">
            {tab === 'profile' && (
              <Reveal>
                <div className="border border-hairline p-8 md:p-12">
                  <h2 className="font-display text-2xl font-medium tracking-tight">Profile</h2>
                  <div className="mt-8 space-y-6">
                    <div className="flex items-center gap-6">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary font-display text-3xl">
                        A
                      </div>
                      <div>
                        <p className="font-display text-xl">Artsy Member</p>
                        <p className="text-sm text-muted-foreground">member@theartsy.co</p>
                      </div>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Full name</label>
                        <input defaultValue="Artsy Member" className="mt-2 w-full border-b border-foreground/20 bg-transparent py-2 outline-none focus:border-foreground" />
                      </div>
                      <div>
                        <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Email</label>
                        <input defaultValue="member@theartsy.co" className="mt-2 w-full border-b border-foreground/20 bg-transparent py-2 outline-none focus:border-foreground" />
                      </div>
                    </div>
                    <button className="rounded-full bg-foreground px-6 py-3 text-xs uppercase tracking-[0.2em] text-background">Save changes</button>
                  </div>
                </div>
              </Reveal>
            )}

            {tab === 'orders' && (
              <Reveal>
                <div className="border border-hairline">
                  <div className="grid grid-cols-4 border-b border-hairline px-6 py-4 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                    <span>Order</span><span>Date</span><span>Total</span><span>Status</span>
                  </div>
                  {mockOrders.map((o) => (
                    <div key={o.id} className="grid grid-cols-4 border-b border-hairline px-6 py-5 text-sm last:border-b-0">
                      <span className="font-medium">{o.id}</span><span className="text-muted-foreground">{o.date}</span><span>${o.total}</span><span className="text-muted-foreground">{o.status}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}

            {tab === 'downloads' && (
              <Reveal>
                <div className="grid gap-6 sm:grid-cols-2">
                  {products.slice(0, 4).map((p) => (
                    <div key={p.id} className="flex items-center justify-between border border-hairline p-6">
                      <div>
                        <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{p.category}</p>
                        <h3 className="mt-1 font-display text-lg">{p.title}</h3>
                      </div>
                      <button className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-foreground/20 transition-colors hover:bg-foreground hover:text-background">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}

            {tab === 'wishlist' && (
              <Reveal>
                <div className="grid gap-6 sm:grid-cols-2">
                  {products.slice(4, 8).map((p) => (
                    <Link key={p.id} href={`/marketplace/${p.slug}`} className="group flex items-center justify-between border border-hairline p-6">
                      <div>
                        <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{p.category}</p>
                        <h3 className="mt-1 font-display text-lg">{p.title}</h3>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  ))}
                </div>
              </Reveal>
            )}

            {tab === 'settings' && (
              <Reveal>
                <div className="border border-hairline p-8 md:p-12">
                  <h2 className="font-display text-2xl font-medium tracking-tight">Settings</h2>
                  <div className="mt-8 space-y-6">
                    <label className="flex items-center justify-between">
                      <span className="text-sm">Email notifications</span>
                      <input type="checkbox" defaultChecked className="h-5 w-9" />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-sm">Product updates</span>
                      <input type="checkbox" className="h-5 w-9" />
                    </label>
                    <button className="rounded-full border border-foreground/20 px-6 py-3 text-xs uppercase tracking-[0.2em] transition-colors hover:bg-foreground hover:text-background">
                      Sign out
                    </button>
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
