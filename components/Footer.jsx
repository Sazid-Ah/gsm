export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 text-xs mt-12 pt-10 pb-6 border-t border-slate-800 font-sans">
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <div className="font-black text-lg tracking-wider mb-2 flex items-center">
            <span className="text-amber-500 text-2xl">GSM</span>
            <span className="text-white text-2xl">SERVER</span>
          </div>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Got Questions? Call us 24/7 support desk
          </p>
          <div className="text-amber-400 font-bold text-sm mt-1">+91 89237 44131</div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-3 uppercase text-xs tracking-wider">Company</h4>
          <ul className="space-y-2 text-[11px] text-slate-400">
            <li><a href="#" className="hover:text-amber-400 transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-amber-400 transition-colors">Contact Us</a></li>
            <li><a href="#" className="hover:text-amber-400 transition-colors">Order History</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-3 uppercase text-xs tracking-wider">My Account</h4>
          <ul className="space-y-2 text-[11px] text-slate-400">
            <li><a href="#" className="hover:text-amber-400 transition-colors">View Cart</a></li>
            <li><a href="#" className="hover:text-amber-400 transition-colors">Sign In</a></li>
            <li><a href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-3 uppercase text-xs tracking-wider">Newsletter</h4>
          <div className="flex gap-1">
            <input
              type="email"
              placeholder="Your E-mail Address"
              className="bg-slate-800 border border-slate-700 rounded px-3 py-2 text-xs text-white outline-none w-full"
            />
            <button className="bg-amber-500 text-slate-950 font-bold px-3 py-2 text-xs rounded hover:bg-amber-600 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 pt-4 border-t border-slate-800 text-center text-[11px] text-slate-500">
        Copyright © {new Date().getFullYear()} GSM Server. All Rights Reserved.
      </div>
    </footer>
  );
}