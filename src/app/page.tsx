import { Binary } from 'lucide-react';
import { Converter } from '@/components/Converter';

export default function Home() {
  return (
    <>
      <header className="wb-bar">
        <a className="wb-brand" href="/">
          <span className="wb-mark" aria-hidden="true"><Binary /></span>
          <span className="wb-brand-text">
            <span className="wb-brand-name">Text to Binary</span>
            <span className="wb-brand-owner">Belal&apos;s tools</span>
          </span>
        </a>
      </header>

      <main className="wb-page">
        <div className="wb-head">
          <h1 className="wb-title">Text to binary, and back</h1>
          <p className="wb-lede">
            Type on either side and the other updates as you go. Every character is encoded as UTF-8 bytes, so Arabic and emoji round-trip intact.
          </p>
        </div>
        <Converter />
      </main>

      <footer className="wb-foot">
        <span>Made by <a href="mailto:belalabukhadija97@gmail.com">Belal</a></span>
        <span>More free tools at <a href="https://belal.work" target="_blank" rel="noopener noreferrer">belal.work</a></span>
      </footer>
    </>
  );
}
