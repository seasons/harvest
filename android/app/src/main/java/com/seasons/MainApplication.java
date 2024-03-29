package com.seasons;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.reactnativecommunity.cameraroll.CameraRollPackage;
import com.gettipsi.stripe.StripeReactPackage;
import com.ijzerenhein.sharedelement.RNSharedElementPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.reactnativecommunity.picker.RNCPickerPackage;
import com.reactcommunity.rndatetimepicker.RNDateTimePickerPackage;
import cl.json.RNSharePackage;
import com.reactnativecommunity.netinfo.NetInfoPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.avishayil.rnrestart.ReactNativeRestartPackage;
import com.clipsub.RNShake.RNShakeEventPackage;
import com.segment.analytics.reactnative.core.RNAnalyticsPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import io.sentry.RNSentryPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
import com.swmansion.rnscreens.RNScreensPackage;
import com.auth0.react.A0Auth0Package;
import com.horcrux.svg.SvgPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.seasons.generated.BasePackageList;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;

import org.unimodules.adapters.react.ReactAdapterPackage;
import org.unimodules.adapters.react.ModuleRegistryAdapter;
import org.unimodules.adapters.react.ReactModuleRegistryProvider;
import org.unimodules.core.interfaces.Package;
import org.unimodules.core.interfaces.SingletonModule;
import expo.modules.constants.ConstantsPackage;
import expo.modules.permissions.PermissionsPackage;
import expo.modules.filesystem.FileSystemPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
  private final ReactModuleRegistryProvider mModuleRegistryProvider = new ReactModuleRegistryProvider(
    new BasePackageList().getPackageList(),
    Arrays.<SingletonModule>asList()
  );

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
      @Override
      public boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
      }


    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new CameraRollPackage(),
            new StripeReactPackage(),
            new RNSharedElementPackage(),
            new RNDeviceInfo(),
            new RNCPickerPackage(),
            new RNDateTimePickerPackage(),
            new RNSharePackage(),
            new NetInfoPackage(),
            new AsyncStoragePackage(),
            new ReactNativeRestartPackage(),
            new RNAnalyticsPackage(),
            new ReactNativeConfigPackage(),
            new RNSentryPackage(),
            new RNCWebViewPackage(),
            new SplashScreenReactPackage(),
          (ReactPackage) new SafeAreaContextPackage(),
          new RNScreensPackage(),
          new ReanimatedPackage(),
          new RNGestureHandlerPackage(),
          new AsyncStoragePackage(),
          new SvgPackage(),
          new ModuleRegistryAdapter(mModuleRegistryProvider)    
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new A0Auth0Package(),
            new ReanimatedPackage(),
            new RNGestureHandlerPackage(),
            new ModuleRegistryAdapter(mModuleRegistryProvider),
            new SvgPackage()
    );
  }

  public List<ReactPackage> createAdditionalReactPackages() {
      return getPackages();
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
