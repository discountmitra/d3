import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Colors, FontSizes, Spacing } from "../../theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { apiService } from "../../lib/api";

export default function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isCheckingUser, setIsCheckingUser] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);

  const handlePhoneChange = (text: string) => {
    // Remove any non-digit characters
    const cleanedText = text.replace(/\D/g, "");
    
    if (cleanedText.length > 10) {
      setPhoneError("Phone number cannot exceed 10 digits");
      return;
    }
    
    // Validate Indian phone number format
    if (cleanedText.length === 10) {
      // Indian mobile numbers start with 6, 7, 8, or 9
      const firstDigit = cleanedText.charAt(0);
      if (!['6', '7', '8', '9'].includes(firstDigit)) {
        setPhoneError("Invalid Indian mobile number format");
        return;
      }
    }
    
    setPhoneError("");
    setUserNotFound(false);
    setPhoneNumber(cleanedText);
  };

  const handleContinue = async () => {
    if (!phoneNumber.trim()) {
      Alert.alert("Error", "Please enter your phone number");
      return;
    }

    if (phoneError) {
      Alert.alert("Error", "Please fix the phone number");
      return;
    }

    if (phoneNumber.length !== 10) {
      Alert.alert("Error", "Please enter a valid 10-digit phone number");
      return;
    }

    setIsCheckingUser(true);
    setUserNotFound(false);
    
    try {
      // Send OTP via SMS for login
      const result = await apiService.sendOTP(phoneNumber, true);
      
      if (result.success) {
        // Navigate to OTP verification screen with phone number
        router.push({
          pathname: "/(auth)/verify-phone",
          params: { phoneNumber: phoneNumber }
        });
      } else {
        // Check if user doesn't exist
        if (result.userExists === false) {
          setUserNotFound(true);
        } else {
          Alert.alert("Error", result.message);
        }
      }
    } catch (error) {
      Alert.alert("Error", "Failed to send verification code. Please try again.");
    } finally {
      setIsCheckingUser(false);
    }
  };

  const handleRegister = () => {
    router.push("/(auth)/complete-profile");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Login</Text>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Enter your phone number to continue</Text>

        {/* Phone Number Field */}
        <View style={styles.fieldContainer}>
          <TextInput
            style={[styles.input, phoneError ? styles.inputError : null]}
            placeholder="Phone number"
            value={phoneNumber}
            onChangeText={handlePhoneChange}
            keyboardType="phone-pad"
            maxLength={10}
          />
          {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}
          {userNotFound ? (
            <Text style={styles.warningText}>
              There is no account associated with this number
            </Text>
          ) : null}
        </View>

        {/* Continue Button */}
        <TouchableOpacity 
          style={[
            styles.continueButton, 
            { opacity: phoneNumber.length === 10 && !isCheckingUser ? 1 : 0.5 }
          ]} 
          onPress={handleContinue}
          disabled={phoneNumber.length !== 10 || isCheckingUser}
        >
          <Text style={styles.continueButtonText}>
            {isCheckingUser ? "Checking..." : "Continue"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Register Link */}
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Don't have an account? </Text>
        <TouchableOpacity onPress={handleRegister}>
          <Text style={styles.registerLink}>Register Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
    backgroundColor: "#fff",
  },
  headerContent: {
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.primary,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    justifyContent: "center",
    paddingTop: Spacing.xl,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: Spacing.sm,
    textAlign: "center",
    color: Colors.primary,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: Spacing.xl,
    lineHeight: 24,
  },
  fieldContainer: {
    marginBottom: Spacing.xl,
  },
  input: {
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    fontSize: 16,
    color: Colors.primary,
    borderWidth: 1,
    borderColor: "transparent",
  },
  inputError: {
    borderColor: "#DC2626",
  },
  errorText: {
    color: "#DC2626",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  warningText: {
    color: "#F59E0B",
    fontSize: 14,
    marginTop: Spacing.xs,
    textAlign: "center",
  },
  continueButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    borderRadius: 12,
    alignItems: "center",
  },
  continueButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
    paddingTop: Spacing.lg,
  },
  registerText: {
    fontSize: 14,
    color: "#6B7280",
  },
  registerLink: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: "600",
  },
});
