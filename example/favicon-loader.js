function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _defineProperties(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}function _createClass(a,b,c){return b&&_defineProperties(a.prototype,b),c&&_defineProperties(a,c),a}var GOOGLE_NOT_FOUND_FAVICON_DATA_URLHASH=-517133748;export var FaviconLoader=/*#__PURE__*/function(){function FaviconLoader(){_classCallCheck(this,FaviconLoader)}return _createClass(FaviconLoader,null,[{key:"getFavicon",/**
   * Returns the favicon of the site with "siteUrl" if
   * it can be found.
   *
   * @param {string} siteUrl
   */value:function getFavicon(a){var b=this,c="https://www.google.com/s2/favicons?sz=128&domain=".concat(a);return new Promise(function(a,d){return b._toDataURL(c,function(e){return b._hashCode(e)===GOOGLE_NOT_FOUND_FAVICON_DATA_URLHASH?void d(new Error("Image is standard google favicon image")):(a(c),c)})})}},{key:"_toDataURL",/**
   * Writes the image into a HTML canvas and returns the `dataUrl`
   * of the image.
   *
   * @see https://stackoverflow.com/a/20285053/866172
   * @param {string} src the source of the image
   * @param {(dataUrl: string) => string} callback
   * @param {string} outputFormat
   */value:function _toDataURL(a,b){var c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null,d=new Image;d.crossOrigin="Anonymous",d.onload=function(){var a,d=document.createElement("CANVAS"),e=d.getContext("2d");return d.height=this.naturalHeight,d.width=this.naturalWidth,e.drawImage(this,0,0),a=d.toDataURL(c),b(a)},d.src=a,(d.complete||void 0===d.complete)&&(d.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",d.src=a)}},{key:"_hashCode",value:function _hashCode(a){for(var b=Math.imul,c,d=0,e=0;d<a.length;d++)e=0|b(31,e)+a.charCodeAt(d);return c}}]),FaviconLoader}();
