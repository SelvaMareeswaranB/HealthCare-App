import { useState, useEffect } from "react"
import { NavLink, useNavigate, useLocation } from "react-router-dom"
import { logout } from "@repo/auth"
import Logo from "./Logo"
import { navLinks } from "./navLinks"

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium transition ${
    isActive
      ? "border-b-2 border-current pb-1 text-[var(--color-app-primary)]"
      : "text-[var(--color-app-text-muted)] hover:text-[var(--color-app-primary)]"
  }`

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)

  const closeMenu = () => setIsMenuOpen(false)
  const toggleMenu = () => setIsMenuOpen((prev) => !prev)

  const handleLogout = async () => {
    await logout()
    closeMenu() 
    navigate("/auth/login")
  }

  useEffect(() => {
    closeMenu()
  }, [location.pathname])

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (!mobile) {
        closeMenu()
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <header className="sticky top-0 z-20 border-b border-[var(--color-app-border)] bg-[var(--color-app-surface)] text-[var(--color-app-text)]">
      <div className="mx-auto flex w-full items-center justify-between px-4 py-4 md:px-8">
        <Logo />

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="items-center gap-8 flex">
          {navLinks.map((link) => (
            <NavLink key={link.name} to={link.path} className={linkClass}>
              {link.name}
            </NavLink>
          ))}
          <button
            type="button"
            className="rounded-lg bg-[var(--color-app-danger)] px-4 py-2 text-sm font-medium text-[var(--color-app-text)] hover:bg-[var(--color-app-danger-hover)] transition-colors"
            onClick={handleLogout}
          >
            Logout
          </button>
          </nav>
        )}

        {/* Mobile/Tablet Toggle Button */}
        {isMobile && (
          <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg border border-[var(--color-app-border)] p-2 text-[var(--color-app-text)] transition hover:bg-[var(--color-app-surface-2)]"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          onClick={toggleMenu}
        >
          <span className="sr-only">{isMenuOpen ? "Close menu" : "Open menu"}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="h-6 w-6"
          >
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            )}
          </svg>
          </button>
        )}
      </div>

      {/* Mobile/Tablet Navigation Menu */}
      {isMobile && isMenuOpen && (
        <nav
          id="mobile-menu"
          className="space-y-3 border-t border-[var(--color-app-border)] bg-[var(--color-app-surface-2)] px-4 py-4 flex flex-col gap-6"
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={linkClass}
              onClick={closeMenu}
            >
              {link.name}
            </NavLink>
          ))}
          <button
            type="button"
            onClick={handleLogout}
            className="block w-full rounded-lg bg-[var(--color-app-danger)] px-4 py-2 text-left text-sm font-medium text-[var(--color-app-text)] hover:bg-[var(--color-app-danger-hover)] transition-colors"
          >
            Logout
          </button>
        </nav>
      )}
    </header>
  )
}

export default Navbar