import React from 'react';

const sizes = {
  default: `py-3 px-8`,
  lg: `py-4 px-12`,
  xl: `py-5 px-16 text-lg`,
};

const Button = ({ children, className = '', size, href }) => {
  return (
    <a
      href={href}
      className={`
        ${sizes[size] || sizes.default}
        ${className}
        bg-primary
        hover:bg-primary-darker
        hover:text-white
        rounded
        text-white
    `}
    >
      {children}
    </a>
  );
};

export default Button;
