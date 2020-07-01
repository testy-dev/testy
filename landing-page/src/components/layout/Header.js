import AnchorLink from 'react-anchor-link-smooth-scroll';
import React from 'react';
// import LogoIcon from '../../svg/LogoIcon';
import Button from '../Button';

const Header = () => (
  <header className="sticky top-0 bg-white shadow">
    <div className="container flex flex-col sm:flex-row justify-between items-center mx-auto py-4 px-8">
      <div className="flex items-center text-3xl">
        {/* <div className="w-12 mr-3"> */}
        {/*  <LogoIcon /> */}
        {/* </div> */}
        Testy
      </div>
      <div className="flex items-center mt-4 sm:mt-0">
        <AnchorLink className="px-4" href="#pricing">
          Pricing
        </AnchorLink>
        <AnchorLink className="px-4" href="#features">
          Features
        </AnchorLink>
        <div className="px-4 md:hidden">
          <Button className="text-sm" size="small" href="https://app.testy.dev">
            Try now
          </Button>
        </div>
      </div>
      <div className="hidden md:block">
        <Button className="text-sm" href="https://app.testy.dev">
          Try now
        </Button>
      </div>
    </div>
  </header>
);

export default Header;
