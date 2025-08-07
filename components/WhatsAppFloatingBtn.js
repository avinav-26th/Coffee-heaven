import Link from "next/link";
import Image from "next/image";

const WhatsAppButton = () => {
  const phoneNumber = "9876543210"; // Replace with actual number
  const message = "Hello! I'm interested in Coffee Heaven.";
  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <Link
      href={whatsappURL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-4 bg-[#1bd741] text-white p-1 rounded-full shadow-lg hover:bg-green-500 transition duration-300 flex items-center justify-center text-3xl"
    >
      <div className="whatsapp-icon rounded-full overflow-hidden shadow-lg">
        <Image
          src="/images/whatsapp-icon.png"
          alt="WhatsApp Icon"
          width={55}
          height={55}
          className="rounded-full"
          style={{ objectFit: "cover" }}
        />
      </div>
    </Link>
  );
};

export default WhatsAppButton;
