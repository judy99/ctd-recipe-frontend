import { NavLink } from 'react-router';

export default function Header({ title }) {
  const checkActive = (el) => {
    if (el.isActive)
      return 'mr-2.5 text-[1.5rem] no-underline last:mr-0 text-neutral-900';
    return 'mr-2.5 text-[1.5rem] no-underline last:mr-0 text-gray-500';
  };

  return (
    <header className="bg-teal-200 py-4 shadow-sm">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1>{title}</h1>
        <nav className="space-x-6 text-lg">
          <NavLink to={'/'} className={(el) => checkActive(el)}>
            Home
          </NavLink>
          <NavLink to={'/about'} className={(el) => checkActive(el)}>
            About
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
