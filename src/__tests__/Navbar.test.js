import React from "react";
import Navbar from "../Navbar";
import { shallow } from "enzyme";

describe("Navbar", () => {
  it("should render", () => {
    const component = shallow(Navbar);
    expect(component).toMatchSnapshot();
  });
});
