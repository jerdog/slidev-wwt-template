import { describe, it, expect } from "vitest";
import { resolveSocial } from "../socialPlatforms";

describe("resolveSocial", () => {
  it("builds a bluesky profile URL from a handle, stripping the leading @", () => {
    expect(resolveSocial("bluesky", "@jerdog.dev")).toEqual({
      platform: "bluesky",
      name: "Bluesky",
      label: "@jerdog.dev",
      url: "https://bsky.app/profile/jerdog.dev",
    });
  });

  it("builds a github profile URL from a bare handle", () => {
    expect(resolveSocial("github", "jerdog")).toEqual({
      platform: "github",
      name: "GitHub",
      label: "jerdog",
      url: "https://github.com/jerdog",
    });
  });

  it("aliases twitter to the x platform and icon", () => {
    expect(resolveSocial("twitter", "jerdog")).toEqual({
      platform: "x",
      name: "X",
      label: "jerdog",
      url: "https://x.com/jerdog",
    });
  });

  it("builds a linkedin profile URL from a bare handle", () => {
    expect(resolveSocial("linkedin", "jeremy-meiss")).toEqual({
      platform: "linkedin",
      name: "LinkedIn",
      label: "jeremy-meiss",
      url: "https://www.linkedin.com/in/jeremy-meiss",
    });
  });

  it("accepts a linkedin handle already rooted at /in/ without doubling it", () => {
    expect(resolveSocial("linkedin", "/in/jeremy-meiss").url).toBe(
      "https://www.linkedin.com/in/jeremy-meiss",
    );
  });

  it("parses a mastodon @user@instance handle into a profile URL", () => {
    expect(resolveSocial("mastodon", "@jerdog@fosstodon.org")).toEqual({
      platform: "mastodon",
      name: "Mastodon",
      label: "@jerdog@fosstodon.org",
      url: "https://fosstodon.org/@jerdog",
    });
  });

  it("passes a full mastodon URL through untouched", () => {
    const url = "https://fosstodon.org/@jerdog";
    expect(resolveSocial("mastodon", url).url).toBe(url);
  });

  it("ensures a leading @ on youtube handles", () => {
    expect(resolveSocial("youtube", "wwt").url).toBe("https://youtube.com/@wwt");
    expect(resolveSocial("youtube", "@wwt").url).toBe("https://youtube.com/@wwt");
  });

  it("normalizes an email address to a mailto: link", () => {
    expect(resolveSocial("email", "jeremy.meiss@wwt.com")).toEqual({
      platform: "email",
      name: "Email",
      label: "jeremy.meiss@wwt.com",
      url: "mailto:jeremy.meiss@wwt.com",
    });
  });

  it("renders discord/slack as plain text (empty url) when given a bare handle", () => {
    expect(resolveSocial("discord", "jerdog#1234").url).toBe("");
  });

  it("links discord/slack when given a full invite URL", () => {
    const url = "https://discord.gg/example";
    expect(resolveSocial("discord", url).url).toBe(url);
  });

  it("treats an unknown platform key with a bare (non-URL) value as non-linking text", () => {
    expect(resolveSocial("matrix", "@jerdog:matrix.org")).toEqual({
      platform: "link",
      name: "Matrix",
      label: "matrix",
      url: "",
    });
  });

  it("links an unknown platform key when the bare value is already a URL", () => {
    const url = "https://matrix.to/#/@jerdog:matrix.org";
    expect(resolveSocial("matrix", url)).toEqual({
      platform: "link",
      name: "Matrix",
      label: "matrix",
      url,
    });
  });

  it("honors a full override object, falling back to the platform icon when none is given", () => {
    expect(
      resolveSocial("github", { label: "@jerdog on GitHub", url: "https://github.com/jerdog" }),
    ).toEqual({
      platform: "github",
      name: "GitHub",
      label: "@jerdog on GitHub",
      url: "https://github.com/jerdog",
    });
  });

  it("lets an override pick a different icon than its key would imply", () => {
    expect(
      resolveSocial("matrix", { icon: "link", label: "Matrix", url: "https://matrix.to/x" }),
    ).toEqual({
      platform: "link",
      name: "Matrix",
      label: "Matrix",
      url: "https://matrix.to/x",
    });
  });
});
