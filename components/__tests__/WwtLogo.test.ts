import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import WwtLogo from "../WwtLogo.vue";

describe("WwtLogo", () => {
  it("renders the color variant by default", () => {
    const wrapper = mount(WwtLogo);
    const img = wrapper.find("img");
    expect(img.attributes("src")).toBe("/wwt-logo.png");
    expect(img.attributes("alt")).toBe("World Wide Technology");
  });

  it("selects the white variant", () => {
    const wrapper = mount(WwtLogo, { props: { variant: "white" } });
    expect(wrapper.find("img").attributes("src")).toBe("/wwt-logo-white.png");
  });

  it("derives width from height using intrinsic ratio", () => {
    const wrapper = mount(WwtLogo, { props: { height: 60 } });
    const img = wrapper.find("img");
    const w = Number(img.attributes("width"));
    const h = Number(img.attributes("height"));
    expect(h).toBe(60);
    expect(w / h).toBeGreaterThan(1);
    expect(w / h).toBeLessThan(6);
  });
});
