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
      question: "Is this cross-play server?",
      answer: "Yes!",
    },
    {
      question: "Lag?",
      answer: "Of course not! we have a big ass server over here.",
    },
    {
      question: "Do the server have donatur ranks?",
      answer: "Yes we are!",
    },
    {
      question: "Can I play with older version of Minecraft?",
      answer: "Yes you are!",
    },
    {
      question: "24/7?",
      answer: "Ye no down!",
    },
    {
      question:
        "Will there be another gamemode like skyblock, oneblock or something?",
      answer:
        "Yes we currently working on oneblock or perharps skyblock and maybe Tycoon?.",
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
