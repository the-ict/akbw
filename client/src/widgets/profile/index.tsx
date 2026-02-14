'use client';

import { Button } from '@/shared/ui/button';
import {
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalTitle,
  ModalTrigger,
} from '@/shared/ui/modal';
import { cn } from '@/shared/lib/utils';
import {
  X,
  User,
  Heart,
  Bell,
  MessageSquare,
  Menu as MenuIcon,
  Settings,
  Headphones,
  HelpCircle,
  LogOut,
} from 'lucide-react';
import React from 'react';
import * as z from 'zod';
import { useUIStore } from '@/shared/model/use-ui-store';
import ProfileHeader from './ProfileHeader';
import MenuItems from './MenuItems';
import EditProfile from './EditProfile';
import SupportChat from './SupportChat';
import ProductInquiry from './ProductInquiry';
import FavoriteTab from './FavoriteTab';
import Notifications from './Notifications';
import ReviewTab from './ReviewTab';
import { useUserStore } from '@/shared/store/user.store';
import { useUser, useUpdateUser } from '@/features/user/lib/hooks';
import { useSupportChat, useProductInquiry } from './lib/hooks';
import { toast } from '@/shared/ui/toast';
import { uploadRequest } from '@/shared/config/api/upload/upload.request';

const profileSchema = z.object({
  name: z.string().min(2, "Ism kamida 2 ta harfdan iborat bo'lishi kerak"),
  lastName: z
    .string()
    .min(2, "Familiya kamida 2 ta harfdan iborat bo'lishi kerak"),
  gender: z.string().min(2, "Jins kamida 2 ta harfdan iborat bo'lishi kerak"),
});

type TabType = 'menu' | 'favorites' | 'notifications' | 'reviews';
type SubSectionType = 'editProfile' | 'supportChat' | 'productInquiry' | null;

interface ProfileProps {
  children?: React.ReactNode;
}

