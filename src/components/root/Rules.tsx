import { motion } from "framer-motion";
import { Users, ShieldCheck, Ban, MessageCircle, UserCog } from "lucide-react";

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
      icon: <Users className="w-6 h-6 text-neutral-900" />,
      title: "Be Respectful",
      description:
        "Treat all players and staff with respect. No harassment, hate speech, or bullying.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-neutral-900" />,
      title: "No Griefing",
      description:
        "Do not destroy or alter other players' builds without permission.",
    },
    {
      icon: <Ban className="w-6 h-6 text-neutral-900" />,
      title: "No Cheating or Hacking",
      description:
        "Using mods, hacks, or exploits to gain an unfair advantage is strictly prohibited.",
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-neutral-900" />,
      title: "Keep Chat Clean",
      description:
        "Avoid inappropriate language, spamming, and advertising other servers.",
    },
    {
      icon: <UserCog className="w-6 h-6 text-neutral-900" />,
      title: "Follow Staff Instructions",
      description:
        "Always listen to and respect the decisions made by the server staff.",
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
