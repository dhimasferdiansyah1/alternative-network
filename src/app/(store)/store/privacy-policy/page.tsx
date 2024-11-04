export default function PrivacyPolicy() {
  return (
    <div className="bg-neutral-900 text-white min-h-screen py-16 overflow-x-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto prose lg:prose-xl text-justify">
          <h1 className="text-5xl font-bold mb-8 text-amber-400 text-center">
            Privacy Policy
          </h1>
          <p>
            This Privacy Policy explains how Alternative World MC collects,
            uses, stores, and protects user information when you access and play
            on our Minecraft server or interact with our website and services.
            By using our server or website, you agree to the collection and use
            of your information as outlined in this policy.
          </p>

          <h2 className="text-3xl font-bold mb-4 mt-8 text-amber-400">
            Information We Collect
          </h2>
          <ul className="list-disc list-inside mb-8">
            <li>
              <strong>Account Information:</strong> When you join our server, we
              may collect basic information such as your Minecraft username, IP
              address, and game data (e.g., stats, progress, and rank).
            </li>
            <li>
              <strong>Communication Data:</strong> If you contact us through
              Discord, email, or other communication channels, we may store the
              information you provide, including your username, email address,
              and message content.
            </li>
            <li>
              <strong>Usage Data:</strong> We may collect information about your
              gameplay behavior, including login times, actions within the game,
              and interactions with other players. This data helps us improve
              server performance and gameplay experience.
            </li>
            <li>
              <strong>Payment Information:</strong> If you make donations or
              purchases through our website, payment details are processed
              securely through third-party payment processors. We do not store
              sensitive payment information such as credit card numbers.
            </li>
          </ul>

          {/* Repeat the motion structure for other sections */}
          <h2 className="text-3xl font-bold mb-4 mt-8 text-amber-400">
            How We Use Your Information
          </h2>
          <ul className="list-disc list-inside mb-8">
            <li>
              <strong>Server Operation:</strong> We use collected data to manage
              and operate the Minecraft server, ensure fair play, and enhance
              user experience.
            </li>
            <li>
              <strong>Support and Communication:</strong> We use your
              information to respond to inquiries, provide support, and
              communicate important updates or changes to the server.
            </li>
            <li>
              <strong>Security and Moderation:</strong> Information such as IP
              addresses and in-game behavior is used to monitor and maintain the
              security of the server and to identify and prevent potential
              abuses or rule violations.
            </li>
            <li>
              <strong>Improvement and Analytics:</strong> Usage data helps us
              understand how players interact with the server and allows us to
              make improvements or develop new features.
            </li>
          </ul>

          <h2 className="text-3xl font-bold mb-4 mt-8 text-amber-400">
            Data Sharing
          </h2>
          <ul className="list-disc list-inside mb-8">
            <li>
              <strong>Third-Party Services:</strong> We may share data with
              third-party services such as payment processors for handling
              transactions. These services are required to protect your data and
              use it only for the purpose of providing the service.
            </li>
            <li>
              <strong>Legal Compliance:</strong> We may disclose user data if
              required by law or if we believe that disclosure is necessary to
              protect our rights, the safety of our users, or to comply with a
              legal process.
            </li>
          </ul>

          <h2 className="text-3xl font-bold mb-4 mt-8 text-amber-400">
            Data Retention
          </h2>
          <p className="mb-4">
            We retain your account data and gameplay information for as long as
            you are active on our server. If you no longer wish to play on the
            server, you may request data deletion by contacting us through the
            appropriate support channels. We will retain data for a maximum of
            [Number] days/months/years after your last activity.
          </p>
          <p className="mb-8">
            Certain data, such as records of payments or communications, may be
            retained for a longer period (up to [Number] days/months/years) for
            legal or administrative purposes.
          </p>

          <h2 className="text-3xl font-bold mb-4 mt-8 text-amber-400">
            Children’s Privacy
          </h2>
          <p className="mb-8">
            Our server is intended for users aged 13 and above. We do not
            knowingly collect personal information from children under 13. If we
            discover that we have collected information from a child under 13
            without parental consent, we will take steps to delete it as soon as
            possible. If you believe we have collected data from a child under
            13, please contact us immediately.
          </p>

          <h2 className="text-3xl font-bold mb-4 mt-8 text-amber-400">
            Your Rights
          </h2>
          <p className="mb-8">
            You have the right to request access to, correction of, or deletion
            of your personal data that we hold. To exercise these rights, please
            contact us through our Discord server or email at [Your Email
            Address].
          </p>
          <p className="mb-8">
            If you believe that your data has been mishandled, you have the
            right to lodge a complaint with the appropriate data protection
            authority.
          </p>

          <h2 className="text-3xl font-bold mb-4 mt-8 text-amber-400">
            Changes to This Privacy Policy
          </h2>
          <p className="mb-8">
            We may update this Privacy Policy from time to time to reflect
            changes in our practices or legal requirements. We will notify users
            of significant changes through our website or server announcements.
            We will also post the updated policy here.
          </p>
          <p className="mb-8">
            Continued use of our server or website after changes are made to
            this policy indicates acceptance of those changes.
          </p>

          <h2 className="text-3xl font-bold mb-4 mt-8 text-amber-400">
            Contact Us
          </h2>
          <p className="mb-8">
            If you have any questions or concerns about this Privacy Policy,
            please reach out to us through our{" "}
            <a
              href="YOUR_DISCORD_LINK"
              className="text-blue-500 hover:underline"
            >
              Discord server
            </a>{" "}
            or email us at [Your Email Address].
          </p>

          <h2 className="text-3xl font-bold mb-4 mt-8 text-amber-400">
            Contact Us
          </h2>
          <p className="mb-8">
            If you have any questions or concerns about this Privacy Policy,
            please reach out to us through our{" "}
            <a
              href="YOUR_DISCORD_LINK"
              className="text-blue-500 hover:underline"
            >
              Discord server
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
