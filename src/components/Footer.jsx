export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12 py-6">
      <div className="container mx-auto px-5 text-center text-sm">
        <p>© {new Date().getFullYear()} News Portal. All rights reserved.</p>
        <p className="mt-1">Built with ❤️ using React & Tailwind CSS</p>
      </div>
    </footer>
  );
}
