import "../setupTests";
import * as React from "react";
import { shallow } from "enzyme";
import Body, { BodyProps } from "../popup/components/Body";
import CodeDisplay from "../popup/components/CodeDisplay";
import LandingBox from "../popup/components/LandingBox";

describe("Body", () => {
  let props: BodyProps;
  let wrapper;
  beforeAll(() => {
    props = {
      codeBlocks: [],
      isValidTab: true,
      destroyBlock: jest.fn(),
      moveBlock: jest.fn(),
      recStatus: "off",
    };
  });
  it("Should render LandingBox when recStatus is off", () => {
    wrapper = shallow(<Body {...props} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.exists(LandingBox)).toBe(true);
    expect(wrapper.exists(CodeDisplay)).toBe(false);
  });
  it("Should render CodeDisplay when recStatus is paused", () => {
    props.recStatus = "paused";
    wrapper = shallow(<Body {...props} />);
    expect(wrapper.exists(CodeDisplay)).toBe(true);
    expect(wrapper.exists(LandingBox)).toBe(false);
  });
  it("Should render CodeDisplay when recStatus is on", () => {
    props.recStatus = "on";
    wrapper = shallow(<Body {...props} />);
    expect(wrapper.exists(CodeDisplay)).toBe(true);
    expect(wrapper.exists(LandingBox)).toBe(false);
  });
});
