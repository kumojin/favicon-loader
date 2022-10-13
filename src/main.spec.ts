import { FaviconLoader } from './main';

jest.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(() => ({
  drawImage: jest.fn(),
}) as any);

jest.spyOn(HTMLCanvasElement.prototype, 'toDataURL').mockImplementation((outputFormat: string) => `output value: ${outputFormat}`);

describe('FaviconLoader', () => {
  describe('getFavicon', () => {
    // @ts-ignore
    global.Image = class {
      constructor() {
        setTimeout(() => {
          // @ts-ignore
          this.onload();
        }, 100);
      };
    };

    describe('when the load is successful', () => {
      let icon;
      let error;

      beforeEach(async () => {
        // simulate found
        jest.spyOn(FaviconLoader as any, '_hashCode').mockReturnValue(42);

        try {
          icon = await FaviconLoader.getFavicon('https://www.google.com/');
        } catch (e) {
          error = e;
        }
      });

      it('should run without error', () => {
        expect(icon).toEqual('https://www.google.com/s2/favicons?sz=128&domain=https://www.google.com/');
        expect(error).toBeUndefined();
      });
    });

    describe('when the load is failure', () => {
      let icon;
      let error;

      beforeEach(async () => {
        // simulate not found
        jest.spyOn(FaviconLoader as any, '_hashCode').mockReturnValue(-517133748);

        try {
          icon = await FaviconLoader.getFavicon('https://www.google.com/');
        } catch (e) {
          error = e;
        }
      });

      it('should reject with error', async() => {
        expect(icon).toBeUndefined();
        expect(error.message).toEqual('Image is standard google favicon image');
      });
    });
  });
});
