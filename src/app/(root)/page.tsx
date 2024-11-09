"use client";
import AccordionFaq from "@/components/root/AccordionFaq";
import Rules from "@/components/root/Rules";
import { Heart, RefreshCw, Users } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: 0.3 },
  },
};

const buttonVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut", delay: 0.5 },
  },
};

const playersVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: 0.4 },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const popupVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: i * 0.2 },
  }),
};

export default function LandingPage() {
  const { ref: sectionRef, inView: sectionInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const { ref: howToJoinRef, inView: howToJoinInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const { ref: storyRef, inView: storyInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const { ref: discordRef, inView: discordInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const { ref: faqRef, inView: faqInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const parallax = document.querySelector(".parallax-bg");
      if (parallax) {
        (parallax as HTMLElement).style.transform = `translateY(${
          scrolled * 0.5
        }px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="bg-neutral-900 text-white">
      <div className="relative h-[120vh] sm:h-screen overflow-hidden px-4 sm:px-10">
        <div
          className="parallax-bg absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/lmfoyn.jpg?height=1080&width=1920')",
            height: "120%",
            top: "-10%",
          }}
        />
        <div
          className="absolute inset-0 bg-black bg-opacity-70"
          id="section-1"
        />
        <div className="w-full px-4 py-16 relative h-full flex flex-col-reverse sm:flex-row items-center justify-center">
          <motion.div
            className="basis-1/2 pr-8"
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
          >
            <h1 className="text-5xl font-bold mb-4">
              Alternative World Minecraft
            </h1>
            <motion.p
              className="text-xl mb-8 text-neutral-300"
              variants={textVariants}
            >
              A new atmosphere for Survival Gamemode you never seen before, make
              your alternative world come true with us!
            </motion.p>

            <motion.div
              className="flex items-center gap-4 mb-8"
              variants={playersVariants}
            >
              <div className="flex items-center gap-2">
                <Users size={24} />
                <span>
                  Online Players: <span className="text-amber-300">5/100</span>
                </span>
              </div>
            </motion.div>
            <motion.button
              className="flex gap-2 items-center bg-amber-400 hover:brightness-105 text-neutral-900 duration-150 px-6 py-3 rounded-full text-lg font-semibold"
              variants={buttonVariants}
            >
              <Image
                src="/discord.png"
                alt="Discord Logo"
                width={24}
                height={24}
              />
              Discord Server
            </motion.button>
          </motion.div>
          <motion.div
            className="basis-1/2 flex justify-end"
            animate="visible"
            initial="hidden"
            variants={imageVariants}
          >
            <Image
              src="/altw-logo.png"
              alt="Alt World Logo"
              width={500}
              height={500}
              className="w-[500] h-[500] object-contain"
            />
          </motion.div>
        </div>
      </div>

      <motion.section
        className="py-16 bg-neutral-900"
        id="section-2"
        ref={sectionRef}
        initial="hidden"
        animate={sectionInView ? "visible" : "hidden"}
        variants={sectionVariants}
      >
        <div className="px-4 sm:px-10 mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-amber-400">
            What is Alternative World?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-lg mb-4 text-neutral-300">
                Alternative World is a Minecraft server that allows players to
                cross-play between Java Edition and Bedrock Edition. It offers a
                unique and immersive gameplay experience, with a new atmosphere
                that sets it apart from other servers. The server is also
                well-managed, with a team of dedicated staff members who ensure
                that the community is safe and enjoyable for everyone. Whether
                you&apos;re a Java or Bedrock player, Alternative World is a
                great choice for those looking for a fresh and exciting
                Minecraft experience.
              </p>
            </div>
            <div className="space-y-6">
              {[
                {
                  icon: (
                    <Heart
                      className="text-amber-400 mr-4 flex-shrink-0"
                      size={24}
                    />
                  ),
                  title: "User friendly",
                  description:
                    "Alternative World Minecraft server is designed to be user-friendly, with easy-to-use features that allow players to quickly jump into the game and start playing.",
                },
                {
                  icon: (
                    <RefreshCw
                      className="text-amber-400 mr-4 flex-shrink-0"
                      size={24}
                    />
                  ),
                  title: "Up to date",
                  description:
                    "Our servers are up to date and very unique. We also update to the latest version of Minecraft to ensure compatibility.",
                },
                {
                  icon: (
                    <Users
                      className="text-amber-400 mr-4 flex-shrink-0"
                      size={24}
                    />
                  ),
                  title: "Fast support",
                  description: "Fast like lighting, just try it out.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start"
                  custom={index}
                  variants={popupVariants}
                >
                  {item.icon}
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-neutral-300">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="section-3"
        className="relative py-16 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/wallpaperwebsite2.jpg')" }}
        ref={howToJoinRef}
        initial="hidden"
        animate={howToJoinInView ? "visible" : "hidden"}
        variants={sectionVariants}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="mx-auto px-4 sm:px-10 relative z-10">
          <h2 className="text-4xl font-bold mb-8 text-amber-400">
            How to join
          </h2>
          <p className="text-xl mb-8 text-white">
            Here you can see, how you can join on the Minecraft server.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Add the server",
                description: "Go to Multiplayer in Minecraft, then Add Server",
              },
              {
                step: "2",
                title: "Enter server address",
                description: (
                  <>
                    Enter{" "}
                    <span className="font-bold text-amber-400">
                      play.alt-w.net
                    </span>{" "}
                    in the server address field and click &quot;Done&quot;.
                  </>
                ),
              },
              {
                step: "3",
                title: "You're done!",
                description:
                  "Now you can play on Alternative World with other players!",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-neutral-800 bg-opacity-90 p-6 rounded-lg"
                custom={index}
                variants={popupVariants}
              >
                <div className="text-amber-400 text-4xl font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        className="py-16 bg-neutral-900"
        ref={storyRef}
        initial="hidden"
        animate={storyInView ? "visible" : "hidden"}
        variants={sectionVariants}
      >
        <div className="mx-auto px-4 sm:px-10">
          <div className="mx-auto">
            <motion.div
              className="bg-neutral-800 rounded-lg shadow-md overflow-hidden"
              variants={sectionVariants}
            >
              <div className="p-8">
                <h2 className="text-4xl font-bold mb-4 text-amber-400">
                  Story about Alternative World
                </h2>
                <p className="text-xl">
                  Got nothing to tell, we&apos;ve just grown.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <div className="bg-neutral-900 text-white">
        <motion.section
          className="relative h-screen overflow-hidden"
          ref={discordRef}
          initial="hidden"
          animate={discordInView ? "visible" : "hidden"}
          variants={sectionVariants}
        >
          <div
            className="parallax-bg absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/wallpaperwebsite3.jpg')",
              height: "120%",
              top: "-10%",
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div
            className="container mx-auto w-full px-4 py-16 relative h-full flex flex-col items-center justify-center"
            id="section-4"
          >
            <motion.h2
              className="text-6xl font-bold mb-8 text-white text-center"
              variants={sectionVariants}
            >
              Join our Discord Server
            </motion.h2>
            <motion.button
              className="bg-amber-400 flex gap-2 items-center hover:brightness-105 text-neutral-900 px-8 py-4 rounded-full text-xl font-semibold transition duration-300"
              variants={buttonVariants}
            >
              <Image
                src="/discord.png"
                alt="Discord Logo"
                width={32}
                height={32}
              />
              Discord Server
            </motion.button>
          </div>
        </motion.section>
      </div>

      <div className="bg-neutral-900 text-white" id="section-5">
        <motion.section
          className="py-16 bg-neutral-900"
          ref={faqRef}
          initial="hidden"
          animate={faqInView ? "visible" : "hidden"}
          variants={sectionVariants}
        >
          <div className="container mx-auto">
            <motion.h2
              className="text-4xl font-bold mb-8 text-center text-amber-400 px-4 sm:px-10"
              variants={sectionVariants}
            >
              FAQ
            </motion.h2>
            <motion.div className="px-4 sm:px-10" variants={sectionVariants}>
              <AccordionFaq />
            </motion.div>
          </div>
        </motion.section>
      </div>

      <section id="section-6" className="py-16 bg-neutral-900">
        <div className=" mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-amber-400  px-4 sm:px-10">
            Server Rules
          </h2>
          <div className="flex flex-col-reverse sm:flex-row justify-between w-full px-4 sm:px-10 items-center mx-auto">
            <div className="basis-1/2 flex justify-start">
              <Rules />
            </div>
            <div className="basis-1/2 flex justify-end pr-6 pb-10 sm:pb-0">
              <Image src="/rules.png" alt="Rules" width={400} height={400} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
