'use client';

import { Button, TextInput } from '@tremor/react';
import { useContext, useState } from 'react';
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
  const [skillSearchValue, setSkillSearchValue] = useState('');

  const onClickPositionBadge = (value: string, prevClicked?: boolean) => {
    if (prevClicked) {
      const newList = positions?.filter((position) => position !== value);
      setValue('positions', newList);
    } else {
      setValue('positions', [...(positions ?? []), value]);
    }
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
      <div className="mt-2 mb-10">
        <label className="text-[16px] font-extrabold" htmlFor="positions">
          구직중인 포지션
        </label>
        <div className="mt-2 overflow-x-scroll">
          <div className="w-[500px] flex flex-wrap">
            {positionSelectItems?.map((position) => (
              <BadgeSelectItem
                key={position.name}
                label={position.name}
                value={position.name}
                iconSrc="🧑‍💻"
                clicked={
                  !!positions &&
                  positions?.findIndex((item) => item === position.name) !== -1
                }
                onClick={onClickPositionBadge}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-2">
        <label className="text-[16px] font-extrabold" htmlFor="skills">
          보유 기술
        </label>
        <TextInput
          className="mt-4"
          placeholder="기술 스택을 검색해보세요."
          onChange={(e) => setSkillSearchValue(e.target.value)}
          value={skillSearchValue}
        />
        <div className="mt-2 overflow-y-scroll h-60">
          <div className="flex flex-wrap">
            {skillsSelectItems
              ?.filter(
                (skill) =>
                  skillSearchValue === '' ||
                  skill.name
                    .toLowerCase()
                    .includes(skillSearchValue.trim().toLowerCase())
              )
              .map((skill) => (
                <BadgeSelectItem
                  key={skill.name}
                  label={skill.name}
                  value={skill.name}
                  iconSrc="💻"
                  clicked={
                    !!skills &&
                    skills?.findIndex((item) => item === skill.name) !== -1
                  }
                  onClick={onClickSkillBadge}
                />
              ))}
          </div>
          <div className="w-full h-10 sticky bottom-0 bg-gradient-to-b from-transparent to-white pointer-events-none" />
        </div>
        {!!errors.skills && (
          <p className="py-2 text-red-500">{errors.skills.message}</p>
        )}
      </div>
      <Button className="w-full mt-12" type="submit">
        제출
      </Button>
    </form>
  );
};

export default ProfilePositionAndSkillUpdateForm;
