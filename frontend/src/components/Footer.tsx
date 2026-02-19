import { useSettings } from '../api';
import './Footer.css';

export default function Footer() {
  const { data: settings } = useSettings();

  const email = settings?.email || 'contact@alexpalaghia.com';
  const instagram = settings?.instagramUrl;
  const youtube = settings?.youtubeUrl;

  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__copy">
          &copy; {new Date().getFullYear()} Alex Palaghia
        </p>
        <nav className="footer__socials" aria-label="Social links">
          <a href={`mailto:${email}`} aria-label="Email">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 2-8 5-8-5h16Zm0 12H4V8l8 5 8-5v10Z" />
            </svg>
          </a>
          {instagram && (
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5.25-2.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z"/>
              </svg>
            </a>
          )}
          {youtube && (
            <a
              href={youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z"/>
              </svg>
            </a>
          )}
        </nav>
      </div>
    </footer>
  );
}
