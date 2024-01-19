'use client';

import { Button } from '@/components/atoms/Button';
import { updateProfile } from '@/lib/actions';
import {
  GraduateStatusOptions,
  Profile,
  ProfileUpdateFormData
} from '@/lib/definitions';
import { useForm } from 'react-hook-form';

const ProfileUpdateForm = ({
  profile,
  positionSelectItems,
  skillsSelectItems
}: {
  profile: Profile;
  positionSelectItems: { name: string }[];
  skillsSelectItems: { name: string }[];
}) => {
  const { register, handleSubmit } = useForm<ProfileUpdateFormData>({
    defaultValues: { ...profile, dateOfBirth: undefined }
  });

  // console.log(profile.dateOfBirth?.toISOString().substring(0, 10));

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

  return (
    <form action={action}>
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
      <div>
        <label htmlFor="positions">구직중인 포지션</label>
        <select {...register('positions')} multiple>
          {positionSelectItems.map((item) => (
            <option value={item.name} key={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="skills">보유 기술</label>
        <select {...register('skills')} multiple>
          {skillsSelectItems.map((item) => (
            <option value={item.name} key={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <Button type="submit">제출</Button>
    </form>
  );
};

export default ProfileUpdateForm;
