"use client";
import { motion } from "framer-motion";
import {
  FileText,
  ShieldCheck,
  DollarSign,
  Users,
  Lock,
  Server,
  Copyright,
  Scale,
  MessageCircle,
} from "lucide-react";

interface TermsSectionProps {
  icon: React.ReactNode;
  title: string;
  content: string[];
}

const TermsSection: React.FC<TermsSectionProps> = ({
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
        <ul className="list-disc pl-5 space-y-2 text-gray-300">
          {content.map((item, index) => (
            <li key={index} className="text-base">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default function TermsOfService() {
  const termsSections = [
    {
      icon: <FileText className="w-6 h-6 text-neutral-900" />,
      title: "General Terms",
      content: [
        "By accessing and playing on the Alternative World MC server, you agree to comply with these Terms of Service and any future updates.",
        "The server administrators reserve the right to modify or update these terms at any time without prior notice. Continued use of the server after changes are made constitutes your acceptance of the new terms.",
      ],
    },
    {
      icon: <DollarSign className="w-6 h-6 text-neutral-900" />,
      title: "Donations",
      content: [
        "Donations made to the server are entirely voluntary and non-refundable under any circumstances.",
        "While donations help support server maintenance and improvements, they do not guarantee special treatment or privileges beyond what is explicitly offered in donation packages.",
        "Ranks, items, and perks obtained through donations are subject to change or removal as part of server updates or balancing.",
      ],
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-neutral-900" />,
      title: "Ranks and Perks",
      content: [
        "Ranks and perks purchased or acquired through donations are limited to a single Minecraft account and cannot be transferred to another account.",
        "The features, benefits, and perks of ranks may be adjusted at any time to maintain server balance and fairness.",
      ],
    },
    {
      icon: <Users className="w-6 h-6 text-neutral-900" />,
      title: "User Conduct",
      content: [
        "Users are expected to follow all server rules and treat other players and staff with respect.",
        "Any form of cheating, hacking, or exploiting bugs is strictly prohibited and may result in a temporary or permanent ban without refund.",
        "Offensive behavior, harassment, or hate speech will not be tolerated and may result in disciplinary actions.",
      ],
    },
    {
      icon: <Lock className="w-6 h-6 text-neutral-900" />,
      title: "Account Responsibility",
      content: [
        "Users are responsible for the security and use of their own Minecraft account while playing on the server.",
        "The server is not responsible for any loss of rank, items, or progress due to unauthorized access or account compromise.",
      ],
    },
    {
      icon: <Server className="w-6 h-6 text-neutral-900" />,
      title: "Server Access",
      content: [
        "Access to the server is a privilege, not a right. The server staff reserves the right to suspend or ban accounts at their discretion if a user violates the Terms of Service or server rules.",
        "Any attempt to disrupt server operations, including DDoS attacks, server exploits, or spreading false information, will result in an immediate and permanent ban.",
      ],
    },
    {
      icon: <Copyright className="w-6 h-6 text-neutral-900" />,
      title: "Intellectual Property",
      content: [
        "All server content, including but not limited to builds, plugins, and custom features, are the intellectual property of Alternative World MC and may not be copied or redistributed without permission.",
      ],
    },
    {
      icon: <Scale className="w-6 h-6 text-neutral-900" />,
      title: "Limitation of Liability",
      content: [
        "Alternative World MC is not liable for any data loss, disruptions, or other issues caused by server downtimes, technical difficulties, or third-party services.",
        "Users acknowledge that their use of the server is at their own risk.",
      ],
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-neutral-900" />,
      title: "Dispute Resolution",
      content: [
        "Any disputes or issues related to these Terms of Service should be directed to server administrators through the designated channels (e.g., email or Discord).",
        "The server staff will make a reasonable effort to resolve disputes fairly, but their decisions are final.",
      ],
    },
    {
      icon: <FileText className="w-6 h-6 text-neutral-900" />,
      title: "Acceptance of Terms",
      content: [
        "By joining and playing on the Alternative World MC server, you confirm that you have read, understood, and agree to these Terms of Service.",
      ],
    },
  ];

  return (
    <div className="bg-neutral-900 text-white min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-12 text-center text-amber-400">
          Terms of Service
        </h1>
        <div className="space-y-6">
          {termsSections.map((section, index) => (
            <TermsSection key={index} {...section} />
          ))}
        </div>
      </div>
    </div>
  );
}
