package com.seasons;

import android.os.Bundle;

import com.reactnativenavigation.NavigationActivity;

public class MainActivity extends NavigationActivity {

//     /**
////      * Returns the name of the main component registered from JavaScript.
////      * This is used to schedule rendering of the component.
////      */
////     protected String getMainComponentName() {
////         return "seasons";
////     }
//
//    @Override
//    protected ReactActivityDelegate createReactActivityDelegate() {
//        return new ReactActivityDelegate(this, getMainComponentName()) {
//            @Override
//            protected ReactRootView createRootView() {
//                return new RNGestureHandlerEnabledRootView(MainActivity.this);
//            }
//        };
//    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }
}
