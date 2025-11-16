const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-b from-[#01232e] to-[#071e23] text-white mt-10 pt-10 pb-5 border-t border-white/10">

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* About */}
        <div>
          <h3 className="text-xl font-semibold text-emerald-400 mb-3">E-Commerce</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            Your trusted online marketplace for quality products, secure
            shopping, and the best customer experience.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-emerald-400 mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li><a className="text-gray-300 hover:text-emerald-400 text-sm transition" href="#">Home</a></li>
            <li><a className="text-gray-300 hover:text-emerald-400 text-sm transition" href="#">All Products</a></li>
            <li><a className="text-gray-300 hover:text-emerald-400 text-sm transition" href="#">Categories</a></li>
            <li><a className="text-gray-300 hover:text-emerald-400 text-sm transition" href="#">Cart</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-lg font-semibold text-emerald-400 mb-3">Support</h4>
          <ul className="space-y-2">
            <li><a className="text-gray-300 hover:text-emerald-400 text-sm transition" href="#">Help Center</a></li>
            <li><a className="text-gray-300 hover:text-emerald-400 text-sm transition" href="#">Order Tracking</a></li>
            <li><a className="text-gray-300 hover:text-emerald-400 text-sm transition" href="#">Privacy Policy</a></li>
            <li><a className="text-gray-300 hover:text-emerald-400 text-sm transition" href="#">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold text-emerald-400 mb-3">Contact Us</h4>
          <p className="text-gray-300 text-sm">📍 India</p>
          <p className="text-gray-300 text-sm">📞 +91 9440720814</p>
          <p className="text-gray-300 text-sm">📧 rehmanshaik2993@gmail.com</p>

          <div className="flex space-x-4 mt-3 text-xl">
            <a className="hover:text-emerald-400 transition" href="#">🌐</a>
            <a className="hover:text-emerald-400 transition" href="#">📘</a>
            <a className="hover:text-emerald-400 transition" href="#">📸</a>
            <a className="hover:text-emerald-400 transition" href="#">🐦</a>
          </div>
        </div>

      </div>

      <hr className="mt-8 border-white/10" />

      <p className="text-center text-gray-400 text-sm mt-4">
        © 2025 E-Commerce. All Rights Reserved.
      </p>

    </footer>
  );
};

export default Footer;
