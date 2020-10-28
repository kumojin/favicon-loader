import { FaviconLoader } from './main'

describe('FaviconLoader', () => {
  describe('getFavicon', () => {

    it('should run', async() => {
      const icon = await FaviconLoader.getFavicon('https://www.google.com/')
      expect(icon).toEqual('https://www.google.com/favicon.ico')
    })
  })
})
