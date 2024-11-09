"use client";
import { useState, useEffect, useRef, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Server } from "lucide-react";
import UsernameContext from "@/context/Username";
import { useRouter } from "next/navigation";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [allowClose, setAllowClose] = useState(false);
  const termsRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    undefined
  );
  const [isCracked, setIsCracked] = useState(false);
  const { setUsername } = useContext(UsernameContext);
  const [inputUsername, setInputUsername] = useState("");
  const [usernameInputError, setUsernameInputError] = useState("");
  const router = useRouter();
  const [modalStage, setModalStage] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setModalStage(0);
      setAllowClose(false);
    }
  }, [isOpen]);

  const handleScroll = () => {
    if (termsRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = termsRef.current;
      setAllowClose(scrollTop + clientHeight >= scrollHeight - 1);
    }
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setInputUsername(inputValue);

    if (inputValue.length > 16) {
      setUsernameInputError("Nickname must be at most 16 characters.");
    } else if (
      !/^[a-zA-Z0-9_.]*$/.test(inputValue) ||
      (inputValue.length > 1 && inputValue.startsWith("."))
    ) {
      setUsernameInputError(
        "Nickname can only contain letters, numbers, underscores, and a dot only at the beginning."
      );
    } else {
      setUsernameInputError("");
    }
  };

  const handleContinue = async () => {
    if (selectedOption && inputUsername && !usernameInputError) {
      // Set username in localStorage
      localStorage.setItem("username", inputUsername);
      localStorage.setItem("isCracked", JSON.stringify(isCracked));

      // Set username in context
      setUsername(inputUsername);

      // Close modal and refresh
      onClose();
      router.refresh();
    }
  };

  const isSecondModalValid =
    selectedOption && inputUsername && (isCracked || true);

  const closeModal = () => {
    if (modalStage === 0) {
      setModalStage(1);
    } else {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center"
        >
          {modalStage === 0 && (
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-neutral-800 rounded-lg p-8 w-full h-[90%] max-w-md overflow-hidden relative"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">
                  Terms of Service
                </h2>
                <div className="flex justify-center">
                  {allowClose ? (
                    <CheckCircle className="h-6 w-6 text-green-300" />
                  ) : (
                    <CheckCircle className="h-6 w-6 text-gray-200" />
                  )}
                </div>
              </div>
              <div
                ref={termsRef}
                onScroll={handleScroll}
                className="overflow-y-auto h-4/5 mb-4 pr-2 custom-scrollbar rounded-md"
              >
                <div className="text-sm text-neutral-400">
                  <p className="mb-4">
                    Please read these Terms of Service carefully before using
                    the Alternative World Minecraft server and associated
                    services. By accessing or using our services, you agree to
                    be bound by these terms. If you do not agree to these terms,
                    please do not use our services.
                  </p>

                  <h4 className="font-medium text-white mb-2">
                    Donation Policy
                  </h4>
                  <ul className="list-disc pl-5 mb-4">
                    <li>All donations are non-refundable.</li>
                    <li>
                      Alternative World MC does not compel or require users to
                      make donations.
                    </li>
                    <li>
                      Ranks purchased are for use on a single Minecraft account
                      only.
                    </li>
                    <li>
                      Ranks and associated perks are subject to change without
                      prior notice.
                    </li>
                  </ul>

                  <h4 className="font-medium text-white mb-2">
                    Gameplay Rules
                  </h4>
                  <ol className="list-decimal pl-5 mb-4">
                    <li>
                      Be respectful to other players and staff. Harassment,
                      discrimination, and abusive behavior will not be
                      tolerated.
                    </li>
                    <li>
                      Cheating, hacking, or exploiting game mechanics is
                      strictly prohibited.
                    </li>
                    <li>
                      Do not engage in any activity that disrupts the gameplay
                      experience for others, such as spamming, griefing, or
                      scamming.
                    </li>
                    <li>
                      Follow the instructions of server staff members. Failure
                      to comply may result in disciplinary action.
                    </li>
                  </ol>

                  <h4 className="font-medium text-white mb-2">
                    Account Security
                  </h4>
                  <p className="mb-4">
                    You are responsible for maintaining the security of your
                    Minecraft account. Alternative World MC is not liable for
                    any losses or damages resulting from unauthorized access to
                    your account.
                  </p>
                  <p className="mb-4">
                    If you believe your account has been compromised, please
                    contact our support team immediately.
                  </p>

                  <p className="mb-4">
                    These Terms of Service are subject to change at any time. We
                    encourage you to review them periodically for any updates.
                  </p>
                </div>
              </div>

              <button
                onClick={closeModal}
                disabled={!allowClose}
                className={`bg-yellow-400 text-neutral-800 rounded-md mt-8 px-4 py-2 flex items-center justify-center ${
                  !allowClose
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-yellow-500"
                } transition-all duration-300`}
              >
                {allowClose ? "Next" : "Please Scroll to the End"}
              </button>
            </motion.div>
          )}

          {modalStage === 1 && (
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-neutral-800 rounded-lg p-8 w-full max-w-md overflow-hidden relative"
            >
              <h2 className="text-xl font-bold text-white mb-4">
                Select Your Game Version
              </h2>

              <div className="mb-4 grid grid-cols-2 gap-4">
                <button
                  onClick={() => setSelectedOption("Java")}
                  className={`border rounded-md px-4 py-2 text-sm text-white ${
                    selectedOption === "Java"
                      ? "bg-yellow-400 border-yellow-500 text-neutral-800"
                      : "bg-neutral-700 border-neutral-600 hover:bg-neutral-600"
                  }`}
                >
                  Java
                </button>
                <button
                  onClick={() => setSelectedOption("Bedrock")}
                  className={`border rounded-md px-4 py-2 text-sm text-white ${
                    selectedOption === "Bedrock"
                      ? "bg-yellow-400 border-yellow-500 text-neutral-800"
                      : "bg-neutral-700 border-neutral-600 hover:bg-neutral-600"
                  }`}
                >
                  Bedrock
                </button>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-white text-sm font-medium mb-2"
                >
                  Minecraft Username
                </label>
                <input
                  placeholder="Enter your Minecraft username"
                  type="text"
                  id="username"
                  value={inputUsername}
                  onChange={handleUsernameChange}
                  className="mt-1 p-2 block w-full rounded-md text-white bg-neutral-600 border-transparent focus:border-neutral-500 focus:bg-neutral-700 focus:ring-0"
                />
                {usernameInputError && (
                  <p className="text-red-500 text-sm mt-4">
                    {usernameInputError}
                  </p>
                )}
              </div>

              {/* Cracked Account Option */}
              <div className="mb-4">
                <div
                  onClick={() => setIsCracked(!isCracked)}
                  className="flex items-center cursor-pointer"
                >
                  <div
                    className={`w-6 h-6 mr-2 rounded border-2 flex items-center justify-center 
                    ${
                      isCracked
                        ? "bg-yellow-400 border-yellow-500"
                        : "bg-neutral-700 border-neutral-600"
                    }`}
                  >
                    {isCracked && (
                      <Server className="w-4 h-4 text-neutral-800" />
                    )}
                  </div>
                  <span className="text-white">
                    I&apos;m using a Cracked Minecraft Account
                  </span>
                </div>
                {isCracked && (
                  <p className="text-yellow-500 text-sm mt-2">
                    ⚠️ You are using a cracked account
                  </p>
                )}
              </div>

              <button
                onClick={handleContinue}
                disabled={!isSecondModalValid}
                className={`bg-yellow-400 text-neutral-800 rounded-md mt-4 px-4 py-2 ${
                  !isSecondModalValid
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-yellow-500"
                }`}
              >
                Continue
              </button>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;
