#import "RNNNavigationControllerPresenter.h"
#import "UINavigationController+RNNOptions.h"
#import "RNNNavigationController.h"
#import "RNNCustomTitleView.h"

@interface RNNNavigationControllerPresenter() {
	RNNReactComponentRegistry* _componentRegistry;
	UIView* _customTopBar;
	UIView* _customTopBarBackground;
	RNNReactView* _customTopBarBackgroundReactView;
}

@end
@implementation RNNNavigationControllerPresenter

- (instancetype)initWithComponentRegistry:(RNNReactComponentRegistry *)componentRegistry:(RNNNavigationOptions *)defaultOptions {
	self = [super initWithDefaultOptions:defaultOptions];
	_componentRegistry = componentRegistry;
	return self;
}

- (void)applyOptions:(RNNNavigationOptions *)options {
	[super applyOptions:options];
	
	RNNNavigationController* navigationController = self.boundViewController;
	RNNNavigationOptions * withDefault = [options withDefault:[self defaultOptions]];
	
	self.interactivePopGestureDelegate = [InteractivePopGestureDelegate new];
	self.interactivePopGestureDelegate.navigationController = navigationController;
	self.interactivePopGestureDelegate.originalDelegate = navigationController.interactivePopGestureRecognizer.delegate;
	navigationController.interactivePopGestureRecognizer.delegate = self.interactivePopGestureDelegate;
	
	[navigationController rnn_setInteractivePopGestureEnabled:[withDefault.popGesture getWithDefaultValue:YES]];
	[navigationController rnn_setRootBackgroundImage:[withDefault.rootBackgroundImage getWithDefaultValue:nil]];
	[navigationController rnn_setNavigationBarTestID:[withDefault.topBar.testID getWithDefaultValue:nil]];
	[navigationController rnn_setNavigationBarVisible:[withDefault.topBar.visible getWithDefaultValue:YES] animated:[withDefault.topBar.animate getWithDefaultValue:YES]];
	[navigationController rnn_hideBarsOnScroll:[withDefault.topBar.hideOnScroll getWithDefaultValue:NO]];
	[navigationController rnn_setNavigationBarNoBorder:[withDefault.topBar.noBorder getWithDefaultValue:NO]];
	[navigationController rnn_setBarStyle:[RCTConvert UIBarStyle:[withDefault.topBar.barStyle getWithDefaultValue:@"default"]]];
	[navigationController rnn_setNavigationBarTranslucent:[withDefault.topBar.background.translucent getWithDefaultValue:NO]];
	[navigationController rnn_setNavigationBarClipsToBounds:[withDefault.topBar.background.clipToBounds getWithDefaultValue:NO]];
	[navigationController rnn_setNavigationBarBlur:[withDefault.topBar.background.blur getWithDefaultValue:NO]];
	[navigationController setTopBarBackgroundColor:[withDefault.topBar.background.color getWithDefaultValue:nil]];
	[navigationController rnn_setNavigationBarLargeTitleVisible:[withDefault.topBar.largeTitle.visible getWithDefaultValue:NO]];
	[navigationController rnn_setNavigationBarLargeTitleFontFamily:[withDefault.topBar.largeTitle.fontFamily getWithDefaultValue:nil] fontSize:[withDefault.topBar.largeTitle.fontSize getWithDefaultValue:nil] color:[withDefault.topBar.largeTitle.color getWithDefaultValue:nil]];
	[navigationController rnn_setNavigationBarFontFamily:[withDefault.topBar.title.fontFamily getWithDefaultValue:nil] fontSize:[withDefault.topBar.title.fontSize getWithDefaultValue:nil] color:[withDefault.topBar.title.color getWithDefaultValue:nil]];
	[navigationController rnn_setBackButtonColor:[withDefault.topBar.backButton.color getWithDefaultValue:nil]];
}

- (void)applyOptionsOnViewDidLayoutSubviews:(RNNNavigationOptions *)options {
	RNNNavigationOptions *withDefault = [options withDefault:[self defaultOptions]];
	if (withDefault.topBar.background.component.name.hasValue) {
		[self presentBackgroundComponent];
	}
}

