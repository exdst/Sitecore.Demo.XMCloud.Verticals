import config from '@/temp/config';

export function onRequest (context, next) {
    // intercept data from a request
    // optionally, modify the properties in `locals`
    //context.locals.title = "New title";

    // return a Response or the result of calling `next()`
    const mediaIndex  = context.url.pathname.indexOf("/-/");
    if (mediaIndex >= 0) {
        return Response.redirect(new URL(config.sitecoreApiHost + context.url.pathname + context.url.search), 302);
    }
    return next();
};