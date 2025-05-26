import React from 'react'

const Footer = () => {
  return (
    <div>
      <footer className="py-8 px-6 text-center text-gray-400">
        <p>© {new Date().getFullYear()} Movie App. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Footer;
