'use client';

import { updateProfilePositionAndSkills } from '@/lib/actions';
import {
  ArrayItemQueryRows,
  Profile,
  ProfilePositionAndSkillsUpdateFormData
} from '@/lib/definitions';
import { Button } from '@tremor/react';
import { useForm } from 'react-hook-form';

interface ProfilePositionAndSkillUpdateFormProps {
  profile: Profile;
  positionSelectItems: ArrayItemQueryRows[];
  skillsSelectItems: ArrayItemQueryRows[];
}

const ProfilePositionAndSkillUpdateForm = ({
  profile,
  positionSelectItems,
  skillsSelectItems
}: ProfilePositionAndSkillUpdateFormProps) => {
  const { register, handleSubmit } =
    useForm<ProfilePositionAndSkillsUpdateFormData>({
      defaultValues: { positions: profile.positions, skills: profile.skills }
    });

  const action: () => void = handleSubmit(async (data) => {
    try {
      const result = await updateProfilePositionAndSkills(data);
      if (result === 'success') {
        alert('프로필 수정 성공');
        return window.location.replace('/my-profile');
      }
      alert('프로필 수정 실패');
      return;
    } catch (error) {
      console.error(error);
      alert('프로필 수정 실패');
      return;
    }
  });

  return (
    <form action={action}>
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

export default ProfilePositionAndSkillUpdateForm;
