#import "RNNViewControllerPresenter.h"
#import "UIViewController+RNNOptions.h"
#import "UITabBarController+RNNOptions.h"
#import "RCTConvert+Modal.h"
#import "RNNTitleViewHelper.h"
#import "UIViewController+LayoutProtocol.h"

@interface RNNViewControllerPresenter() {
	RNNReactView* _customTitleView;
	RNNTitleViewHelper* _titleViewHelper;
	RNNReactComponentRegistry* _componentRegistry;
}

@end

@implementation RNNViewControllerPresenter

- (instancetype)initWithComponentRegistry:(RNNReactComponentRegistry *)componentRegistry:(RNNNavigationOptions *)defaultOptions {
	self = [self initWithDefaultOptions:defaultOptions];
	_componentRegistry = componentRegistry;
	return self;
}

- (void)bindViewController:(UIViewController<RNNLayoutProtocol> *)bindedViewController {
	[super bindViewController:bindedViewController];
	_navigationButtons = [[RNNNavigationButtons alloc] initWithViewController:self.boundViewController componentRegistry:_componentRegistry];
}

- (void)applyOptionsOnWillMoveToParentViewController:(RNNNavigationOptions *)options {
	[super applyOptionsOnWillMoveToParentViewController:options];
	UIViewController* viewController = self.boundViewController;
	RNNNavigationOptions *withDefault = [options withDefault:[self defaultOptions]];
	[viewController rnn_setBackButtonIcon:[withDefault.topBar.backButton.icon getWithDefaultValue:nil] withColor:[withDefault.topBar.backButton.color getWithDefaultValue:nil] title:[withDefault.topBar.backButton.showTitle getWithDefaultValue:YES] ? [withDefault.topBar.backButton.title getWithDefaultValue:nil] : @""];
}

- (void)applyOptions:(RNNNavigationOptions *)options {
	[super applyOptions:options];
	
	UIViewController* viewController = self.boundViewController;
	RNNNavigationOptions *withDefault = [options withDefault:[self defaultOptions]];
	[viewController rnn_setBackgroundImage:[withDefault.backgroundImage getWithDefaultValue:nil]];
	[viewController rnn_setNavigationItemTitle:[withDefault.topBar.title.text getWithDefaultValue:nil]];
	[viewController rnn_setTopBarPrefersLargeTitle:[withDefault.topBar.largeTitle.visible getWithDefaultValue:NO]];
	[viewController rnn_setTabBarItemBadgeColor:[withDefault.bottomTab.badgeColor getWithDefaultValue:nil]];
	[viewController rnn_setStatusBarBlur:[withDefault.statusBar.blur getWithDefaultValue:NO]];
	[viewController rnn_setStatusBarStyle:[withDefault.statusBar.style getWithDefaultValue:@"default"] animated:[withDefault.statusBar.animate getWithDefaultValue:YES]];
	[viewController rnn_setBackButtonVisible:[withDefault.topBar.backButton.visible getWithDefaultValue:YES]];
	[viewController rnn_setInterceptTouchOutside:[withDefault.overlay.interceptTouchOutside getWithDefaultValue:YES]];
	
	if (withDefault.layout.backgroundColor.hasValue) {
		[viewController rnn_setBackgroundColor:withDefault.layout.backgroundColor.get];
	}
	
	if (withDefault.topBar.searchBar.hasValue) {
		BOOL hideNavBarOnFocusSearchBar = YES;
		if (withDefault.topBar.hideNavBarOnFocusSearchBar.hasValue) {
			hideNavBarOnFocusSearchBar = withDefault.topBar.hideNavBarOnFocusSearchBar.get;
		}
		[viewController rnn_setSearchBarWithPlaceholder:[withDefault.topBar.searchBarPlaceholder getWithDefaultValue:@""] hideNavBarOnFocusSearchBar: hideNavBarOnFocusSearchBar];
	}
	
	[self setTitleViewWithSubtitle:withDefault];
}

