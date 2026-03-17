import 'package:flutter/material.dart';

/// Auxilia App Colors - Vibrant Delivery App Style
/// Inspired by Zepto, Swiggy, and modern delivery apps
class AppColors {
  AppColors._();

  // Primary Brand Colors
  static const Color primary = Color(0xFFFF6B35); // Vibrant Orange
  static const Color primaryLight = Color(0xFFFF8F65);
  static const Color primaryDark = Color(0xFFE55A2B);

  // Secondary Colors
  static const Color secondary = Color(0xFF7C3AED); // Purple accent
  static const Color secondaryLight = Color(0xFF9F67FF);
  static const Color secondaryDark = Color(0xFF5B21B6);

  // Success/Shield Colors
  static const Color success = Color(0xFF10B981); // Green - Shield Active
  static const Color successLight = Color(0xFF34D399);
  static const Color successDark = Color(0xFF059669);

  // Warning Colors
  static const Color warning = Color(0xFFF59E0B); // Amber
  static const Color warningLight = Color(0xFFFBBF24);
  static const Color warningDark = Color(0xFFD97706);

  // Danger/Alert Colors
  static const Color danger = Color(0xFFEF4444); // Red
  static const Color dangerLight = Color(0xFFF87171);
  static const Color dangerDark = Color(0xFFDC2626);

  // Neutral Colors
  static const Color white = Color(0xFFFFFFFF);
  static const Color black = Color(0xFF000000);

  // Background Colors
  static const Color background = Color(0xFFF8FAFC);
  static const Color surface = Color(0xFFFFFFFF);
  static const Color surfaceVariant = Color(0xFFF1F5F9);

  // Text Colors
  static const Color textPrimary = Color(0xFF1E293B);
  static const Color textSecondary = Color(0xFF64748B);
  static const Color textTertiary = Color(0xFF94A3B8);
  static const Color textOnPrimary = Color(0xFFFFFFFF);

  // Border Colors
  static const Color border = Color(0xFFE2E8F0);
  static const Color borderLight = Color(0xFFF1F5F9);

  // Overlay Colors
  static const Color overlay = Color(0x80000000);
  static const Color overlayLight = Color(0x1A000000);

  // Gradient Colors
  static const LinearGradient primaryGradient = LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [primary, Color(0xFFFF8F65)],
  );

  static const LinearGradient shieldGradient = LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [success, Color(0xFF34D399)],
  );

  static const LinearGradient warningGradient = LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [warning, Color(0xFFFBBF24)],
  );

  static const LinearGradient purpleGradient = LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [secondary, Color(0xFF9F67FF)],
  );

  // Card shadow
  static List<BoxShadow> cardShadow = [
    BoxShadow(
      color: black.withOpacity(0.04),
      blurRadius: 10,
      offset: const Offset(0, 4),
    ),
  ];

  static List<BoxShadow> elevatedShadow = [
    BoxShadow(
      color: black.withOpacity(0.08),
      blurRadius: 20,
      offset: const Offset(0, 8),
    ),
  ];
}
