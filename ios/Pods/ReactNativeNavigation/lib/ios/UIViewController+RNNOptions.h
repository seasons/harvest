#import <UIKit/UIKit.h>

@class RNNBottomTabOptions;
@class RNNNavigationOptions;

@interface UIViewController (RNNOptions)

- (void)setDefaultOptions:(RNNNavigationOptions *)defaultOptions;

- (void)rnn_setBackgroundImage:(UIImage *)backgroundImage;

- (void)rnn_setModalPresentationStyle:(UIModalPresentationStyle)modalPresentationStyle;

- (void)rnn_setModalTransitionStyle:(UIModalTransitionStyle)modalTransitionStyle;

- (void)rnn_setSearchBarWithPlaceholder:(NSString *)placeholder hideNavBarOnFocusSearchBar:(BOOL)hideNavBarOnFocusSearchBar;

- (void)rnn_setSearchBarHiddenWhenScrolling:(BOOL)searchBarHidden;

- (void)rnn_setDrawBehindTopBar:(BOOL)drawBehind;

- (void)rnn_setDrawBehindTabBar:(BOOL)drawBehindTabBar;

- (void)rnn_setTabBarItemBadgeColor:(UIColor *)badgeColor;

- (void)rnn_setTabBarItemBadge:(NSString *)badge;

- (void)rnn_setTopBarPrefersLargeTitle:(BOOL)prefersLargeTitle;

- (void)rnn_setNavigationItemTitle:(NSString *)title;

- (void)rnn_setStatusBarStyle:(NSString *)style animated:(BOOL)animated;

- (void)rnn_setStatusBarBlur:(BOOL)blur;

- (void)rnn_setBackButtonVisible:(BOOL)visible;

- (void)rnn_setBackgroundColor:(UIColor *)backgroundColor;

- (void)rnn_setInterceptTouchOutside:(BOOL)interceptTouchOutside;

- (void)rnn_setBackButtonIcon:(UIImage *)icon withColor:(UIColor *)color title:(NSString *)title;

- (BOOL)isModal;

@end
