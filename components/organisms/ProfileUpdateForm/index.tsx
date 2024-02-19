'use client';

import { Button, TextInput } from '@tremor/react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';

import DefaultProfileImage from '@/assets/images/default-profile-image.jpg';
import { NotificationContext } from '@/contexts/NotificationContext';
import { updateProfile } from '@/lib/actions';
import {
  GraduateStatusOptions,
  Profile,
  ProfileUpdateFormData,
} from '@/lib/definitions';

interface ProfileUpdateFormProps {
  profile: Profile;
}

const ProfileUpdateForm = ({ profile }: ProfileUpdateFormProps) => {
  const { data: session, update } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileUpdateFormData>({
    defaultValues: { ...profile, dateOfBirth: undefined },
  });
  const { setContent, setIsOpen } = useContext(NotificationContext);

  const action: () => void = handleSubmit(async (data) => {
    try {
      const response = await updateProfile(data);
      if (response.status === 200) {
        setContent?.({
          title: 'Success',
          description: '프로필을 수정했습니다.',
          onConfirm: () => window.location.replace('/my-profile'),
        });
        setIsOpen?.(true);
        return;
      }
      setContent?.({
        title: 'Error',
        description: '프로필 수정에 실패했습니다.',
      });
      setIsOpen?.(true);
      return;
    } catch (error) {
      setContent?.({
        title: 'Error',
        description: '프로필 수정에 실패했습니다.',
      });
      setIsOpen?.(true);
      return;
    }
  });

  const onInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    if (file.size > 1024 * 1024 * 4) {
      setContent?.({
        title: 'Error',
        description: '4MB 이하의 이미지만 업로드 가능합니다.',
      });
      setIsOpen?.(true);
      return;
    }
    if (!file.type.includes('image')) {
      setContent?.({
        title: 'Error',
        description: '이미지 파일만 업로드 가능합니다.',
      });
      setIsOpen?.(true);
      return;
    }
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/file?upload-type=profile-image', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const { profileImageUrl } = await response.json();
        update({ profileImageUrl });
        setContent?.({
          title: 'Success',
          description: '프로필 이미지를 변경했습니다.',
        });
        setIsOpen?.(true);
      } else {
        setContent?.({
          title: 'Error',
          description: '프로필 이미지 업로드에 실패했습니다.',
        });
        setIsOpen?.(true);
        return;
      }
    } catch (error) {
      setContent?.({
        title: 'Error',
        description: '프로필 이미지 업로드에 실패했습니다.',
      });
      setIsOpen?.(true);
      return;
    }
  };

  return (
    <form action={action}>
      <div className="relative">
        <input
          type="file"
          className="hidden"
          name="profileImageInput"
          id="profileImageInput"
          accept="image/*"
          onChange={onInputChange}
        />
        <div className="relative inline-block">
          <Image
            src={session?.user.profileImageUrl || DefaultProfileImage}
            alt="프로필 이미지"
            width={100}
            height={100}
            priority
          />
          <label
            className="absolute bottom-0 right-0 cursor-pointer"
            htmlFor="profileImageInput"
          >
            edit
          </label>
        </div>
      </div>
      <div>
        <label htmlFor="name">이름</label>
        <TextInput
          className="border border-gray-300"
          {...register('name', { required: true, maxLength: 50 })}
          error={!!errors.name}
          maxLength={50}
        />
      </div>
      <div>
        <label htmlFor="phoneNumber">전화번호</label>
        <TextInput
          className="border border-gray-300"
          {...register('phoneNumber', { required: true, maxLength: 11 })}
          error={!!errors.phoneNumber}
        />
      </div>
      <div>
        <label htmlFor="email">이메일</label>
        <TextInput
          className="border border-gray-300"
          {...register('email', { required: true, maxLength: 50 })}
          error={!!errors.email}
        />
      </div>
      <div>
        <label htmlFor="dateOfBirth">생년월일</label>
        <input
          className="border border-gray-300"
          type="date"
          {...register('dateOfBirth', { valueAsDate: false })}
          defaultValue={profile.dateOfBirth?.toISOString().substring(0, 10)}
          // error={!!errors.dateOfBirth}
        />
      </div>
      <div>
        <label htmlFor="address">거주 지역</label>
        <TextInput
          className="border border-gray-300"
          {...register('address', { maxLength: 100 })}
          error={!!errors.address}
        />
      </div>
      <div>
        <label htmlFor="school">최종 학력</label>
        <TextInput
          className="border border-gray-300"
          {...register('school', { maxLength: 50 })}
          error={!!errors.school}
        />
      </div>
      <div>
        <label htmlFor="major">전공</label>
        <TextInput
          className="border border-gray-300"
          {...register('major', { maxLength: 50 })}
          error={!!errors.major}
        />
      </div>
      <div>
        <label htmlFor="graduateStatus">재학/졸업여부</label>
        <select
          {...register('graduateStatus')}
          // error={!!errors.graduateStatus}
        >
          <option disabled>선택해주세요</option>
          {GraduateStatusOptions.map((item) => (
            <option value={item.value} key={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="githubLink">깃헙 링크</label>
        <TextInput
          className="border border-gray-300"
          {...register('githubLink')}
          error={!!errors.githubLink}
        />
      </div>
      <div>
        <label htmlFor="webLink">웹 링크</label>
        <TextInput
          className="border border-gray-300"
          {...register('webLink')}
          error={!!errors.webLink}
        />
      </div>
      <Button className="w-full mt-4" type="submit">
        제출
      </Button>
    </form>
  );
};

export default ProfileUpdateForm;
