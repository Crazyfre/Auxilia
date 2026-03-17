import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';

import '../../../../core/theme/theme.dart';

/// Profile and settings screen
class ProfileSettingsScreen extends StatelessWidget {
  const ProfileSettingsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('Profile', style: AppTypography.displaySmall),

              const SizedBox(height: 24),

              // Profile card
              Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: AppColors.surface,
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(color: AppColors.border),
                ),
                child: Row(
                  children: [
                    Container(
                      width: 64,
                      height: 64,
                      decoration: BoxDecoration(
                        gradient: AppColors.primaryGradient,
                        borderRadius: BorderRadius.circular(20),
                      ),
                      child: Center(
                        child: Text(
                          'RK',
                          style: AppTypography.headlineMedium.copyWith(
                            color: AppColors.white,
                            fontWeight: FontWeight.w700,
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(width: 16),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Ramesh Kumar', style: AppTypography.titleLarge),
                          const SizedBox(height: 4),
                          Text(
                            '+91 98765 43210',
                            style: AppTypography.bodySmall.copyWith(
                              color: AppColors.textSecondary,
                            ),
                          ),
                          const SizedBox(height: 4),
                          Container(
                            padding: const EdgeInsets.symmetric(
                              horizontal: 8,
                              vertical: 2,
                            ),
                            decoration: BoxDecoration(
                              color: AppColors.primary.withOpacity(0.1),
                              borderRadius: BorderRadius.circular(4),
                            ),
                            child: Text(
                              'Q-COMMERCE',
                              style: AppTypography.caption.copyWith(
                                color: AppColors.primary,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                    IconButton(
                      icon: const Icon(Icons.edit_rounded),
                      onPressed: () {},
                      color: AppColors.textTertiary,
                    ),
                  ],
                ),
              ).animate().fadeIn(duration: 300.ms),

              const SizedBox(height: 24),

              // Zone Risk Profile
              Text('Zone Risk Profile', style: AppTypography.titleLarge),
              const SizedBox(height: 16),

              Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: AppColors.surface,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: AppColors.border),
                ),
                child: Column(
                  children: [
                    _buildRiskBar('Overall Risk', 0.71, AppColors.warning),
                    const SizedBox(height: 16),
                    _buildRiskBar('Flood Risk', 0.85, AppColors.danger),
                    const SizedBox(height: 16),
                    _buildRiskBar('Heat Risk', 0.55, AppColors.warning),
                    const SizedBox(height: 16),
                    _buildRiskBar('Strike Risk', 0.40, AppColors.primary),
                  ],
                ),
              ).animate(delay: 100.ms).fadeIn().slideY(begin: 0.1),

              const SizedBox(height: 24),

              // Settings
              Text('Settings', style: AppTypography.titleLarge),
              const SizedBox(height: 16),

              _buildSettingsItem(
                Icons.notifications_rounded,
                'Notifications',
                'Push alerts for triggers & payouts',
                true,
                0,
              ),
              _buildSettingsItem(
                Icons.language_rounded,
                'Language',
                'English',
                false,
                1,
              ),
              _buildSettingsItem(
                Icons.payment_rounded,
                'Payment Methods',
                'UPI: 9876543210@paytm',
                false,
                2,
              ),
              _buildSettingsItem(
                Icons.help_outline_rounded,
                'Help & Support',
                'FAQs, Contact us',
                false,
                3,
              ),
              _buildSettingsItem(
                Icons.info_outline_rounded,
                'About Auxilia',
                'Version 1.0.0',
                false,
                4,
              ),

              const SizedBox(height: 24),

              // Logout button
              SizedBox(
                width: double.infinity,
                height: 56,
                child: OutlinedButton(
                  onPressed: () {},
                  style: OutlinedButton.styleFrom(
                    side: BorderSide(color: AppColors.danger.withOpacity(0.5)),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                  child: Text(
                    'Logout',
                    style: AppTypography.buttonMedium.copyWith(
                      color: AppColors.danger,
                    ),
                  ),
                ),
              ).animate(delay: 500.ms).fadeIn(),

              const SizedBox(height: 100),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildRiskBar(String label, double value, Color color) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              label,
              style: AppTypography.bodySmall.copyWith(
                color: AppColors.textSecondary,
              ),
            ),
            Text(
              value.toStringAsFixed(2),
              style: AppTypography.labelMedium.copyWith(
                color: color,
                fontWeight: FontWeight.w600,
              ),
            ),
          ],
        ),
        const SizedBox(height: 8),
        ClipRRect(
          borderRadius: BorderRadius.circular(4),
          child: LinearProgressIndicator(
            value: value,
            minHeight: 8,
            backgroundColor: AppColors.border,
            valueColor: AlwaysStoppedAnimation(color),
          ),
        ),
      ],
    );
  }

  Widget _buildSettingsItem(
    IconData icon,
    String title,
    String subtitle,
    bool hasSwitch,
    int index,
  ) {
    return Container(
          margin: const EdgeInsets.only(bottom: 12),
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: AppColors.surface,
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: AppColors.border),
          ),
          child: Row(
            children: [
              Container(
                width: 40,
                height: 40,
                decoration: BoxDecoration(
                  color: AppColors.surfaceVariant,
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Icon(icon, color: AppColors.textSecondary, size: 20),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(title, style: AppTypography.titleSmall),
                    const SizedBox(height: 2),
                    Text(
                      subtitle,
                      style: AppTypography.bodySmall.copyWith(
                        color: AppColors.textTertiary,
                      ),
                    ),
                  ],
                ),
              ),
              if (hasSwitch)
                Switch(
                  value: true,
                  onChanged: (_) {},
                  activeColor: AppColors.primary,
                )
              else
                const Icon(
                  Icons.chevron_right_rounded,
                  color: AppColors.textTertiary,
                ),
            ],
          ),
        )
        .animate(delay: Duration(milliseconds: 200 + (index * 60)))
        .fadeIn()
        .slideX(begin: 0.05);
  }
}
