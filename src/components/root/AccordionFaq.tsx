import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronDown } from "lucide-react";

interface FaqProps {
  question: string;
  answer: string;
  delay: number;
}

const Faq = ({ question, answer, delay }: FaqProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      className="py-4 px-4 sm:px-10"
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay }}
    >
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-semibold">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="mt-2 text-gray-300">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const AccordionFaq = () => {
  const faqs = [
    {
      question: "What is the Alternative World Minecraft Server?",
      answer:
        "The Alternative World Minecraft Server is a custom-built server designed to provide a unique and engaging experience for all players. We offer various features, and events to ensure that both new and seasoned players have an enjoyable time. Our server supports cross-play between Java and Bedrock editions, so everyone can join in the fun.",
    },
    {
      question: "Can Java and Bedrock players play together?",
      answer:
        "Yes, our server supports cross-play, allowing both Java and Bedrock edition players to play together seamlessly. Whether you’re using a PC, console, or mobile device, you can connect to the server and enjoy the same world with your friends, regardless of the edition.",
    },
    {
      question: "How do I get support if I encounter an issue?",
      answer:
        "If you encounter any issues, you can reach out to our support team through our Discord server in the #support-request channel or contact a staff member directly. We strive to respond quickly to resolve any problems.",
    },
    {
      question: "Are there any in-game purchases or donations?",
      answer:
        "Yes, we offer a variety of in-game purchases and donation options that support the server’s maintenance and development. Players can purchase ranks, items, or cosmetics, and donations are greatly appreciated, coming with special perks as a thank you for supporting our community.",
    },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      {faqs.map((faq, index) => (
        <Faq
          key={index}
          question={faq.question}
          answer={faq.answer}
          delay={index * 0.2}
        />
      ))}
    </div>
  );
};

export default AccordionFaq;
