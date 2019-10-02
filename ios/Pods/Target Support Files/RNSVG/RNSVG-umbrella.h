#ifdef __OBJC__
#import <UIKit/UIKit.h>
#else
#ifndef FOUNDATION_EXPORT
#if defined(__cplusplus)
#define FOUNDATION_EXPORT extern "C"
#else
#define FOUNDATION_EXPORT extern
#endif
#endif
#endif

#import "RNSVGBrush.h"
#import "RNSVGBrushType.h"
#import "RNSVGPainter.h"
#import "RNSVGPainterBrush.h"
#import "RNSVGSolidColorBrush.h"
#import "RNSVGClipPath.h"
#import "RNSVGDefs.h"
#import "RNSVGGroup.h"
#import "RNSVGImage.h"
#import "RNSVGLinearGradient.h"
#import "RNSVGMask.h"
#import "RNSVGPath.h"
#import "RNSVGRadialGradient.h"
#import "RNSVGSvgView.h"
#import "RNSVGSymbol.h"
#import "RNSVGUse.h"
#import "RNSVGContainer.h"
#import "RNSVGNode.h"
#import "RNSVGPattern.h"
#import "RNSVGRenderable.h"
#import "RNSVGCircle.h"
#import "RNSVGEllipse.h"
#import "RNSVGLine.h"
#import "RNSVGRect.h"
#import "RNSVGFontData.h"
#import "RNSVGGlyphContext.h"
#import "RNSVGPropHelper.h"
#import "RNSVGText.h"
#import "RNSVGTextPath.h"
#import "RNSVGTextProperties.h"
#import "RNSVGTSpan.h"
#import "RCTConvert+RNSVG.h"
#import "RNSVGBezierElement.h"
#import "RNSVGCGFCRule.h"
#import "RNSVGLength.h"
#import "RNSVGPathParser.h"
#import "RNSVGPercentageConverter.h"
#import "RNSVGUnits.h"
#import "RNSVGVBMOS.h"
#import "RNSVGVectorEffect.h"
#import "RNSVGViewBox.h"
#import "RNSVGCircleManager.h"
#import "RNSVGClipPathManager.h"
#import "RNSVGDefsManager.h"
#import "RNSVGEllipseManager.h"
#import "RNSVGGroupManager.h"
#import "RNSVGImageManager.h"
#import "RNSVGLinearGradientManager.h"
#import "RNSVGLineManager.h"
#import "RNSVGMaskManager.h"
#import "RNSVGNodeManager.h"
#import "RNSVGPathManager.h"
#import "RNSVGPatternManager.h"
#import "RNSVGRadialGradientManager.h"
#import "RNSVGRectManager.h"
#import "RNSVGRenderableManager.h"
#import "RNSVGSvgViewManager.h"
#import "RNSVGSymbolManager.h"
#import "RNSVGTextManager.h"
#import "RNSVGTextPathManager.h"
#import "RNSVGTSpanManager.h"
#import "RNSVGUseManager.h"

FOUNDATION_EXPORT double RNSVGVersionNumber;
FOUNDATION_EXPORT const unsigned char RNSVGVersionString[];