- (void)applyOptionsBeforePopping:(RNNNavigationOptions *)options {
	RNNNavigationOptions *withDefault = [options withDefault:[self defaultOptions]];
	RNNNavigationController* navigationController = self.boundViewController;
	[navigationController setTopBarBackgroundColor:[withDefault.topBar.background.color getWithDefaultValue:nil]];
	[navigationController rnn_setNavigationBarFontFamily:[withDefault.topBar.title.fontFamily getWithDefaultValue:nil] fontSize:[withDefault.topBar.title.fontSize getWithDefaultValue:nil] color:[withDefault.topBar.title.color getWithDefaultValue:[UIColor blackColor]]];
	[navigationController rnn_setNavigationBarLargeTitleVisible:[withDefault.topBar.largeTitle.visible getWithDefaultValue:NO]];
}

- (void)mergeOptions:(RNNNavigationOptions *)newOptions currentOptions:(RNNNavigationOptions *)currentOptions {
	[super mergeOptions:newOptions currentOptions:currentOptions];
	
	RNNNavigationController* navigationController = self.boundViewController;
	
	if (newOptions.popGesture.hasValue) {
		[navigationController rnn_setInteractivePopGestureEnabled:newOptions.popGesture.get];
	}
	
	if (newOptions.rootBackgroundImage.hasValue) {
		[navigationController rnn_setRootBackgroundImage:newOptions.rootBackgroundImage.get];
	}
	
	if (newOptions.topBar.testID.hasValue) {
		[navigationController rnn_setNavigationBarTestID:newOptions.topBar.testID.get];
	}
	
	if (newOptions.topBar.visible.hasValue) {
		[navigationController rnn_setNavigationBarVisible:newOptions.topBar.visible.get animated:[newOptions.topBar.animate getWithDefaultValue:YES]];
	}
	
	if (newOptions.topBar.hideOnScroll.hasValue) {
		[navigationController rnn_hideBarsOnScroll:[newOptions.topBar.hideOnScroll get]];
	}
	
	if (newOptions.topBar.noBorder.hasValue) {
		[navigationController rnn_setNavigationBarNoBorder:[newOptions.topBar.noBorder get]];
	}
	
	if (newOptions.topBar.barStyle.hasValue) {
		[navigationController rnn_setBarStyle:[RCTConvert UIBarStyle:newOptions.topBar.barStyle.get]];
	}
	
	if (newOptions.topBar.background.translucent.hasValue) {
		[navigationController rnn_setNavigationBarTranslucent:[newOptions.topBar.background.translucent get]];
	}
	
	if (newOptions.topBar.background.clipToBounds.hasValue) {
		[navigationController rnn_setNavigationBarClipsToBounds:[newOptions.topBar.background.clipToBounds get]];
	}
	
	if (newOptions.topBar.background.blur.hasValue) {
		[navigationController rnn_setNavigationBarBlur:[newOptions.topBar.background.blur get]];
	}
	
	if (newOptions.topBar.background.color.hasValue) {
		[navigationController setTopBarBackgroundColor:newOptions.topBar.background.color.get];
	}
	
	if (newOptions.topBar.largeTitle.visible.hasValue) {
		[navigationController rnn_setNavigationBarLargeTitleVisible:newOptions.topBar.largeTitle.visible.get];
	}
	
	if (newOptions.topBar.backButton.color.hasValue) {
		[navigationController rnn_setBackButtonColor:newOptions.topBar.backButton.color.get];
	}
	

	RNNLargeTitleOptions *largteTitleOptions = newOptions.topBar.largeTitle;
	if (largteTitleOptions.color.hasValue || largteTitleOptions.fontSize.hasValue || largteTitleOptions.fontFamily.hasValue) {
		[navigationController rnn_setNavigationBarLargeTitleFontFamily:[newOptions.topBar.largeTitle.fontFamily getWithDefaultValue:nil] fontSize:[newOptions.topBar.largeTitle.fontSize getWithDefaultValue:nil] color:[newOptions.topBar.largeTitle.color getWithDefaultValue:nil]];
	}
	
	[navigationController rnn_setNavigationBarFontFamily:[newOptions.topBar.title.fontFamily getWithDefaultValue:nil] fontSize:[newOptions.topBar.title.fontSize getWithDefaultValue:nil] color:[newOptions.topBar.title.color getWithDefaultValue:nil]];
	
	if (newOptions.topBar.component.name.hasValue) {
		[self setCustomNavigationBarView:newOptions perform:nil];
	}
	
	if (newOptions.topBar.background.component.name.hasValue) {
		[self setCustomNavigationComponentBackground:newOptions perform:nil];
	}
}

