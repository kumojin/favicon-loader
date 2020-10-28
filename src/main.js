const GOOGLE_NOT_FOUND_FAVICON_DATA_URLHASH = -517133748

/**
 * Returns the favicon of the site with "siteUrl" if
 * it can be found.
 *
 * @param {*} siteUrl
 */
export const getFavicon = async(siteUrl) => {
  const imageUrl = `https://www.google.com/s2/favicons?sz=128&domain=${siteUrl}`
  return new Promise((resolve, reject) => {
    return toDataURL(
      imageUrl,
      (dataUrl) => {
        if (hashCode(dataUrl) !== GOOGLE_NOT_FOUND_FAVICON_DATA_URLHASH) {
          resolve(imageUrl)
          return imageUrl
        }

        reject(new Error('Image is standard google favicon image'))
      })
  })
}

/**
 * Writes the image into a HTML canvas and returns the `dataUrl`
 * of the image.
 *
 * @see https://stackoverflow.com/a/20285053/866172
 * @param {*} src the source of the image
 * @param {*} callback
 * @param {*} outputFormat
 */
const toDataURL = (src, callback, outputFormat) => {
  var img = new Image()
  img.crossOrigin = 'Anonymous'
  img.onload = function() {
    var canvas = document.createElement('CANVAS')
    var ctx = canvas.getContext('2d')
    var dataURL
    canvas.height = this.naturalHeight
    canvas.width = this.naturalWidth
    ctx.drawImage(this, 0, 0)
    dataURL = canvas.toDataURL(outputFormat)
    callback(dataURL)
  }
  img.src = src
  if (img.complete || img.complete === undefined) {
    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='
    img.src = src
  }
}

const hashCode = (s) => {
  for (var i = 0, h = 0; i < s.length; i++) {
    h = Math.imul(31, h) + s.charCodeAt(i) | 0
  }

  return h
}
