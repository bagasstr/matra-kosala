"use client";

import { motion } from "framer-motion";
import { memo } from "react";
import { MessageSquare } from "lucide-react";

const StartYouProject = memo(() => {
  return (
    <div className="relative">
      <motion.h2
        style={{ willChange: "transform, opacity" }}
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-primary-dark text-center text-2xl uppercase font-bold"
      >
        Mulai Proyek Anda
      </motion.h2>
      <motion.div
        style={{ willChange: "transform, opacity" }}
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="space-y-4 bg-primary-accent py-8 px-4 text-primary-dark text-center mt-8 border-2 border-primary-dark relative"
      >
        <p className="">
          Setiap proyek adalah sebuah petualangan. Kami mengajak Anda untuk
          menjadi bagian dari petualangan kami.
        </p>
        <p className="">
          Mari wujudkan bersama ruang yang menginspirasi dan fungsional.
        </p>
        <p className="font-medium">
          Hubungi kami untuk konsultasi gratis dan langkah pertama menuju proyek
          impian Anda.
        </p>
      </motion.div>
      <div className="flex justify-end mt-10">
        <motion.a
          href="https://wa.me/your-whatsapp-number"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-primary-light text-white px-4 py-2 rounded-md font-medium"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageSquare size={18} />
          Terhubung via WA
        </motion.a>
      </div>
    </div>
  );
});

StartYouProject.displayName = "StartYouProject";

export default StartYouProject;
