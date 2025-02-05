import { FaviconFile, FaviconHtmlElement } from "../index";
import { FaviconOptions, IconOptions } from "../config/defaults";
import { transparentIcon } from "../config/icons";
import { relativeTo } from "../helpers";
import { Platform, uniformIconOptions } from "./base";

const ICONS_OPTIONS: Record<string, IconOptions> = {
  "yandex-browser-50x50.png": transparentIcon(50),
};

export class YandexPlatform extends Platform {
  constructor(options: FaviconOptions) {
    super(
      options,
      uniformIconOptions(options, options.icons.yandex, ICONS_OPTIONS)
    );
  }

  override async createFiles(): Promise<FaviconFile[]> {
    return [this.manifest()];
  }

  override async createHtml(): Promise<FaviconHtmlElement[]> {
    // prettier-ignore
    return [
      `<link rel="yandex-tableau-widget" href="${this.relative(this.manifestFileName())}">`
    ];
  }

  private manifestFileName(): string {
    return (
      this.options.files?.yandex?.manifestFileName ??
      "yandex-browser-manifest.json"
    );
  }

  private manifest(): FaviconFile {
    const basePath = this.options.manifestRelativePaths
      ? null
      : this.options.path;

    const logo = Object.keys(this.iconOptions)[0];

    const properties = {
      version: this.options.version,
      api_version: 1,
      layout: {
        logo: relativeTo(basePath, logo),
        color: this.options.background,
        show_title: true,
      },
    };

    return {
      name: this.manifestFileName(),
      contents: JSON.stringify(properties, null, 2),
    };
  }
}
