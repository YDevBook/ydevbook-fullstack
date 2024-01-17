'use client';

import { Button } from '@/components/atoms/Button';
import { ProfileFormData } from '@/lib/definitions';
import { Controller, useForm } from 'react-hook-form';
import useLocalStorage from '@/lib/useLocalStorage';
import { MultiSelect, MultiSelectItem } from '@tremor/react';

const ProfileForm = ({
  positionSelectItems,
  skillsSelectItems
}: {
  positionSelectItems: { name: string }[];
  skillsSelectItems: { name: string }[];
}) => {
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

  const { register, handleSubmit, control, setValue } =
    useForm<ProfileFormData>({
      defaultValues: localStorageValue
    });

  const action: () => void = handleSubmit(async (data) => {
    console.log(data);
    setLocalStorageValue(data);
  });

  return (
    <form action={action}>
      <div>
        <label htmlFor="phoneNumber">전화번호</label>
        <input
          className="border border-gray-300"
          {...register('phoneNumber', { required: true, maxLength: 11 })}
          // defaultValue={value?.phoneNumber}
        />
      </div>
      <div>
        <label htmlFor="dateOfBirth">생년월일</label>
        <input
          className="border border-gray-300"
          type="date"
          {...register('dateOfBirth')}
          // defaultValue={value?.dateOfBirth}
        />
      </div>
      <div>
        <label htmlFor="address">거주 지역</label>
        <input
          className="border border-gray-300"
          {...register('address')}
          // defaultValue={value?.address}
        />
      </div>
      <div>
        <label htmlFor="school">최종 학력</label>
        <input
          className="border border-gray-300"
          {...register('school')}
          // defaultValue={value?.school}
        />
      </div>
      <div>
        <label htmlFor="major">전공</label>
        <input
          className="border border-gray-300"
          {...register('major')}
          // defaultValue={value?.major}
        />
      </div>
      <div>
        <label htmlFor="githubLink">깃헙 링크</label>
        <input
          className="border border-gray-300"
          {...register('githubLink')}
          // defaultValue={value?.githubLink}
        />
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
