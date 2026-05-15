import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-apple-bg-secondary pt-20 pb-10 border-t border-apple-border">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-4">
            <h4 className="text-[14px] font-bold text-apple-text uppercase tracking-wider">Company</h4>
            <ul className="space-y-2">
              <li><Link href="#about" className="text-[12px] text-apple-text-secondary hover:underline">About Us</Link></li>
              <li><Link href="#work" className="text-[12px] text-apple-text-secondary hover:underline">Our Work</Link></li>
              <li><Link href="#" className="text-[12px] text-apple-text-secondary hover:underline">Careers</Link></li>
              <li><Link href="#" className="text-[12px] text-apple-text-secondary hover:underline">Press</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-[14px] font-bold text-apple-text uppercase tracking-wider">Services</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-[12px] text-apple-text-secondary hover:underline">Web Development</Link></li>
              <li><Link href="#" className="text-[12px] text-apple-text-secondary hover:underline">Mobile Apps</Link></li>
              <li><Link href="#" className="text-[12px] text-apple-text-secondary hover:underline">AI Solutions</Link></li>
              <li><Link href="#" className="text-[12px] text-apple-text-secondary hover:underline">UI/UX Design</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-[14px] font-bold text-apple-text uppercase tracking-wider">Social</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-[12px] text-apple-text-secondary hover:underline">LinkedIn</Link></li>
              <li><Link href="#" className="text-[12px] text-apple-text-secondary hover:underline">X (Twitter)</Link></li>
              <li><Link href="#" className="text-[12px] text-apple-text-secondary hover:underline">Instagram</Link></li>
              <li><Link href="#" className="text-[12px] text-apple-text-secondary hover:underline">Dribbble</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-[14px] font-bold text-apple-text uppercase tracking-wider">Contact</h4>
            <ul className="space-y-2">
              <li className="text-[12px] text-apple-text-secondary">hello@azlabs.com</li>
              <li className="text-[12px] text-apple-text-secondary">+1 (555) 000-0000</li>
              <li className="text-[12px] text-apple-text-secondary">San Francisco, CA</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-apple-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[12px] text-apple-text-secondary">
            © 2026 AZLABS. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-[12px] text-apple-text-secondary hover:underline">Privacy Policy</Link>
            <Link href="#" className="text-[12px] text-apple-text-secondary hover:underline">Terms of Service</Link>
            <Link href="#" className="text-[12px] text-apple-text-secondary hover:underline">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
