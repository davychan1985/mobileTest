import { router } from "expo-router";
import { Alert } from "react-native";

/**
 * 安全导航函数 - 自动处理类型错误
 * @param path 目标路径
 * @param params 可选参数
 */
export const safeNavigate = (path: string, params?: Record<string, any>) => {
  try {
    if (params) {
      router.push({ pathname: path, params } as any);
    } else {
      router.push(path as any);
    }
  } catch (error) {
    console.error("导航错误:", error);
    // 可以在这里添加更多错误处理逻辑
    return false;
  }
  return true;
};

/**
 * 替换当前页面（无返回）
 */
export const safeReplace = (path: string, params?: Record<string, any>) => {
  try {
    if (params) {
      router.replace({ pathname: path, params } as any);
    } else {
      router.replace(path as any);
    }
  } catch (error) {
    console.error("替换页面错误:", error);
    return false;
  }
  return true;
};

/**
 * 返回上一页
 */
export const safeBack = () => {
  try {
    if (router.canGoBack()) {
      router.back();
      return true;
    }
    return false;
  } catch (error) {
    console.error("返回错误:", error);
    return false;
  }
};

/**
 * 带确认的导航（防止误操作）
 */
export const confirmNavigate = (
  path: string,
  message: string = "确认要离开当前页面吗？",
  title: string = "提示"
): Promise<boolean> => {
  return new Promise((resolve) => {
    Alert.alert(
      title,
      message,
      [
        { text: "取消", style: "cancel", onPress: () => resolve(false) },
        {
          text: "确认",
          onPress: () => {
            const result = safeNavigate(path);
            resolve(result);
          },
        },
      ]
    );
  });
};

/**
 * 预加载页面后导航（提升性能）
 */
export const prefetchAndNavigate = async (path: string, params?: Record<string, any>) => {
  try {
    // 预加载页面
    await router.prefetch(path as any);
    
    // 延迟一小段时间让预加载生效
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // 执行导航
    return safeNavigate(path, params);
  } catch (error) {
    console.error("预加载导航错误:", error);
    return false;
  }
};