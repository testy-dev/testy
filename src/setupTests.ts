import "jest-enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import { configure } from "enzyme";

configure({ adapter: new Adapter() });
