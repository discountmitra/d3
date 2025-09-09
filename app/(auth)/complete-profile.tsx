import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Colors, FontSizes, Spacing } from "../../theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { apiService } from "../../lib/api";
import { supabase } from "../../lib/supabase";

export default function CompleteProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (text && !validateEmail(text)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

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
    setPhoneNumber(cleanedText);
  };

  const handleDone = async () => {
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !phoneNumber.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (emailError || phoneError) {
      Alert.alert("Error", "Please fix the validation errors");
      return;
    }

    if (phoneNumber.length !== 10) {
      Alert.alert("Error", "Please enter a valid 10-digit phone number");
      return;
    }

    setIsLoading(true);
    
    try {
      // Save user to Supabase database
      const { error: insertError } = await supabase
        .from('users')
        .insert([{
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          email: email.trim(),
          phone_number: phoneNumber.trim(),
          is_verified: false,
          created_at: new Date().toISOString()
        }]);

      if (insertError) {
        console.error('Database error:', insertError);
        Alert.alert("Error", "Failed to create account. Please try again.");
        return;
      }

      // Send OTP via SMS for registration
      const result = await apiService.sendOTP(phoneNumber, false);
      
      if (result.success) {
        // Navigate to OTP verification screen with phone number
        router.push({
          pathname: "/(auth)/verify-phone",
          params: { phoneNumber: phoneNumber }
        });
      } else {
        Alert.alert("Error", result.message);
      }
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert("Error", "Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Complete profile</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.instructionText}>
          Please enter your personal details to complete your profile
        </Text>

        {/* Name Fields */}
        <View style={styles.nameRow}>
          <View style={styles.nameField}>
            <TextInput
              style={styles.input}
              placeholder="First name"
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>
          <View style={styles.nameField}>
            <TextInput
              style={styles.input}
              placeholder="Last name"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
        </View>

        {/* Email Field */}
        <View style={styles.fieldContainer}>
          <TextInput
            style={[styles.input, styles.fullWidthInput]}
            placeholder="E-mail"
            value={email}
            onChangeText={handleEmailChange}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        </View>

        {/* Phone Number Field */}
        <View style={styles.fieldContainer}>
          <TextInput
            style={[styles.input, styles.fullWidthInput]}
            placeholder="Phone number"
            value={phoneNumber}
            onChangeText={handlePhoneChange}
            keyboardType="phone-pad"
            maxLength={10}
          />
          {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}
        </View>

        {/* Disclaimer */}
        <Text style={styles.disclaimerText}>
          We may send promotions related to our services - you can unsubscribe anytime in Communication preferences under your Profile.
        </Text>
      </View>

      {/* Done Button */}
      <TouchableOpacity 
        style={[styles.doneButton, { opacity: isLoading ? 0.5 : 1 }]} 
        onPress={handleDone}
        disabled={isLoading}
      >
        <Text style={styles.doneButtonText}>
          {isLoading ? "Creating Account..." : "Done"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
    backgroundColor: "#fff",
  },
  backButton: {
    padding: Spacing.sm,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.primary,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg,
  },
  instructionText: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: Spacing.xl,
    lineHeight: 24,
  },
  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Spacing.lg,
  },
  nameField: {
    flex: 1,
    marginHorizontal: 4,
  },
  fieldContainer: {
    marginBottom: Spacing.lg,
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
  fullWidthInput: {
    width: "100%",
  },
  errorText: {
    color: "#DC2626",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  disclaimerText: {
    fontSize: 12,
    color: "#6B7280",
    lineHeight: 18,
    marginTop: Spacing.lg,
  },
  doneButton: {
    backgroundColor: "#F3F4F6",
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: 12,
    alignItems: "center",
  },
  doneButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6B7280",
  },
});
