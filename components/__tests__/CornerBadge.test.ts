import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach } from "vitest";
import { frontmatter } from "../../test/mocks/slidev-client";
import CornerBadge from "../CornerBadge.vue";

describe("CornerBadge", () => {
  beforeEach(() => {
    frontmatter.value = {};
  });

  it("renders when badge is unset", () => {
    const wrapper = mount(CornerBadge, { props: { src: "/badge.png" } });
    expect(wrapper.find("img").exists()).toBe(true);
    expect(wrapper.find("img").attributes("src")).toBe("/badge.png");
  });

  it("renders when badge is explicitly true", () => {
    frontmatter.value = { badge: true };
    const wrapper = mount(CornerBadge, { props: { src: "/badge.png" } });
    expect(wrapper.find("img").exists()).toBe(true);
  });

  it("does not render when badge: false", () => {
    frontmatter.value = { badge: false };
    const wrapper = mount(CornerBadge, { props: { src: "/badge.png" } });
    expect(wrapper.find("img").exists()).toBe(false);
  });

  it("defaults to an 8-degree left tilt", () => {
    const wrapper = mount(CornerBadge, { props: { src: "/badge.png" } });
    expect(wrapper.find("img").attributes("style")).toContain("rotate(-8deg)");
  });

  it("accepts a custom rotation", () => {
    const wrapper = mount(CornerBadge, { props: { src: "/badge.png", rotate: 4 } });
    expect(wrapper.find("img").attributes("style")).toContain("rotate(4deg)");
  });

  it("is marked decorative for assistive tech", () => {
    const wrapper = mount(CornerBadge, { props: { src: "/badge.png" } });
    expect(wrapper.attributes("aria-hidden")).toBe("true");
    expect(wrapper.find("img").attributes("alt")).toBe("");
  });
});
