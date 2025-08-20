export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-white text-gray-900">
      <h1 className="text-4xl font-bold mb-4">Welcome to Diverse Loopers 🚀</h1>
      <p className="max-w-2xl mb-8 text-lg">
        We provide business tech solutions, skill development, and career-building
        programs for students and professionals.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Our Programs</h2>
      <ul className="space-y-2 text-lg">
        <li>🌐 Web Development Training</li>
        <li>🤖 AI & Machine Learning</li>
        <li>📈 Digital Marketing & Branding</li>
        <li>💼 Career & Placement Assistance</li>
      </ul>

      <footer className="mt-12 text-sm text-gray-600">
        📩 Contact us: info@diverseloopers.com
      </footer>
    </main>
  );
}
