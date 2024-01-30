'use client';

import { ProfileFormData } from '@/lib/definitions';
import { useForm } from 'react-hook-form';
import useLocalStorage from '@/lib/useLocalStorage';
import { insertProfile } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import { Button } from '@tremor/react';

const ProfileForm = ({
  positionSelectItems,
  skillsSelectItems
}: {
  positionSelectItems: { name: string }[];
  skillsSelectItems: { name: string }[];
}) => {
  const router = useRouter();
  const [localStorageValue, setLocalStorageValue] =
    useLocalStorage<ProfileFormData>('profileForm', {
      phoneNumber: '',
      dateOfBirth: '',
      address: '',
      school: '',
      major: '',
      positions: [],
      skills: [],
      githubLink: ''
    });

  const { register, handleSubmit } = useForm<ProfileFormData>({
    defaultValues: localStorageValue
  });

  const action: () => void = handleSubmit(async (data) => {
    setLocalStorageValue(data);
    try {
      const result = await insertProfile(data);
      if (result === 'Profile already exists') {
        alert('프로필이 이미 존재합니다');
        return;
      }
      if (result === 'success') {
        alert('프로필 생성 성공');
        return router.replace('/my-profile');
      }
      alert('프로필 생성 실패');
      return;
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <form action={action}>
      <div>
        <label htmlFor="phoneNumber">전화번호</label>
        <input
          className="border border-gray-300"
          {...register('phoneNumber', { required: true, maxLength: 11 })}
        />
      </div>
      <div>
        <label htmlFor="dateOfBirth">생년월일</label>
        <input
          className="border border-gray-300"
          type="date"
          {...register('dateOfBirth')}
        />
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
        <label htmlFor="githubLink">깃헙 링크</label>
        <input className="border border-gray-300" {...register('githubLink')} />
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

export default ProfileForm;
