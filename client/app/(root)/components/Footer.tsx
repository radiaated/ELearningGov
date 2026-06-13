import Link from "next/link";

const NAV_LINKS = [
  { href: "/courses", label: "Online Courses" },
  { href: "/studymaterials", label: "Study Materials" },
  { href: "/about", label: "About" },
];

const SOCIAL_LINKS = [
  { href: "#", icon: "fa-facebook", label: "Facebook" },
  { href: "#", icon: "fa-twitter", label: "Twitter" },
  { href: "#", icon: "fa-instagram", label: "Instagram" },
];

const CURRENT_YEAR = new Date().getFullYear();

const Footer = () => {
  return (
    <footer>
      <div className="bg-zinc-800 w-full">
        <div className="py-16 text-zinc-100 max-w-[90%] mx-auto">
          <div className="grid grid-cols-12 gap-y-8 md:gap-18 mb-12 md:mb-0">
            {/* Brand div */}
            <div className="col-span-12 md:col-span-6 md:mr-32">
              <h2 className="text-3xl font-medium">E Learning Government</h2>

              <hr className="border-zinc-600 my-3" />

              <p className="text-sm text-zinc-300 leading-relaxed">
                A conceptual government-oriented e-learning platform.
              </p>
            </div>

            {/* Navigation */}
            <nav
              className="col-span-12 md:col-span-3"
              aria-label="Footer navigation"
            >
              <ul className="space-y-2 cursor-pointer font-light">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="hover:text-zinc-300 transition"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Contact div */}
            <div
              className="col-span-12 md:col-span-3"
              aria-label="Contact information"
            >
              <h3 className="text-lg font-semibold">Contact</h3>
              <hr className="border-zinc-600 my-3" />

              {/* Social Links */}
              <div className="flex text-2xl gap-4 mb-3">
                {SOCIAL_LINKS.map((social) => (
                  <Link
                    key={social.icon}
                    href={social.href}
                    aria-label={social.label}
                    className="hover:text-zinc-400 transition"
                  >
                    <i className={`fa-brands ${social.icon}`} />
                  </Link>
                ))}
              </div>

              {/* Email */}
              <p className="text-sm flex items-center gap-2 text-zinc-300">
                <i className="fa-regular fa-envelope" />
                elarnnepal@gov.com
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-zinc-900 text-center py-6 text-zinc-300 text-sm">
          E-Learning by Government | {CURRENT_YEAR}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
