'use client';

import { updateProfile } from '@/lib/actions';
import {
  ArrayItemQueryRows,
  GraduateStatusOptions,
  Profile,
  ProfileUpdateFormData
} from '@/lib/definitions';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import DefaultProfileImage from '@/assets/images/default-profile-image.jpg';
import { useSession } from 'next-auth/react';
import { Button } from '@tremor/react';

interface ProfileUpdateFormProps {
  profile: Profile;
}

const ProfileUpdateForm = ({ profile }: ProfileUpdateFormProps) => {
  const { data: session, update } = useSession();
  const { register, handleSubmit } = useForm<ProfileUpdateFormData>({
    defaultValues: { ...profile, dateOfBirth: undefined }
  });

  const action: () => void = handleSubmit(async (data) => {
    try {
      const result = await updateProfile(data);
      if (result === 'success') {
        alert('프로필 수정 성공');
        return window.location.replace('/my-profile');
      }
      alert('프로필 수정 실패');
      return;
    } catch (error) {
      console.error(error);
    }
  });

  const onInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    if (file.size > 1024 * 1024 * 4) {
      alert('4MB 이하의 파일만 업로드 가능합니다.');
      return;
    }
    if (!file.type.includes('image')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/file?upload-type=profile-image', {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        const { profileImageUrl } = await response.json();
        update({ profileImageUrl });
      } else {
        alert('업로드 실패');
        return;
      }
    } catch (error) {
      alert('업로드 실패');
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
        <input
          className="border border-gray-300"
          {...register('name', { required: true })}
        />
      </div>
      <div>
        <label htmlFor="phoneNumber">전화번호</label>
        <input
          className="border border-gray-300"
          {...register('phoneNumber', { required: true, maxLength: 11 })}
        />
      </div>
      <div>
        <label htmlFor="email">이메일</label>
        <input className="border border-gray-300" {...register('email')} />
      </div>
      <div>
        <label htmlFor="dateOfBirth">생년월일</label>
        <input
          className="border border-gray-300"
          type="date"
          {...register('dateOfBirth', { valueAsDate: false })}
          defaultValue={profile.dateOfBirth?.toISOString().substring(0, 10)}
        />
      </div>
      <div>
        <label htmlFor="sex">성별</label>
        <select {...register('sex')}>
          <option disabled>선택해주세요</option>
          <option value={'M'}>남</option>
          <option value={'F'}>여</option>
        </select>
      </div>
      <div>
        <label htmlFor="address">거주 지역</label>
        <input className="border border-gray-300" {...register('address')} />
      </div>
      <div>
        <label htmlFor="school">최종 학력</label>
        <input className="border border-gray-300" {...register('school')} />
      </div>
      <div>
        <label htmlFor="major">전공</label>
        <input className="border border-gray-300" {...register('major')} />
      </div>
      <div>
        <label htmlFor="graduateStatus">재학/졸업여부</label>
        <select {...register('graduateStatus')}>
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
        <input className="border border-gray-300" {...register('githubLink')} />
      </div>
      <div>
        <label htmlFor="webLink">웹 링크</label>
        <input className="border border-gray-300" {...register('webLink')} />
      </div>
      <Button type="submit">제출</Button>
    </form>
  );
};

export default ProfileUpdateForm;
