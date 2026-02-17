import { SOCIALS } from '../constants/socials';
import './Contact.css';

export default function Contact() {
  return (
    <div className="contact">
      <div className="contact__content">
        <h1 className="contact__name">Alex Palaghia</h1>
        <p className="contact__title">Film / Commercial Director</p>
        <p className="page-description">
          Let's create something unforgettable together.
        </p>
        <p className="contact__location">Bucharest, Romania</p>

        <a className="contact__email" href="mailto:contact@alexpalaghia.com">
          contact@alexpalaghia.com
        </a>

        <nav className="contact__socials" aria-label="Social links">
          <a
            href={SOCIALS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5.25-2.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" />
            </svg>
          </a>
          <a
            href={SOCIALS.youtube}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z" />
            </svg>
          </a>
        </nav>
      </div>
    </div>
  );
}
