import { FaviconLoader } from './main';

// @ts-ignore
HTMLCanvasElement.prototype.getContext = () => ({
  drawImage: jest.fn(),
});

HTMLCanvasElement.prototype.toDataURL = (outputFormat: string) => `output value: ${outputFormat}`;

describe('FaviconLoader', () => {
  describe('getFavicon', () => {
    describe('when the load is successful', () => {
      beforeEach(() => {
        // @ts-ignore
        global.Image = class {
          constructor() {
            setTimeout(() => {
              // @ts-ignore
              this.onload(); // simulate success
            }, 100);
          };
        };
      });

      it('should run', async() => {
        const icon = await FaviconLoader.getFavicon('https://www.google.com/');
        expect(icon).toEqual('https://www.google.com/s2/favicons?sz=128&domain=https://www.google.com/');
      });
    });
  });
});
