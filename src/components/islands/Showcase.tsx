import { ArrowUpRight01Icon, Moon02Icon, Sun03Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useState, useSyncExternalStore } from 'react';
import { TextField } from 'react-aria-components';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function subscribeTheme(listener: () => void) {
  window.addEventListener('themechange', listener);
  return () => window.removeEventListener('themechange', listener);
}

const emptySubscribe = () => () => {};
const serverSnapshot = () => false;
const clientSnapshot = () => true;
const themeSnapshot = () => document.documentElement.classList.contains('dark');

export default function Showcase() {
  const dark = useSyncExternalStore(subscribeTheme, themeSnapshot, serverSnapshot);
  const ready = useSyncExternalStore(emptySubscribe, clientSnapshot, serverSnapshot);
  const [name, setName] = useState('My next project');

  function toggleTheme() {
    const next = !dark;
    document.documentElement.classList.toggle('dark', next);
    document.documentElement.style.colorScheme = next ? 'dark' : 'light';
    window.dispatchEvent(new Event('themechange'));
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {
      /* Theme remains usable without storage. */
    }
  }

  return (
    <section aria-label="Component showcase" data-hydrated={ready}>
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-xs font-medium tracking-widest">EXPLORE THE FOUNDATION</h2>
        <Button
          variant="outline"
          onPress={toggleTheme}
          isDisabled={!ready}
          aria-label="Toggle color theme"
        >
          <HugeiconsIcon icon={dark ? Sun03Icon : Moon02Icon} strokeWidth={2} aria-hidden="true" />
          <span className="hidden sm:inline">Switch theme</span>
        </Button>
      </div>
      <Tabs defaultSelectedKey="preview">
        <TabsList aria-label="Showcase views">
          <TabsTrigger id="preview">Preview</TabsTrigger>
          <TabsTrigger id="details">Details</TabsTrigger>
        </TabsList>
        <TabsContent id="preview" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Make something of your own.</CardTitle>
              <CardDescription>
                Try a field, open a dialog, and see how the pieces fit.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end">
              <TextField value={name} onChange={setName} className="grid max-w-sm gap-2">
                <Label>Project name</Label>
                <Input placeholder="Give your idea a name" />
              </TextField>
              <DialogTrigger>
                <Button isDisabled={!ready}>
                  Preview project{' '}
                  <HugeiconsIcon icon={ArrowUpRight01Icon} strokeWidth={2} aria-hidden="true" />
                </Button>
                <Dialog>
                  <DialogHeader>
                    <DialogTitle>Ready when you are.</DialogTitle>
                    <DialogDescription>
                      {name.trim() || 'Your project'} has a place to begin. Replace this showcase
                      with your first feature.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose>Keep exploring</DialogClose>
                  </DialogFooter>
                </Dialog>
              </DialogTrigger>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent id="details" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Small pieces. Solid foundations.</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-5 text-muted-foreground sm:grid-cols-3">
              <p>
                <strong className="mb-1 block font-medium text-foreground">Astro pages</strong>
                Static HTML with React where interaction belongs.
              </p>
              <p>
                <strong className="mb-1 block font-medium text-foreground">React Aria</strong>
                Keyboard navigation and focus management built in.
              </p>
              <p>
                <strong className="mb-1 block font-medium text-foreground">Lyra style</strong>
                Compact typography and precise, square edges.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}