- (void)applyOptionsOnInit:(RNNNavigationOptions *)options {
	[super applyOptionsOnInit:options];
	
	UIViewController* viewController = self.boundViewController;
	RNNNavigationOptions *withDefault = [options withDefault:[self defaultOptions]];
	[viewController rnn_setModalPresentationStyle:[RCTConvert UIModalPresentationStyle:[withDefault.modalPresentationStyle getWithDefaultValue:@"fullScreen"]]];
	[viewController rnn_setModalTransitionStyle:[RCTConvert UIModalTransitionStyle:[withDefault.modalTransitionStyle getWithDefaultValue:@"coverVertical"]]];
	[viewController rnn_setDrawBehindTopBar:[withDefault.topBar.drawBehind getWithDefaultValue:NO]];
	[viewController rnn_setDrawBehindTabBar:[withDefault.bottomTabs.drawBehind getWithDefaultValue:NO] || ![withDefault.bottomTabs.visible getWithDefaultValue:YES]];
	
	if ((withDefault.topBar.leftButtons || withDefault.topBar.rightButtons)) {
		[_navigationButtons applyLeftButtons:withDefault.topBar.leftButtons rightButtons:withDefault.topBar.rightButtons defaultLeftButtonStyle:withDefault.topBar.leftButtonStyle defaultRightButtonStyle:withDefault.topBar.rightButtonStyle];
	}
}

- (void)mergeOptions:(RNNNavigationOptions *)newOptions currentOptions:(RNNNavigationOptions *)currentOptions {
	[super mergeOptions:newOptions currentOptions:currentOptions];
	
	UIViewController* viewController = self.boundViewController;
	
	if (newOptions.backgroundImage.hasValue) {
		[viewController rnn_setBackgroundImage:newOptions.backgroundImage.get];
	}
	
	if (newOptions.modalPresentationStyle.hasValue) {
		[viewController rnn_setModalPresentationStyle:[RCTConvert UIModalPresentationStyle:newOptions.modalPresentationStyle.get]];
	}
	
	if (newOptions.modalTransitionStyle.hasValue) {
		[viewController rnn_setModalTransitionStyle:[RCTConvert UIModalTransitionStyle:newOptions.modalTransitionStyle.get]];
	}
	
	if (newOptions.topBar.searchBar.hasValue) {
		BOOL hideNavBarOnFocusSearchBar = YES;
		if (newOptions.topBar.hideNavBarOnFocusSearchBar.hasValue) {
			hideNavBarOnFocusSearchBar = newOptions.topBar.hideNavBarOnFocusSearchBar.get;
		}
		[viewController rnn_setSearchBarWithPlaceholder:[newOptions.topBar.searchBarPlaceholder getWithDefaultValue:@""] hideNavBarOnFocusSearchBar:hideNavBarOnFocusSearchBar];
	}
	
	if (newOptions.topBar.drawBehind.hasValue) {
		[viewController rnn_setDrawBehindTopBar:newOptions.topBar.drawBehind.get];
	}
	
	if (newOptions.topBar.title.text.hasValue) {
		[viewController rnn_setNavigationItemTitle:newOptions.topBar.title.text.get];
	}
	
	if (newOptions.topBar.largeTitle.visible.hasValue) {
		[viewController rnn_setTopBarPrefersLargeTitle:newOptions.topBar.largeTitle.visible.get];
	}
	
	if (newOptions.bottomTabs.drawBehind.hasValue) {
		[viewController rnn_setDrawBehindTabBar:newOptions.bottomTabs.drawBehind.get];
	}
	
	if (newOptions.bottomTab.badgeColor.hasValue) {
		[viewController rnn_setTabBarItemBadgeColor:newOptions.bottomTab.badgeColor.get];
	}
	
	if (newOptions.layout.backgroundColor.hasValue) {
		[viewController rnn_setBackgroundColor:newOptions.layout.backgroundColor.get];
	}
	
	if (newOptions.bottomTab.visible.hasValue) {
		[viewController.tabBarController rnn_setCurrentTabIndex:[viewController.tabBarController.viewControllers indexOfObject:viewController]];
	}
	
	if (newOptions.statusBar.blur.hasValue) {
		[viewController rnn_setStatusBarBlur:newOptions.statusBar.blur.get];
	}
	
	if (newOptions.statusBar.style.hasValue) {
		[viewController rnn_setStatusBarStyle:newOptions.statusBar.style.get animated:[newOptions.statusBar.animate getWithDefaultValue:YES]];
	}
	
	if (newOptions.topBar.backButton.visible.hasValue) {
		[viewController rnn_setBackButtonVisible:newOptions.topBar.backButton.visible.get];
	}
	
	if (newOptions.topBar.leftButtons || newOptions.topBar.rightButtons) {
		RNNNavigationOptions* buttonsResolvedOptions = (RNNNavigationOptions *)[currentOptions overrideOptions:newOptions];
		[_navigationButtons applyLeftButtons:newOptions.topBar.leftButtons rightButtons:newOptions.topBar.rightButtons defaultLeftButtonStyle:buttonsResolvedOptions.topBar.leftButtonStyle defaultRightButtonStyle:buttonsResolvedOptions.topBar.rightButtonStyle];
	}
	
	if (newOptions.overlay.interceptTouchOutside.hasValue) {
		RCTRootView* rootView = (RCTRootView*)viewController.view;
		rootView.passThroughTouches = !newOptions.overlay.interceptTouchOutside.get;
	}
	
	[self setTitleViewWithSubtitle:(RNNNavigationOptions *)[currentOptions overrideOptions:newOptions]];
	
	if (newOptions.topBar.title.component.name.hasValue) {
		[self setCustomNavigationTitleView:newOptions perform:nil];
	}
	
	if (newOptions.topBar.backButton.icon.hasValue || newOptions.topBar.backButton.showTitle.hasValue || newOptions.topBar.backButton.color.hasValue || newOptions.topBar.backButton.title.hasValue) {
		[viewController rnn_setBackButtonIcon:[newOptions.topBar.backButton.icon getWithDefaultValue:nil] withColor:[newOptions.topBar.backButton.color getWithDefaultValue:nil] title:[newOptions.topBar.backButton.showTitle getWithDefaultValue:YES] ? [newOptions.topBar.backButton.title getWithDefaultValue:nil] : @""];
	}
}

