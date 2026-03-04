import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const phoneNumber = "923001234567";
  const message = encodeURIComponent(
    "Hello Abaseen Handi Crafts, I'm interested in your wholesale shawl collection. Please share more details."
  );

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
    >
      <MessageCircle className="text-white" size={28} />
    </a>
  );
};

export default WhatsAppButton;
