import { FaviconLoader } from './main';

jest.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(
  () =>
    ({
      drawImage: jest.fn(),
    }) as never,
);

jest.spyOn(HTMLCanvasElement.prototype, 'toDataURL').mockImplementation((outputFormat: string) => `output value: ${outputFormat}`);

describe('FaviconLoader', () => {
  describe('getFavicon', () => {
    // @ts-expect-error override Image value in global [for unit tests only]
    global.Image = class {
      constructor() {
        setTimeout(() => {
          // @ts-expect-error onload is defined but typescript does not trust me [for unit tests only]
          this.onload();
        }, 100);
      }
    };

    describe('when the load is successful', () => {
      let icon: string;
      let error: Error;

      beforeEach(async () => {
        // simulate found
        jest.spyOn(FaviconLoader as any, '_hashCode').mockReturnValue(42);

        try {
          icon = await FaviconLoader.getFavicon('https://www.google.com/');
        } catch (e) {
          error = e as Error;
        }
      });

      it('should run without error', () => {
        expect(icon).toEqual('https://www.google.com/s2/favicons?sz=128&domain=https://www.google.com/');
        expect(error).toBeUndefined();
      });
    });

    describe('when the load is failure', () => {
      let icon: string;
      let error: Error;

      beforeEach(async () => {
        // simulate not found
        jest.spyOn(FaviconLoader as any, '_hashCode').mockReturnValue(-517133748);

        try {
          icon = await FaviconLoader.getFavicon('https://www.google.com/');
        } catch (e) {
          error = e as Error;
        }
      });

      it('should reject with error', async () => {
        expect(icon).toBeUndefined();
        expect(error.message).toEqual('Image is standard google favicon image');
      });
    });

    describe('with a custom size', () => {
      let icon: string;
      let error: Error;

      beforeEach(async () => {
        // simulate found
        jest.spyOn(FaviconLoader as any, '_hashCode').mockReturnValue(42);

        try {
          icon = await FaviconLoader.getFavicon('https://www.google.com/', 42);
        } catch (e) {
          error = e as Error;
        }
      });

      it('should run with the size parameter', () => {
        expect(icon).toEqual('https://www.google.com/s2/favicons?sz=42&domain=https://www.google.com/');
        expect(error).toBeUndefined();
      });
    });
  });
});