- (void)renderComponents:(RNNNavigationOptions *)options perform:(RNNReactViewReadyCompletionBlock)readyBlock {
	[self setCustomNavigationTitleView:options perform:readyBlock];
}

- (void)setCustomNavigationTitleView:(RNNNavigationOptions *)options perform:(RNNReactViewReadyCompletionBlock)readyBlock {
	UIViewController<RNNLayoutProtocol>* viewController = self.boundViewController;
	if (![options.topBar.title.component.waitForRender getWithDefaultValue:NO] && readyBlock) {
		readyBlock();
		readyBlock = nil;
	}
	
	if (options.topBar.title.component.name.hasValue) {
		_customTitleView = [_componentRegistry createComponentIfNotExists:options.topBar.title.component parentComponentId:viewController.layoutInfo.componentId reactViewReadyBlock:readyBlock];
		_customTitleView.backgroundColor = UIColor.clearColor;
		NSString* alignment = [options.topBar.title.component.alignment getWithDefaultValue:@""];
		[_customTitleView setAlignment:alignment inFrame:viewController.navigationController.navigationBar.frame];

		viewController.navigationItem.titleView = nil;
		viewController.navigationItem.titleView = _customTitleView;
	} else {
		[_customTitleView removeFromSuperview];
		if (readyBlock) {
			readyBlock();
		}
	}
}

- (void)setTitleViewWithSubtitle:(RNNNavigationOptions *)options {
	if (!_customTitleView && options.topBar.subtitle.text.hasValue) {
		_titleViewHelper = [[RNNTitleViewHelper alloc] initWithTitleViewOptions:options.topBar.title subTitleOptions:options.topBar.subtitle viewController:self.boundViewController];
		[_titleViewHelper setup];
	} else if (_titleViewHelper) {
		if (options.topBar.title.text.hasValue) {
			[_titleViewHelper setTitleOptions:options.topBar.title];
		}
		if (options.topBar.subtitle.text.hasValue) {
			[_titleViewHelper setSubtitleOptions:options.topBar.subtitle];
		}
		
		[_titleViewHelper setup];
	}
}

- (void)dealloc {
	[_componentRegistry clearComponentsForParentId:self.boundComponentId];
}


@end
