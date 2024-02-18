'use client';

import { Button } from '@tremor/react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';

import { NotificationContext } from '@/contexts/NotificationContext';
import { updateProfilePositionAndSkills } from '@/lib/actions';
import {
  ArrayItemQueryRows,
  Profile,
  ProfilePositionAndSkillsUpdateFormData,
} from '@/lib/definitions';

interface ProfilePositionAndSkillUpdateFormProps {
  profile: Profile;
  positionSelectItems: ArrayItemQueryRows[];
  skillsSelectItems: ArrayItemQueryRows[];
}

const ProfilePositionAndSkillUpdateForm = ({
  profile,
  positionSelectItems,
  skillsSelectItems,
}: ProfilePositionAndSkillUpdateFormProps) => {
  const { register, handleSubmit } =
    useForm<ProfilePositionAndSkillsUpdateFormData>({
      defaultValues: { positions: profile.positions, skills: profile.skills },
    });
  const { setContent, setIsOpen } = useContext(NotificationContext);

  const action: () => void = handleSubmit(async (data) => {
    try {
      const response = await updateProfilePositionAndSkills(data);
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
