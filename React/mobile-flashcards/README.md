## Mobile-Flashcards


## Prerequisites

* Node (v6+)
* npm or yarn
* Intel chipset and Android sdk or actual Android device with expo

Note: Android emulator will NOT work on AMD chipsets

## Installation

To install the app run 
  - `yarn install`
or 
  - `npm install`
Download Expo to your device if you are testing on a device

## Running Appliction

run 
`yarn start`
or
`npm start`

This will display a menu of options
* Press a to start android emulatio
* Press i to start iOS emulator
* Press q to display QR code. Open expo on phone and scan QR code to run on actual device

## Available Scripts

If Yarn was installed when the project was initialized, then dependencies will have been installed via Yarn, and you should probably use it to run these commands as well. Unlike dependency installation, command running syntax is identical for Yarn and NPM at the time of this writing.

### `npm start`

Runs your app in development mode.

Open it in the [Expo app](https://expo.io) on your phone to view it. It will reload if you save edits to your files, and you will see build errors and logs in the terminal.

Sometimes you may need to reset or clear the React Native packager's cache. To do so, you can pass the `--reset-cache` flag to the start script:

```
npm start -- --reset-cache
# or
yarn start -- --reset-cache
```

#### `npm run ios`

Like `npm start`, but also attempts to open your app in the iOS Simulator if you're on a Mac and have it installed.

#### `npm run android`

Like `npm start`, but also attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools (see [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for detailed setup). We also recommend installing Genymotion as your Android emulator. Once you've finished setting up the native build environment, there are two options for making the right copy of `adb` available to Create React Native App:


### Configuring Packager IP Address

When starting your project, you'll see something like this for your project URL:

```
exp://192.168.0.2:19000
```

The "manifest" at that URL tells the Expo app how to retrieve and load your app's JavaScript bundle, so even if you load it in the app via a URL like `exp://localhost:19000`, the Expo client app will still try to retrieve your app at the IP address that the start script provides.

In some cases, this is less than ideal. This might be the case if you need to run your project inside of a virtual machine and you have to access the packager via a different IP address than the one which prints by default. In order to override the IP address or hostname that is detected by Create React Native App, you can specify your own hostname via the `REACT_NATIVE_PACKAGER_HOSTNAME` environment variable:

Mac and Linux:

```
REACT_NATIVE_PACKAGER_HOSTNAME='my-custom-ip-address-or-hostname' npm start
```

Windows:
```
set REACT_NATIVE_PACKAGER_HOSTNAME='my-custom-ip-address-or-hostname'
npm start
```

The above example would cause the development server to listen on `exp://my-custom-ip-address-or-hostname:19000`.


### Publishing to Expo's React Native Community

Expo provides free hosting for the JS-only apps created by CRNA, allowing you to share your app through the Expo client app. This requires registration for an Expo account.

Install the `exp` command-line tool, and run the publish command:

```
$ npm i -g exp
$ exp publish
```

### Building an Expo "standalone" app

You can also use a service like [Expo's standalone builds](https://docs.expo.io/versions/latest/guides/building-standalone-apps.html) if you want to get an IPA/APK for distribution without having to build the native code yourself.

### Ejecting from Create React Native App

If you want to build and deploy your app yourself, you'll need to eject from CRNA and use Xcode and Android Studio.

This is usually as simple as running `npm run eject` in your project, which will walk you through the process. Make sure to install `react-native-cli` and follow the [native code getting started guide for React Native](https://facebook.github.io/react-native/docs/getting-started.html).