- (void)renderComponents:(RNNNavigationOptions *)options perform:(RNNReactViewReadyCompletionBlock)readyBlock {
	dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_HIGH, 0), ^{
		dispatch_group_t group = dispatch_group_create();
		
		dispatch_group_enter(group);
		dispatch_async(dispatch_get_main_queue(), ^{
			[self setCustomNavigationBarView:options perform:^{
				dispatch_group_leave(group);
			}];
		});
		
		dispatch_group_enter(group);
		dispatch_async(dispatch_get_main_queue(), ^{
			[self setCustomNavigationComponentBackground:options perform:^{
				dispatch_group_leave(group);
			}];
		});
		
		dispatch_group_wait(group, DISPATCH_TIME_FOREVER);
		
		dispatch_async(dispatch_get_main_queue(), ^{
			if (readyBlock) {
				readyBlock();
			}
		});
	});
}

- (void)setCustomNavigationBarView:(RNNNavigationOptions *)options perform:(RNNReactViewReadyCompletionBlock)readyBlock {
	RNNNavigationController* navigationController = self.boundViewController;
	if (![options.topBar.component.waitForRender getWithDefaultValue:NO] && readyBlock) {
		readyBlock();
		readyBlock = nil;
	}
	if (options.topBar.component.name.hasValue) {
		NSString* currentChildComponentId = [navigationController getCurrentChild].layoutInfo.componentId;
		RCTRootView *reactView = [_componentRegistry createComponentIfNotExists:options.topBar.component parentComponentId:currentChildComponentId reactViewReadyBlock:readyBlock];
		
		if (_customTopBar) {
			[_customTopBar removeFromSuperview];
		}
		_customTopBar = [[RNNCustomTitleView alloc] initWithFrame:navigationController.navigationBar.bounds subView:reactView alignment:@"fill"];
		reactView.backgroundColor = UIColor.clearColor;
		_customTopBar.backgroundColor = UIColor.clearColor;
		[navigationController.navigationBar addSubview:_customTopBar];
	} else {
		[_customTopBar removeFromSuperview];
		_customTopBar = nil;
		if (readyBlock) {
			readyBlock();
		}
	}
}

- (void)setCustomNavigationComponentBackground:(RNNNavigationOptions *)options perform:(RNNReactViewReadyCompletionBlock)readyBlock {
	RNNNavigationController* navigationController = self.boundViewController;
	if (![options.topBar.background.component.waitForRender getWithDefaultValue:NO] && readyBlock) {
		readyBlock();
		readyBlock = nil;
	}
	if (options.topBar.background.component.name.hasValue) {
		NSString* currentChildComponentId = [navigationController getCurrentChild].layoutInfo.componentId;
		RNNReactView *reactView = [_componentRegistry createComponentIfNotExists:options.topBar.background.component parentComponentId:currentChildComponentId reactViewReadyBlock:readyBlock];
		_customTopBarBackgroundReactView = reactView;
		
	} else {
		[_customTopBarBackground removeFromSuperview];
		_customTopBarBackground = nil;
		if (readyBlock) {
			readyBlock();
		}
	}
}

- (void)presentBackgroundComponent {
	RNNNavigationController* navigationController = self.boundViewController;
	if (_customTopBarBackground) {
		[_customTopBarBackground removeFromSuperview];
	}
	RNNCustomTitleView* customTopBarBackground = [[RNNCustomTitleView alloc] initWithFrame:navigationController.navigationBar.bounds subView:_customTopBarBackgroundReactView alignment:@"fill"];
	_customTopBarBackground = customTopBarBackground;
	
	[navigationController.navigationBar insertSubview:_customTopBarBackground atIndex:1];
}

- (void)dealloc {
	[_componentRegistry removeComponent:self.boundComponentId];
}

@end
