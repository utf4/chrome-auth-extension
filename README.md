<img src="src/assets/img/icon-128.png" width="64"/>

# Chrome Extension (MV3) with React 18 and Webpack 5

## Installing and Running

### Procedures:

- Check if your [Node.js](https://nodejs.org/) version is >= **18**.
- Clone this repository.
- Run `npm install` to install the dependencies.
- Run `npm start`
- Load your extension on Chrome following:
   - Access `chrome://extensions/`
   - Check `Developer mode`
   - Click on `Load unpacked extension`
   - Select the `build` folder.
   - Happy hacking.

## Structure

All your extension's code must be placed in the `src` folder.

## Webpack auto-reload

To make the workflow much more efficient this app uses the [webpack server](https://webpack.github.io/docs/webpack-dev-server.html) to development (started with `npm start`) with auto reload feature that reloads the browser automatically every time that you save some file in your editor.

You can run the dev mode on other port if you want. Just specify the env var `port` like this:

```
$ PORT=6002 npm run start
```

## Packing

After the development of your extension run the command

```
$ NODE_ENV=production npm run build
```

Now, the content of `build` folder will be the extension ready to be submitted to the Chrome Web Store. Just take a look at the [official guide](https://developer.chrome.com/webstore/publish) to more infos about publishing.