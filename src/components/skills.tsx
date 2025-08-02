import { motion } from "framer-motion";

const skills = [
  "💻 Linux / Shell / SSH",
  "🐳 Docker & Docker Compose",
  "☁️ Google Cloud (GCE, GCS, Cloud Run)",
  "⚙️ CI/CD (GitHub Actions, GitLab CI)",
  "🌐 Nginx / Apache / Firewall / DNS",
  "📦 Laravel & Next.js",
  "🧠 Monitoring & Logging",
];

export default function Skills() {
  return (
    <section className="mt-16">
      <p className="text-lg mb-2">kai@localhost:~$ cat skills.txt</p>
      <div className="bg-[#111] p-4 rounded-lg border border-green-400">
        {skills.map((skill, index) => (
          <motion.p
            key={skill}
            className="text-green-300"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            {skill}
          </motion.p>
        ))}
      </div>
    </section>
  );
}
