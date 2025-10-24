const GOOGLE_NOT_FOUND_FAVICON_DATA_URLHASH = -517133748;

export class FaviconLoader {
  /**
   * Get the favicon from site url in the right size
   *
   * @param {string} siteUrl - website url to find the favicon
   * @param {number} [size=128] - size of favicon, default value 128
   *
   * @returns the favicon if founded on site url
   */
  public static getFavicon(siteUrl: string, size = 128): Promise<string> {
    const imageUrl = `https://www.google.com/s2/favicons?sz=${size}&domain=${siteUrl}`;

    return new Promise<string>((resolve, reject) =>
      FaviconLoader._toDataURL(imageUrl, (dataUrl: string): string => {
        if (FaviconLoader._hashCode(dataUrl) !== GOOGLE_NOT_FOUND_FAVICON_DATA_URLHASH) {
          resolve(imageUrl);

          return imageUrl;
        }

        reject(new Error('Image is standard google favicon image'));
      }),
    );
  }

  /**
   * Writes the image into an HTML canvas and returns the `dataUrl`
   * of the image.
   *
   * @see https://stackoverflow.com/a/20285053/866172
   * @param {string} src - the source of the image
   * @param {(dataUrl: string) => string} callback - code executed on image load with canvas dataUrl in parameter
   * @param {string} [outputFormat=null] - specific output format for dataUrl
   */
  private static _toDataURL(src: string, callback: (dataUrl: string) => string, outputFormat: string = null): void {
    const img: HTMLImageElement = new Image();

    img.crossOrigin = 'Anonymous';
    img.onload = function (): string {
      const canvas: HTMLCanvasElement = document.createElement('CANVAS') as HTMLCanvasElement;
      const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

      canvas.height = (this as HTMLImageElement).naturalHeight;
      canvas.width = (this as HTMLImageElement).naturalWidth;

      ctx.drawImage(this as HTMLCanvasElement, 0, 0);
      const dataURL: string = canvas.toDataURL(outputFormat);

      return callback(dataURL);
    };

    img.src = src;

    if (img.complete || img.complete === undefined) {
      img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
      img.src = src;
    }
  }

  private static _hashCode(s: string): number {
    let h = 0;

    for (let i = 0; i < s.length; i++) {
      h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
    }

    return h;
  }
}
