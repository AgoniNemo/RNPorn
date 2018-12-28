import { Easing,Animated,I18nManager,Platform } from 'react-native';
/*
* 从上至下动画
* */
const forVerticalTop = (sceneProps)=>{
    const { layout, position, scene } = sceneProps;
    const index = scene.index;
    const height = layout.initHeight;
    const width = layout.initWidth;

    const opacity = position.interpolate({
        inputRange: ([
            index - 1,
            index - 0.99,
            index,
            index + 0.99,
            index + 1,
        ]: Array<number>),
        outputRange: ([1, 1, 1, 0.85, 0]: Array<number>),
    });

    const translateX = 0;
    // const translateX = position.interpolate({
    //     inputRange: ([index, index+1, index + 1]: Array<number>),
    //     outputRange: ([0,width,0]: Array<number>),
    // });
    const translateY = position.interpolate({
        inputRange: ([index, index+1, index + 1]: Array<number>),
        outputRange: ([0,height,height,]: Array<number>),
    });

    return {
        opacity,
        transform: [{ translateX }, { translateY }],
    };

};

/*
 * 从左至右动画
 * */
const forHorizontalLeft = (sceneProps)=>{
    const { layout, position, scene } = sceneProps;

    const index = scene.index;
    const inputRange = [index - 1, index, index + 1];

    const width = layout.initWidth;
    const outputRange = I18nManager.isRTL
        ? ([width, 0, -width * 0.3]: Array<number>)
        : ([-width, 0, width * -0.3]: Array<number>);
        
    // Add [index - 1, index - 0.99] to the interpolated opacity for screen transition.
    // This makes the screen's shadow to disappear smoothly.
    const opacity = position.interpolate({
        inputRange: ([
            index - 1,
            index - 0.99,
            index,
            index + 0.99,
            index + 1,
        ]: Array<number>),
        outputRange: ([0, 1, 1, 0.85, 0]: Array<number>),
    });

    const translateY = 0;
    const translateX = position.interpolate({
        inputRange,
        outputRange,
    });

    return {
        opacity,
        transform: [{ translateX }, { translateY }],
    };
};

/*
 * 从右至左动画
 * */
const forHorizontalRight = (sceneProps)=>{
    const { layout, position, scene } = sceneProps;
    
    const index = scene.index;
    const inputRange = [index - 1, index, index + 1];

    const width = layout.initWidth;
    const outputRange = I18nManager.isRTL
        ? ([-width, 0, width * 0.3]: Array<number>)
        : ([width, 0, -width]: Array<number>);
        
    //[1, 1.01, 2, 2.99, 3]
    const opacity = position.interpolate({
        inputRange: ([
            index - 1,
            index - 0.99,
            index,
            index + 0.99,
            index + 1,
        ]: Array<number>),
        outputRange: ([0, 1, 1, 0.85, 0]: Array<number>),
    });

    const translateY = 0;
    const translateX = position.interpolate({
        inputRange,
        outputRange,
    });

    return {
        opacity,
        transform: [{ translateX }, { translateY }],
    };
};


/** 
 * 淡入淡出
*/
const forFadeInAndFadeOut = (sceneProps)=>{

    const {layout, position, scene} = sceneProps;
    const index = scene.index;

    const opacity = position.interpolate({
        inputRange: ([
            index - 1,
            index - 0.55,
            index,
            index + 0.55,
            index + 1,
        ]: Array<number>),
        outputRange: ([0, 1, 1,0.85, 0]: Array<number>),
    });

    return {
        opacity,
    };
};

//实现定义某个页面的动画效果
const TransitionConfiguration = () => {
    return {
        transitionSpec: {
            duration: 300,
            easing: Easing.linear(),
            timing: Animated.timing,
        },
        screenInterpolator: (sceneProps) => {
            const {scene } = sceneProps;
            const { route,index } = scene;
            const params = route.params || {};
            const transition = params.transition || 'forHorizontal';
            switch (transition){
                case 'forVerticalTop':
                    return forVerticalTop(sceneProps);
                case 'forHorizontalLeft':
                    return forHorizontalLeft(sceneProps);
                case 'forHorizontalRight':
                    return forHorizontalRight(sceneProps);
                default: {
                    if (Platform.OS == 'ios') {
                        return forHorizontalRight(sceneProps);
                    }
                    return forFadeInAndFadeOut(sceneProps);
                }
            }
        },
    };
};

export default TransitionConfiguration;