function Profile({ children }: ProfileProps) {
  const { data: userData, isLoading: isUserLoading } = useUser();
  const updateUserMutation = useUpdateUser();

  const [name, setName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [profileImage, setProfileImage] = React.useState<string>('');
  const [chatMessage, setChatMessage] = React.useState('');
  const [selectedImage, setSelectedImage] = React.useState<File | null>(null);
  const [isUploading, setIsUploading] = React.useState(false);

  React.useEffect(() => {
    if (userData?.data) {
      const user = userData.data;
      setName(user.name || '');
      setLastName(user.lastName || '');
      setGender(user.gender || 'male');
      setPhone(user.phone || '');
      setProfileImage(user.profile_picture || '');
    }
  }, [userData]);

  const {
    isProfileOpen,
    onOpenChange,
    activeProfileTab,
    activeProfileSubSection,
    setProfileSubSection,
    setProfileTab,
  } = useUIStore();

  const activeTab = activeProfileTab as TabType;
  const activeSubSection = activeProfileSubSection as SubSectionType;

  const { setToken } = useUserStore();

  const formatPhone = (value: string) => {
    let cleaned = value.replace(/[^\d+]/g, '');
    if (!cleaned.startsWith('+998')) {
      cleaned = '+998' + cleaned.replace('+', '').replace('998', '');
    }

    let formatted = '+998';
    const digits = cleaned.slice(4).replace(/\D/g, '');

    if (digits.length > 0) formatted += ' ' + digits.slice(0, 2);
    if (digits.length > 2) formatted += ' ' + digits.slice(2, 5);
    if (digits.length > 5) formatted += ' ' + digits.slice(5, 7);
    if (digits.length > 7) formatted += ' ' + digits.slice(7, 9);

    return formatted;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    if (formatted.length <= 19) {
      setPhone(formatted);
    }
  };

  const handleSaveProfile = async () => {
    const result = profileSchema.safeParse({ name, lastName, gender });

    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.issues.forEach((issue: z.ZodIssue) => {
        newErrors[issue.path[0] as string] = issue.message;
      });
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      await updateUserMutation.mutateAsync({
        name,
        lastName,
        gender,
        profile_picture: profileImage,
      });
      toast.success('Profil muvaffaqiyatli saqlandi');
      setProfileSubSection(null);
    } catch (error) {
      toast.error('Profilni saqlashda xatolik yuz berdi');
    }
  };

  const {
    data: supportChat,
    sendMessage: sendSupportMessage,
    createChat: createSupportChat,
  } = useSupportChat();
  const {
    data: productInquiryChat,
    sendMessage: sendProductInquiryMessage,
    createChat: createProductInquiryChat,
  } = useProductInquiry();

  const handleSendMessage = async () => {
    if (!chatMessage.trim()) return;

    try {
      if (activeSubSection === 'supportChat') {
        let chatId = supportChat?.id;
        if (!chatId) {
          const newChat = await createSupportChat({ receiver_id: 'admin' }); // Assuming admin ID is known or handle by backend
          chatId = newChat.id;
        }
        await sendSupportMessage({ chat_id: chatId, message: chatMessage });
      } else if (activeSubSection === 'productInquiry') {
        let chatId = productInquiryChat?.id;
        let photoUrl = '';
        if (selectedImage) {
          const response = await uploadRequest.uploadImage(selectedImage);
          photoUrl = response.url;
        }

        if (!chatId) {
          const newChat = await createProductInquiryChat({
            receiver_id: 'admin',
          });
          chatId = newChat.id;
        }

        if (photoUrl.length > 0) {
          await sendProductInquiryMessage({
            chat_id: chatId,
            message: chatMessage,
            photo: photoUrl,
          });
        } else {
          await sendProductInquiryMessage({
            chat_id: chatId,
            message: chatMessage,
          });
        }

        setSelectedImage(null);
      }
      setChatMessage('');
    } catch (error) {
      toast.error('Xabar yuborishda xatolik yuz berdi');
    }
  };

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setIsUploading(true);
      try {
        const { uploadRequest } = await import(
          '@/shared/config/api/upload/upload.request'
        );
        const response = await uploadRequest.uploadImage(file);
        setProfileImage(response.url);
        toast.success('Rasm yuklandi');
      } catch (error) {
        toast.error('Rasm yuklashda xatolik yuz berdi');
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleBackToMenu = () => {
    setProfileSubSection(null);
  };

  const tabs = [
    { id: 'menu' as TabType, label: 'Menyu', icon: MenuIcon },
    { id: 'favorites' as TabType, label: 'Sevimlilar', icon: Heart },
    { id: 'notifications' as TabType, label: 'Bildirishnomalar', icon: Bell },
    { id: 'reviews' as TabType, label: 'Sharhlar', icon: MessageSquare },
  ];

  const menuItems = [
    {
      id: 'editProfile' as SubSectionType,
      title: 'Profilni tahrirlash',
      description: "Shaxsiy ma'lumotlarni o'zgartirish",
      icon: Settings,
      color: 'from-slate-600 to-slate-700',
    },
    {
      id: 'supportChat' as SubSectionType,
      title: 'Yordam',
      description: "Admin bilan bog'lanish",
      icon: Headphones,
      color: 'from-teal-600 to-teal-700',
    },
    {
      id: 'productInquiry' as SubSectionType,
      title: "Mahsulot so'rash",
      description: "Mahsulot haqida so'rov yuborish",
      icon: HelpCircle,
      color: 'from-indigo-600 to-indigo-700',
    },
  ];

  const renderProfileHeader = () => (
    <ProfileHeader
      name={name}
      lastName={lastName}
      gender={gender}
      profileImage={profileImage}
      activeTab={activeTab}
      activeSubSection={activeSubSection}
      onImageSelect={handleImageSelect}
      isUploading={isUploading}
    />
  );

  const renderMenuItems = () => (
    <MenuItems
      menuItems={menuItems}
      setProfileSubSection={setProfileSubSection}
    />
  );

  const renderEditProfile = () => (
    <EditProfile
      handleBackMenu={handleBackToMenu}
      handleSaveProfile={handleSaveProfile}
      handlePhoneChange={handlePhoneChange}
      name={name}
      lastName={lastName}
      gender={gender}
      phone={phone}
      errors={errors}
      setName={setName}
      setLastName={setLastName}
      setGender={setGender}
    />
  );

  const renderSupportChat = () => (
    <SupportChat
      handleBackToMenu={handleBackToMenu}
      chatMessage={chatMessage}
      setChatMessage={setChatMessage}
      handleSendMessage={handleSendMessage}
      messages={supportChat?.messages || []}
      currentUserId={userData?.data?.id || ''}
    />
  );

  const renderProductInquiry = () => (
    <ProductInquiry
      handleBackToMenu={handleBackToMenu}
      chatMessage={chatMessage}
      setChatMessage={setChatMessage}
      handleSendMessage={handleSendMessage}
      selectedImage={selectedImage}
      handleImageSelect={(e) => {
        if (e.target.files && e.target.files[0]) {
          setSelectedImage(e.target.files[0]);
        }
      }}
      setSelectedImage={setSelectedImage}
      messages={productInquiryChat?.messages || []}
      currentUserId={userData?.data?.id || ''}
    />
  );

  const renderMenuContent = () => {
    if (activeSubSection === 'editProfile') return renderEditProfile();
    if (activeSubSection === 'supportChat') return renderSupportChat();
    if (activeSubSection === 'productInquiry') return renderProductInquiry();
    return renderMenuItems();
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'menu':
        return renderMenuContent();

      case 'favorites':
        return <FavoriteTab />;

      case 'notifications':
        return <Notifications />;

      case 'reviews':
        return <ReviewTab reviews={userData?.data?.reviews || []} />;
    }
  };

  const handleLogOut = () => {
    setToken(null);
    onOpenChange(false);
    window.location.reload();
  };

  return (
    <Modal open={isProfileOpen} onOpenChange={onOpenChange}>
      <ModalTrigger asChild>
        {children || <User size={24} className="cursor-pointer" />}
      </ModalTrigger>
      <ModalContent className="max-w-[95%] md:max-w-xl max-h-[90vh] overflow-hidden flex flex-col bg-white rounded-2xl">
        <ModalTitle className="sr-only">Foydalanuvchi profili</ModalTitle>
        <ModalClose className="absolute right-4 top-4 z-10">
          <X className="h-5 w-5" />
        </ModalClose>

        {(activeTab === 'menu' ||
          activeSubSection === 'editProfile' ||
          activeTab === 'reviews' ||
          activeTab === 'notifications' ||
          activeTab === 'favorites') &&
          renderProfileHeader()}

        {!(activeTab === 'menu' && activeSubSection) && (
          <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar border border-gray-300 p-2 rounded-2xl">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setProfileTab(tab.id);
                    setProfileSubSection(null);
                  }}
                  className={cn(
                    'flex items-center justify-center py-2 px-3 gap-2 cursor-pointer rounded-lg text-sm font-semibold transition-all whitespace-nowrap',
                    activeTab === tab.id
                      ? 'bg-black text-white shadow-md'
                      : 'bg-white text-gray-700',
                  )}
                >
                  <div className="flex items-center flex-col gap-1">
                    <Icon size={16} />
                    {tab.label}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        <div
          className={cn(
            'flex-1 overflow-y-auto px-1',
            activeTab === 'menu' && activeSubSection ? 'mt-6' : 'mt-5',
          )}
        >
          {renderTabContent()}

          {/* Only show logout button when NOT in a sub-section */}
          {!(activeTab === 'menu' && activeSubSection) && (
            <Button
              onClick={handleLogOut}
              className="w-full mt-6 h-11 bg-red-500 hover:bg-red-600 text-white font-semibold shadow-md hover:shadow-lg transition-all"
            >
              <LogOut size={18} className="mr-2" />
              Chiqish
            </Button>
          )}
        </div>

        {/* Only show footer when NOT in a sub-section */}
        {!(activeTab === 'menu' && activeSubSection) && (
          <ModalDescription className="text-gray-400 mt-5 mb-2 text-[10px] text-center leading-tight">
            Ma&apos;lumotlaringiz xavfsiz saqlanadi va uchinchi shaxslarga berilmaydi
          </ModalDescription>
        )}
      </ModalContent>
    </Modal>
  );
}

export default Profile;
