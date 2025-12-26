import { Youtube, Instagram, Twitter, Music, Clock, Coffee, Users } from 'lucide-react';

interface SocialLink {
  icon: React.ReactNode;
  label: string;
  gradient: string;
}

const socialLinks: SocialLink[] = [
  {
    icon: <Youtube className="w-6 h-6" />,
    label: 'YouTube',
    gradient: 'from-pink-300 to-red-300',
  },
  {
    icon: <Instagram className="w-6 h-6" />,
    label: 'Instagram',
    gradient: 'from-purple-300 to-pink-300',
  },
  {
    icon: <Twitter className="w-6 h-6" />,
    label: 'X',
    gradient: 'from-blue-300 to-purple-300',
  },
  {
    icon: <Music className="w-6 h-6" />,
    label: 'Spotify',
    gradient: 'from-green-300 to-teal-300',
  },
  {
    icon: <Clock className="w-6 h-6" />,
    label: 'TikTok',
    gradient: 'from-pink-300 to-purple-300',
  },
  {
    icon: <Coffee className="w-6 h-6" />,
    label: 'Fan Cafe',
    gradient: 'from-peach-300 to-yellow-300',
  },
  {
    icon: <Users className="w-6 h-6" />,
    label: 'Weverse',
    gradient: 'from-purple-300 to-blue-300',
  },
];

export function OfficialLinks() {
  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-100/50 mb-6">
      <h4 className="text-center text-gray-800 mb-5">Official Links</h4>

      <div className="flex justify-center gap-3 flex-wrap mb-6">
        {socialLinks.map((link, index) => (
          <button
            key={index}
            className="group relative flex flex-col items-center gap-1.5"
          >
            {/* Icon Circle */}
            <div className="relative w-14 h-14 rounded-full bg-white shadow-md hover:shadow-xl transition-all overflow-hidden group-hover:scale-110 duration-300">
              {/* Gradient on Hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${link.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              ></div>

              {/* Icon */}
              <div className="absolute inset-0 flex items-center justify-center text-purple-500 group-hover:text-white transition-colors z-10">
                {link.icon}
              </div>
            </div>

            {/* Label */}
            <span className="text-xs text-gray-600 group-hover:text-purple-600 transition-colors">
              {link.label}
            </span>
          </button>
        ))}
      </div>

      {/* Footer Text */}
      <div className="text-center space-y-1 pt-4 border-t border-purple-200/50">
        <p className="text-sm text-gray-600">
          Made with 💜 by Fans, for Fans
        </p>
        <p className="text-xs text-gray-500">
          © 2025 Fan Community. All rights reserved.
        </p>
      </div>
    </div>
  );
}
