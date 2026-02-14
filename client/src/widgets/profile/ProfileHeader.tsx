import React, { useRef } from 'react';
import { Camera, User, Loader2 } from 'lucide-react';

interface Props {
  name: string;
  lastName: string;
  gender: string;
  profileImage: string;
  activeTab: string;
  activeSubSection: 'editProfile' | 'supportChat' | 'productInquiry' | null;
  onImageSelect?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isUploading?: boolean;
}

export default function ProfileHeader({
  name,
  lastName,
  gender,
  profileImage,
  activeTab,
  activeSubSection,
  onImageSelect,
  isUploading,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center gap-3 pb-6 border-b border-black/5">
      <div className="relative mt-2">
        <div className="w-28 h-28 rounded-full bg-gradient-to-br shadow-lg">
          <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden relative">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-orange-400 flex items-center justify-center">
                <User size={48} className="text-white/90" />
              </div>
            )}
            {isUploading && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              </div>
            )}
          </div>
        </div>
        {activeTab === 'menu' && activeSubSection === 'editProfile' && (
          <>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={onImageSelect}
            />
            <button
              onClick={handleCameraClick}
              disabled={isUploading}
              className="absolute bottom-1 right-1 bg-black text-white p-2 rounded-full hover:bg-black/80 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Camera size={12} />
            </button>
          </>
        )}
      </div>
      <div className="text-center">
        <h3 className="font-bold text-lg tracking-tight">
          {name} {lastName}
        </h3>
        <p className="text-sm text-gray-500 mt-0.5">
          {gender === 'male' ? 'Erkak' : 'Ayol'}
        </p>
      </div>
    </div>
  );
}
