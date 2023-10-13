# favicon-loader

## Purpose
This is a small component built on top of [Google S2 Favicons Snatcher](https://www.google.com/s2/favicons?domain=www.google.com) for retrieving the favicon of any website.

We built this because we needed something more on top of Google S2: being able to know whether the website actually has a favicon (in order to display something else, or not display anything for example).

At the moment, Google S2 returns a standard globe/world-like icon (see [example](https://www.google.com/s2/favicons?domain=www.thisdoesnotexist-website.com)) when the website has not defined any favicon, without any specific header that would allow us to know that.

What we do here is that we check the hash of the returned image to detect it's the globe icon and return an error instead of a successful response.

## The function

The `getFavicon` function will return a `Promise` that will:
- succeed IF the call to Google S2 succeeds, AND if the returned favicon is not the default website icon returned when there is no favicon for the website.
- fail IF the call to Google S2 does not succeed, the image cannot be read, or the returned favicon is the default website icon from Google S2.

## How to use it

```Javascript
// Example: we get the icon from https://yahoo.com and append it to the body of the page when successful:
FaviconLoader.getFavicon('https://yahoo.com/').then(icon => {
    const img = document.createElement('img'); 
    img.src = icon 
    document.getElementsByTagName('body')[0].appendChild(img); 
});

// Example: we can specify a specific icon size
FaviconLoader.getFavicon('https://yahoo.com/', 32).then(icon => {
    const img = document.createElement('img'); 
    img.src = icon 
    document.getElementsByTagName('body')[0].appendChild(img); 
});
