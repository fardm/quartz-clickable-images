import { describe, it, expect } from "vitest";
import { unified, type Plugin } from "unified";
import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";
import type { Root as HastRoot } from "hast";
import { ClickableImages } from "../src/transformer";
import type { BuildCtx } from "@quartz-community/types";

describe("ClickableImages Transformer", () => {
  const mockCtx = {} as BuildCtx;

  it("should wrap images with a lightbox wrapper and add data attributes", async () => {
    const plugin = ClickableImages();

    // تعریف دقیق تایپ ورودی و خروجی پلاگین برای حفظ زنجیره unified
    const rehypePlugin = plugin.htmlPlugins!(mockCtx)[0] as Plugin<[], HastRoot, HastRoot>;

    const processor = unified()
      .use(rehypeParse, { fragment: true })
      .use(rehypePlugin)
      .use(rehypeStringify);

    const inputHtml = '<img src="test-image.jpg" alt="This is a test">';
    const result = await processor.process(inputHtml);
    const outputHtml = String(result);

    expect(outputHtml).toContain('class="lightbox-wrapper"');
    expect(outputHtml).toContain('data-lightbox="true"');
    expect(outputHtml).toContain('class="lightbox-image"');
    expect(outputHtml).toContain('data-alt="This is a test"');
    expect(outputHtml).toContain('loading="lazy"');
  });

  it("should not modify other html elements", async () => {
    const plugin = ClickableImages();
    const rehypePlugin = plugin.htmlPlugins!(mockCtx)[0] as Plugin<[], HastRoot, HastRoot>;

    const processor = unified()
      .use(rehypeParse, { fragment: true })
      .use(rehypePlugin)
      .use(rehypeStringify);

    const inputHtml = "<p>Just a simple paragraph.</p>";
    const result = await processor.process(inputHtml);
    const outputHtml = String(result);

    expect(outputHtml).toBe("<p>Just a simple paragraph.</p>");
  });
});
