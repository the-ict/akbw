import React from 'react'
import { Camera, User } from 'lucide-react'

interface Props {
    name: string;
    lastName: string;
    gender: string;
    profileImage: string;
    activeTab: string;
    activeSubSection: "editProfile" | "supportChat" | "productInquiry" | null;
}

export default function ProfileHeader({ name, lastName, gender, profileImage, activeTab, activeSubSection }: Props) {
    return (
        <div className="flex flex-col items-center gap-3 pb-6 border-b border-black/5">
            <div className="relative mt-2">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 p-[3px] shadow-lg">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                        {profileImage ? (
                            <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-orange-400 flex items-center justify-center">
                                <User size={48} className="text-white/90" />
                            </div>
                        )}
                    </div>
                </div>
                {
                    activeTab === "menu" && activeSubSection === "editProfile" && (
                        <button className="absolute bottom-1 right-1 bg-black text-white p-2 rounded-full hover:bg-black/80 transition-all shadow-md hover:shadow-lg">
                            <Camera size={12} />
                        </button>
                    )
                }
            </div>
            <div className="text-center">
                <h3 className="font-bold text-lg tracking-tight">{name} {lastName}</h3>
                <p className="text-sm text-gray-500 mt-0.5">{gender === "male" ? "Erkak" : "Ayol"}</p>
            </div>
        </div>
    )
}
