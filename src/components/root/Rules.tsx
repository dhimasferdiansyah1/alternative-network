import { motion } from "framer-motion";
import {
  MessageSquareX,
  ShieldAlert,
  Bug,
  MessageSquare,
  Hammer,
} from "lucide-react";

interface RuleItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const RuleItem: React.FC<RuleItemProps> = ({ icon, title, description }) => {
  return (
    <motion.div
      className="flex items-start space-x-4 mb-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="bg-amber-400 p-3 rounded-full">{icon}</div>
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </motion.div>
  );
};

const Rules = () => {
  const rules = [
    {
      icon: <MessageSquareX className="w-6 h-6 text-neutral-900" />,
      title: "No Swearing",
      description: "Jangan Toxic ya dek",
    },
    {
      icon: <ShieldAlert className="w-6 h-6 text-neutral-900" />,
      title: "No Cheating",
      description: "Yang pake cheat anak haram",
    },
    {
      icon: <Bug className="w-6 h-6 text-neutral-900" />,
      title: "Exploiting Bug",
      description:
        "Yang nemu bug terus di salah gunakan dan tidak report sama kek orang cheating alias anak haram",
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-neutral-900" />,
      title: "No Spamming",
      description: "Jangan spam keyboard warrior",
    },
    {
      icon: <Hammer className="w-6 h-6 text-neutral-900" />,
      title: "No Grieffing",
      description: "Grieffing dalam bentuk apapun di larang ya dek",
    },
  ];

  return (
    <div className="px-4 sm:px-10 mx-auto">
      {rules.map((rule, index) => (
        <RuleItem key={index} {...rule} />
      ))}
    </div>
  );
};

export default Rules;
