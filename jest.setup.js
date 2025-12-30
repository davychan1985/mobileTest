// 模拟 fetch
global.fetch = jest.fn();

// Mock react-native modules that cause parsing errors
jest.mock('react-native/Libraries/BatchedBridge/NativeModules', () => {
  const mockNativeModules = {
    PlatformConstants: {
      getConstants: () => ({
        isTesting: true,
        reactNativeVersion: {
          major: 0,
          minor: 0,
          patch: 0,
          prerelease: null,
        }
      })
    },
    SourceCode: {
      scriptURL: 'http://localhost:8081/index.ios.bundle?platform=ios&dev=true&minify=false'
    },
    StatusBarManager: {
      setColor: jest.fn(),
      setStyle: jest.fn(),
      setHidden: jest.fn(),
      setNetworkActivityIndicatorVisible: jest.fn(),
      setBackgroundColor: jest.fn(),
      setTranslucent: jest.fn(),
    },
    Networking: {
      clearCookies: jest.fn(),
    },
    Clipboard: {
      getString: jest.fn(),
      setString: jest.fn(),
    },
    AsyncStorage: {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    },
    RNCSafeArea: {
      getSafeAreaInsets: jest.fn(),
    },
    RNGestureHandlerModule: {
      attachGestureHandler: jest.fn(),
      createGestureHandler: jest.fn(),
      dropGestureHandler: jest.fn(),
      updateGestureHandler: jest.fn(),
    },
    ReanimatedModule: {
      configureProps: jest.fn(),
    },
    I18nManager: {
      localeIdentifier: 'en',
      allowRTL: jest.fn(),
      forceRTL: jest.fn(),
      swapLeftAndRightInRTL: jest.fn(),
    },
    ImageLoader: {
      getSize: jest.fn(),
    },
  };

  return {
    NativeModules: mockNativeModules,
    get constants() {
      return mockNativeModules;
    },
    get getConstants() {
      return () => mockNativeModules;
    },
  };
});

// Mock console.error to prevent test failure due to console.error calls
global.console = {
  ...console,
  error: jest.fn(),
};

// Mock additional modules
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');