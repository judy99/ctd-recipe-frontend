import { NavLink } from 'react-router';

export default function Header({ title }) {
  const checkActive = (el) => {
    if (el.isActive)
      return 'mr-2.5 text-[1.5rem] no-underline last:mr-0 text-neutral-900';
    return 'mr-2.5 text-[1.5rem] no-underline last:mr-0 text-gray-500';
  };

  return (
    <header className="bg-teal-200 pt-[30px] px-[10px] pb-[10px]">
      <h1 className="m-0 text-center font-sans text-[2.2em] leading-[1.1] font-bold">
        {title}
      </h1>

      <nav className="flex justify-end px-5">
        <NavLink to={'/'} className={(el) => checkActive(el)}>
          Home
        </NavLink>
        <NavLink to={'/about'} className={(el) => checkActive(el)}>
          About
        </NavLink>
      </nav>
    </header>
  );
}
