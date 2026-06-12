import { QuartzTransformerPlugin } from '@quartz-community/types';
export { PageGenerator, PageMatcher, QuartzComponent, QuartzComponentConstructor, QuartzComponentProps, QuartzEmitterPlugin, QuartzFilterPlugin, QuartzPageTypePlugin, QuartzPageTypePluginInstance, QuartzTransformerPlugin, StringResource, VirtualPage } from '@quartz-community/types';

interface ClickableImagesOptions {
}
/**
 * ClickableImages Transformer Plugin
 */
declare const ClickableImages: QuartzTransformerPlugin<Partial<ClickableImagesOptions>>;

export { ClickableImages, type ClickableImagesOptions };
