import { useAuth } from "@/src/stores/AuthStore";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "@react-navigation/elements";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ChangePasswordScreen() {
  // 表单状态
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  // 如果有认证hook
  const { user } = useAuth();

  // 处理输入变化
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // 清除该字段的错误
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }

    // 如果是新密码字段，检查密码强度
    if (field === "newPassword") {
      checkPasswordStrength(value);
    }
  };

  // 检查密码强度
  const checkPasswordStrength = (password: string) => {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    };

    setPasswordRequirements(requirements);

    // 计算强度分数（0-100）
    const score = Object.values(requirements).filter(Boolean).length * 20;
    setPasswordStrength(score);
  };

  // 密码强度指示器
  const PasswordStrengthIndicator = () => {
    let strengthText = "";
    let strengthColor = "";

    if (passwordStrength === 0) {
      strengthText = "无";
      strengthColor = "#e0e0e0";
    } else if (passwordStrength <= 40) {
      strengthText = "弱";
      strengthColor = "#ff3b30";
    } else if (passwordStrength <= 60) {
      strengthText = "一般";
      strengthColor = "#ff9500";
    } else if (passwordStrength <= 80) {
      strengthText = "强";
      strengthColor = "#34c759";
    } else {
      strengthText = "非常强";
      strengthColor = "#32d74b";
    }

    return (
      <View style={styles.strengthContainer}>
        <Text style={styles.strengthLabel}>密码强度: </Text>
        <Text style={[styles.strengthText, { color: strengthColor }]}>
          {strengthText}
        </Text>
        <View style={styles.strengthBarContainer}>
          <View
            style={[
              styles.strengthBar,
              {
                width: `${passwordStrength}%`,
                backgroundColor: strengthColor,
              },
            ]}
          />
        </View>
      </View>
    );
  };

  // 密码要求列表
  const PasswordRequirements = () => (
    <View style={styles.requirementsContainer}>
      <Text style={styles.requirementsTitle}>密码要求:</Text>
      <View style={styles.requirementItem}>
        <Ionicons
          name={
            passwordRequirements.length ? "checkmark-circle" : "ellipse-outline"
          }
          size={16}
          color={passwordRequirements.length ? "#34c759" : "#8e8e93"}
        />
        <Text
          style={[
            styles.requirementText,
            passwordRequirements.length && styles.requirementMet,
          ]}
        >
          至少8个字符
        </Text>
      </View>
      <View style={styles.requirementItem}>
        <Ionicons
          name={
            passwordRequirements.uppercase
              ? "checkmark-circle"
              : "ellipse-outline"
          }
          size={16}
          color={passwordRequirements.uppercase ? "#34c759" : "#8e8e93"}
        />
        <Text
          style={[
            styles.requirementText,
            passwordRequirements.uppercase && styles.requirementMet,
          ]}
        >
          至少一个大写字母
        </Text>
      </View>
      <View style={styles.requirementItem}>
        <Ionicons
          name={
            passwordRequirements.lowercase
              ? "checkmark-circle"
              : "ellipse-outline"
          }
          size={16}
          color={passwordRequirements.lowercase ? "#34c759" : "#8e8e93"}
        />
        <Text
          style={[
            styles.requirementText,
            passwordRequirements.lowercase && styles.requirementMet,
          ]}
        >
          至少一个小写字母
        </Text>
      </View>
      <View style={styles.requirementItem}>
        <Ionicons
          name={
            passwordRequirements.number ? "checkmark-circle" : "ellipse-outline"
          }
          size={16}
          color={passwordRequirements.number ? "#34c759" : "#8e8e93"}
        />
        <Text
          style={[
            styles.requirementText,
            passwordRequirements.number && styles.requirementMet,
          ]}
        >
          至少一个数字
        </Text>
      </View>
      <View style={styles.requirementItem}>
        <Ionicons
          name={
            passwordRequirements.special
              ? "checkmark-circle"
              : "ellipse-outline"
          }
          size={16}
          color={passwordRequirements.special ? "#34c759" : "#8e8e93"}
        />
        <Text
          style={[
            styles.requirementText,
            passwordRequirements.special && styles.requirementMet,
          ]}
        >
          至少一个特殊字符
        </Text>
      </View>
    </View>
  );

  // 验证表单
  const validateForm = () => {
    const newErrors = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };

    let isValid = true;

    // 验证当前密码
    if (!formData.currentPassword.trim()) {
      newErrors.currentPassword = "请输入当前密码";
      isValid = false;
    }

    // 验证新密码
    if (!formData.newPassword.trim()) {
      newErrors.newPassword = "请输入新密码";
      isValid = false;
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "密码至少需要8个字符";
      isValid = false;
    }

    // 验证确认密码
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "请确认新密码";
      isValid = false;
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "两次输入的密码不一致";
      isValid = false;
    }

    // 检查新密码是否与旧密码相同
    if (
      formData.currentPassword &&
      formData.newPassword &&
      formData.currentPassword === formData.newPassword
    ) {
      newErrors.newPassword = "新密码不能与当前密码相同";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // 提交表单
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // 这里调用修改密码的API
      // 示例：await changePasswordAPI(formData.currentPassword, formData.newPassword);

      // 模拟API调用延迟
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // 显示成功消息
      Alert.alert("修改成功", "您的密码已成功修改，请使用新密码登录", [
        {
          text: "确定",
          onPress: () => {
            // 清除表单
            setFormData({
              currentPassword: "",
              newPassword: "",
              confirmPassword: "",
            });

            // 返回到上一页或特定页面
            router.back();

            // 如果需要重新登录，可以在这里处理
            // router.replace('/(drawer)/login');
          },
        },
      ]);
    } catch (error: any) {
      // 处理错误
      Alert.alert(
        "修改失败",
        error.message || "修改密码时发生错误，请稍后重试"
      );
    } finally {
      setLoading(false);
    }
  };

  // 密码输入框组件
  const PasswordInput = ({
    label,
    value,
    onChangeText,
    error,
    showPassword,
    onToggleShow,
    placeholder,
  }: any) => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={[styles.inputWrapper, error ? styles.inputError : null]}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!showPassword}
          placeholder={placeholder}
          placeholderTextColor="#8e8e93"
          autoCapitalize="none"
          autoCorrect={false}
          editable={!loading}
        />
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={onToggleShow}
          disabled={loading}
        >
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={22}
            color="#8e8e93"
          />
        </TouchableOpacity>
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 安全提示 */}
        <View style={styles.securityNote}>
          <Ionicons name="shield-checkmark" size={24} color="#1e88e5" />
          <Text style={styles.securityNoteText}>
            为了您的账户安全，请定期修改密码
          </Text>
        </View>

        {/* 当前密码 */}
        <PasswordInput
          label="当前密码"
          value={formData.currentPassword}
          onChangeText={(text: string) =>
            handleInputChange("currentPassword", text)
          }
          error={errors.currentPassword}
          showPassword={showPassword.current}
          onToggleShow={() =>
            setShowPassword((prev) => ({ ...prev, current: !prev.current }))
          }
          placeholder="请输入当前密码"
        />

        {/* 新密码 */}
        <PasswordInput
          label="新密码"
          value={formData.newPassword}
          onChangeText={(text: string) =>
            handleInputChange("newPassword", text)
          }
          error={errors.newPassword}
          showPassword={showPassword.new}
          onToggleShow={() =>
            setShowPassword((prev) => ({ ...prev, new: !prev.new }))
          }
          placeholder="请输入新密码"
        />

        {/* 密码强度指示器 */}
        {formData.newPassword ? (
          <>
            <PasswordStrengthIndicator />
            <PasswordRequirements />
          </>
        ) : null}

        {/* 确认新密码 */}
        <PasswordInput
          label="确认新密码"
          value={formData.confirmPassword}
          onChangeText={(text: string) =>
            handleInputChange("confirmPassword", text)
          }
          error={errors.confirmPassword}
          showPassword={showPassword.confirm}
          onToggleShow={() =>
            setShowPassword((prev) => ({ ...prev, confirm: !prev.confirm }))
          }
          placeholder="请再次输入新密码"
        />

        {/* 安全提示 */}
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>安全提示:</Text>
          <View style={styles.tipItem}>
            <Ionicons name="information-circle" size={16} color="#1e88e5" />
            <Text style={styles.tipText}>
              建议使用包含字母、数字和特殊字符的组合
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Ionicons name="information-circle" size={16} color="#1e88e5" />
            <Text style={styles.tipText}>
              避免使用生日、电话号码等容易被猜到的密码
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Ionicons name="information-circle" size={16} color="#1e88e5" />
            <Text style={styles.tipText}>定期修改密码可以提高账户安全性</Text>
          </View>
        </View>

        {/* 提交按钮 */}
        <TouchableOpacity
          style={[styles.submitButton, loading && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Ionicons
                name="lock-closed"
                size={20}
                color="#fff"
                style={styles.buttonIcon}
              />
              <Text style={styles.submitButtonText}>修改密码</Text>
            </>
          )}
        </TouchableOpacity>

        {/* 取消按钮 */}
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => router.back()}
          disabled={loading}
        >
          <Text style={styles.cancelButtonText}>取消</Text>
        </TouchableOpacity>
        <Button onPress={() => router.push("/settings/notices")}>
          返回通知设置
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 20,
    paddingTop: 10,
  },
  securityNote: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e3f2fd",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  securityNoteText: {
    marginLeft: 12,
    fontSize: 14,
    color: "#1e88e5",
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1c1c1e",
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    overflow: "hidden",
  },
  input: {
    flex: 1,
    height: 56,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#1c1c1e",
  },
  inputError: {
    borderColor: "#ff3b30",
  },
  eyeButton: {
    paddingHorizontal: 16,
    height: 56,
    justifyContent: "center",
  },
  errorText: {
    color: "#ff3b30",
    fontSize: 14,
    marginTop: 6,
    marginLeft: 4,
  },
  strengthContainer: {
    marginTop: 8,
    marginBottom: 16,
  },
  strengthLabel: {
    fontSize: 14,
    color: "#8e8e93",
    marginBottom: 6,
  },
  strengthText: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },
  strengthBarContainer: {
    height: 6,
    backgroundColor: "#e0e0e0",
    borderRadius: 3,
    overflow: "hidden",
  },
  strengthBar: {
    height: "100%",
    borderRadius: 3,
  },
  requirementsContainer: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  requirementsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1c1c1e",
    marginBottom: 12,
  },
  requirementItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  requirementText: {
    fontSize: 13,
    color: "#8e8e93",
    marginLeft: 8,
  },
  requirementMet: {
    color: "#34c759",
  },
  tipsContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1c1c1e",
    marginBottom: 12,
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  tipText: {
    fontSize: 13,
    color: "#8e8e93",
    marginLeft: 8,
    flex: 1,
    lineHeight: 18,
  },
  submitButton: {
    backgroundColor: "#1e88e5",
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 12,
    shadowColor: "#1e88e5",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  submitButtonDisabled: {
    backgroundColor: "#64b5f6",
    opacity: 0.8,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonIcon: {
    marginRight: 8,
  },
  cancelButton: {
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    backgroundColor: "#fff",
  },
  cancelButtonText: {
    color: "#757575",
    fontSize: 16,
    fontWeight: "600",
  },
});
