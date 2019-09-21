#!/bin/bash

# This script is required after a `yarn clean` to migrate all of our dependecy packages 
# to androidx required by Android on June 17th (https://developers.google.com/android/guides/releases#june_17_2019).
#
# We should keep running this until all our dependencies are properly updated to an androidx supported version.

# Step #1:
# Use Jestify to migrate all old library packages to new ones defined on https://developer.android.com/jetpack/androidx/migrate#artifact_mappings from [node_modules].
npx jetify

# Step #2:
# Migrate some library packages manually

# React-native navigation
sed -i -r 's/import android\.support\.annotation\.\*;/import androidx\.annotation\.\*;/g' ./node_modules/react-native-navigation/lib/android/app/src/main/java/com/reactnativenavigation/viewcontrollers/bottomtabs/AttachMode.java
sed -i -r 's/import android\.support\.annotation\.\*;/import androidx\.annotation\.\*;/g' ./node_modules/react-native-navigation/lib/android/app/src/main/java/com/reactnativenavigation/presentation/BottomTabPresenter.java
sed -i -r 's/import android\.support\.annotation\.\*;/import androidx\.annotation\.\*;/g' ./node_modules/react-native-navigation/lib/android/app/src/main/java/com/reactnativenavigation/views/SideMenu.java
sed -i -r 's/import android\.support\.v4\.widget\.\*;/import androidx\.drawerlayout\.widget\.DrawerLayout;/g' ./node_modules/react-native-navigation/lib/android/app/src/main/java/com/reactnativenavigation/views/SideMenu.java
sed -i -r 's/import android\.support\.v4\.content\.\*;/import androidx\.core\.content\.ContextCompat;/g' ./node_modules/react-native-navigation/lib/android/app/src/main/java/com/reactnativenavigation/presentation/BottomTabPresenter.java