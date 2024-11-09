"use client";
import { motion } from "framer-motion";
import {
  Shield,
  Database,
  MessageCircle,
  Lock,
  UserCheck,
  Info,
  Globe,
  Mail,
  FileText,
} from "lucide-react";

interface PolicySectionProps {
  icon: React.ReactNode;
  title: string;
  content: string[];
}

const PolicySection: React.FC<PolicySectionProps> = ({
  icon,
  title,
  content,
}) => {
  return (
    <motion.div
      className="flex items-start space-x-4 mb-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="bg-amber-400 p-3 rounded-full">{icon}</div>
      <div>
        <h2 className="text-2xl font-semibold mb-3 text-amber-400">{title}</h2>
        {content.map((item, index) => (
          <p key={index} className="text-base text-gray-300 mb-2">
            {item}
          </p>
        ))}
      </div>
    </motion.div>
  );
};

export default function PrivacyPolicy() {
  const policySections = [
    {
      icon: <Info className="w-6 h-6 text-neutral-900" />,
      title: "Introduction",
      content: [
        "This Privacy Policy explains how Alternative World MC collects, uses, stores, and protects user information when you access and play on our Minecraft server or interact with our website and services.",
        "By using our server or website, you agree to the collection and use of your information as outlined in this policy.",
      ],
    },
    {
      icon: <Database className="w-6 h-6 text-neutral-900" />,
      title: "Information We Collect",
      content: [
        "Account Information: When you join our server, we may collect basic information such as your Minecraft username, IP address, and game data (e.g., stats, progress, and rank).",
        "Communication Data: If you contact us through Discord, email, or other communication channels, we may store the information you provide, including your username, email address, and message content.",
        "Usage Data: We may collect information about your gameplay behavior, including login times, actions within the game, and interactions with other players.",
        "Payment Information: If you make donations or purchases, payment details are processed securely through third-party payment processors.",
      ],
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-neutral-900" />,
      title: "How We Use Your Information",
      content: [
        "Server Operation: We use collected data to manage and operate the Minecraft server, ensure fair play, and enhance user experience.",
        "Support and Communication: We use your information to respond to inquiries and provide support.",
        "Security and Moderation: Information is used to monitor server security and prevent potential rule violations.",
        "Improvement and Analytics: Usage data helps us understand player interactions and improve our services.",
      ],
    },
    {
      icon: <Globe className="w-6 h-6 text-neutral-900" />,
      title: "Data Sharing",
      content: [
        "Third-Party Services: We may share data with services such as payment processors, who are required to protect your data.",
        "Legal Compliance: We may disclose user data if required by law or to protect our rights and user safety.",
      ],
    },
    {
      icon: <Lock className="w-6 h-6 text-neutral-900" />,
      title: "Data Security",
      content: [
        "We take reasonable measures to protect your information from unauthorized access.",
        "Sensitive payment data is handled by third-party processors using encryption and security protocols.",
        "No method of data transmission is 100% secure, and we cannot guarantee absolute security.",
      ],
    },
    {
      icon: <Shield className="w-6 h-6 text-neutral-900" />,
      title: "Data Retention",
      content: [
        "We retain your account data and gameplay information while you are active on our server.",
        "You may request data deletion by contacting us through support channels.",
        "Certain records may be retained for legal or administrative purposes.",
      ],
    },
    {
      icon: <UserCheck className="w-6 h-6 text-neutral-900" />,
      title: "Children's Privacy",
      content: [
        "Our server is intended for users aged 13 and above.",
        "We do not knowingly collect personal information from children under 13.",
        "If we discover such information, we will take steps to delete it as soon as possible.",
      ],
    },
    {
      icon: <Mail className="w-6 h-6 text-neutral-900" />,
      title: "Your Rights",
      content: [
        "You have the right to request access to, correction of, or deletion of your personal data.",
        "Contact us through our Discord server or email to exercise these rights.",
        "You may lodge a complaint with the appropriate data protection authority if you believe your data has been mishandled.",
      ],
    },
    {
      icon: <FileText className="w-6 h-6 text-neutral-900" />,
      title: "Changes to Privacy Policy",
      content: [
        "We may update this Privacy Policy to reflect changes in our practices or legal requirements.",
        "Significant changes will be notified through our website or server announcements.",
        "Continued use of our server after policy changes indicates acceptance.",
      ],
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-neutral-900" />,
      title: "Contact Us",
      content: [
        "For any questions or concerns about this Privacy Policy, please reach out to us through our Discord server.",
      ],
    },
  ];

  return (
    <div className="bg-neutral-900 text-white min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-12 text-center text-amber-400">
          Privacy Policy
        </h1>
        <div className="space-y-6">
          {policySections.map((section, index) => (
            <PolicySection key={index} {...section} />
          ))}
        </div>
      </div>
    </div>
  );
}
