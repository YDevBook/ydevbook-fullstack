'use client';

import { Button, MultiSelect, MultiSelectItem } from '@tremor/react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';

import BadgeSelectItem from '@/components/atoms/BadgeSelectItem';
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
  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProfilePositionAndSkillsUpdateFormData>({
    defaultValues: { positions: profile.positions, skills: profile.skills },
  });
  const { positions, skills } = watch();
  const { setContent, setIsOpen } = useContext(NotificationContext);

  const onPositionChange = (values: string[]) => {
    setValue('positions', values);
  };

  const onClickSkillBadge = (value: string, prevClicked?: boolean) => {
    if (prevClicked) {
      const newList = skills?.filter((skill) => skill !== value);
      setValue('skills', newList);
    } else {
      setValue('skills', [...(skills ?? []), value]);
    }
  };

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
        <MultiSelect
          className=""
          placeholder="선택해주세요. "
          defaultValue={[]}
          value={positions}
          onValueChange={onPositionChange}
          error={!!errors.positions}
          errorMessage={errors.positions && errors.positions.message}
        >
          {positionSelectItems.map((item) => (
            <MultiSelectItem key={item.name} value={item.name}>
              {item.name}
            </MultiSelectItem>
          ))}
        </MultiSelect>
      </div>
      <div className="mt-12">
        <label htmlFor="skills">보유 기술</label>
        <div className="h-40 m-4 overflow-auto">
          {skillsSelectItems?.map((skill) => (
            <BadgeSelectItem
              key={skill.name}
              label={skill.name}
              value={skill.name}
              clicked={
                !!skills &&
                skills?.findIndex((item) => item === skill.name) !== -1
              }
              onClick={onClickSkillBadge}
            />
          ))}
        </div>
        {!!errors.skills && (
          <p className="py-2 text-red-500">{errors.skills.message}</p>
        )}
      </div>
      <Button type="submit">제출</Button>
    </form>
  );
};

export default ProfilePositionAndSkillUpdateForm;
