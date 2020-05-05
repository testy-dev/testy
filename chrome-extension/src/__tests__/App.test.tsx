import "../setupTests";
import * as React from "react";
import { shallow } from "enzyme";
import App from "../popup/components/App";
import Body from "../popup/components/Body";
import Footer from "../popup/components/Footer";
import Header from "../popup/components/Header";
import Info from "../popup/components/Info";

describe("App", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });
  it("Should match snapshot, render Header, Body, and Footer", () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.exists(Header)).toBe(true);
    expect(wrapper.exists(Body)).toBe(true);
    expect(wrapper.exists(Footer)).toBe(true);
    expect(wrapper.exists(Info)).toBe(false);
  });
});
