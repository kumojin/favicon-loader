const GOOGLE_NOT_FOUND_FAVICON_DATA_URLHASH = -517133748;

export class FaviconLoader {
  /**
   * Returns the favicon of the site with "siteUrl" if
   * it can be found.
   *
   * @param {string} siteUrl
   */
  public static getFavicon(siteUrl: string): Promise<string> {
    const imageUrl: string = `https://www.google.com/s2/favicons?sz=128&domain=${siteUrl}`;

    return new Promise<string>((resolve, reject) => this._toDataURL(
      imageUrl,
      (dataUrl: string): string => {
        if (this._hashCode(dataUrl) !== GOOGLE_NOT_FOUND_FAVICON_DATA_URLHASH) {
          resolve(imageUrl);

          return imageUrl;
        }

        reject(new Error('Image is standard google favicon image'));
      },
    ));
  };

  /**
   * Writes the image into a HTML canvas and returns the `dataUrl`
   * of the image.
   *
   * @see https://stackoverflow.com/a/20285053/866172
   * @param {string} src the source of the image
   * @param {(dataUrl: string) => string} callback
   * @param {string} outputFormat
   */
  private static _toDataURL(src: string, callback: (dataUrl: string) => string, outputFormat: string = null): void {
    const img: HTMLImageElement = new Image();

    img.crossOrigin = 'Anonymous';
    img.onload = function() {
      const canvas: HTMLCanvasElement = document.createElement('CANVAS') as HTMLCanvasElement;
      const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
      let dataURL: string;

      canvas.height = (this as HTMLImageElement).naturalHeight;
      canvas.width = (this as HTMLImageElement).naturalWidth;

      ctx.drawImage((this as HTMLCanvasElement), 0, 0);
      dataURL = canvas.toDataURL(outputFormat);

      return callback(dataURL);
    };

    img.src = src;

    if (img.complete || img.complete === undefined) {
      img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
      img.src = src;
    }
  }

  private static _hashCode(s: string): number {
    let h: number;

    for (let i = 0, h = 0; i < s.length; i++) {
      h = Math.imul(31, h) + s.charCodeAt(i) | 0
    }

    return h;
  }
}
