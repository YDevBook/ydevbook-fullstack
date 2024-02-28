'use client';

import {
  Textarea,
  Button,
  TextInput,
  Select,
  SelectItem,
  DatePicker,
  DatePickerValue,
} from '@tremor/react';
import { useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import BadgeSelectItem from '@/components/atoms/BadgeSelectItem';
import { ExperienceFormData } from '@/lib/definitions';

interface ExperienceFormProps {
  action: () => void;
  onCancel?: () => void;
  positionSelectItems: { name: string }[];
  skillsSelectItems: { name: string }[];
}

const ExperienceForm = ({
  action,
  onCancel,
  positionSelectItems,
  skillsSelectItems,
}: ExperienceFormProps) => {
  const {
    register,
    getValues,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useFormContext<ExperienceFormData>();

  const all = watch();
  const { position, skills, startDate, endDate } = all;

  const onPositionChange = (position: string) => {
    setValue('position', position);
  };

  const onDateChange = (
    date: DatePickerValue,
    label: 'startDate' | 'endDate'
  ) => {
    if (date) {
      const newDate = new Date(date);
      setValue(label, newDate);
    } else {
      setValue(label, undefined);
    }
  };

  const [endDateDisabled, setEndDateDisabled] = useState(() =>
    getValues('isWorkingNow')
  );

  const onClickSkillBadge = (value: string, prevClicked?: boolean) => {
    if (prevClicked) {
      const newList = skills?.filter((skill) => skill !== value);
      setValue('skills', newList);
    } else {
      setValue('skills', [...(skills ?? []), value]);
    }
  };

  const onIsWorkingNowChange = () => {
    const isWorkingNow = getValues('isWorkingNow');
    setEndDateDisabled(isWorkingNow);
  };

  const {} = useController({
    name: 'position',
    control,
    rules: { required: '포지션을 선택해주세요.' },
  });
  useController({
    name: 'startDate',
    control,
    rules: { required: '시작일을 선택해주세요.' },
  });

  return (
    <form action={action}>
      <div className="min-h-[100px]">
        <label className="text-[16px] font-extrabold" htmlFor="companyName">
          회사명
        </label>
        <TextInput
          className="mt-2 border border-gray-300"
          {...register('companyName', { required: '회사명을 입력해주세요.' })}
          maxLength={50}
          error={!!errors.companyName}
          errorMessage={errors.companyName?.message}
          placeholder="회사명을 입력해주세요."
        />
      </div>
      <div className="min-h-[100px]">
        <label className="text-[16px] font-extrabold" htmlFor="position">
          포지션
        </label>
        <Select
          className="mt-2 w-16"
          name="position"
          onValueChange={onPositionChange}
          defaultValue={position}
          error={!!errors.position}
          errorMessage={errors.position?.message}
          placeholder="포지션 선택"
        >
          {positionSelectItems.map((item) => (
            <SelectItem key={item.name} value={item.name}>
              {item.name}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div className="min-h-[100px]">
        <label className="text-[16px] font-extrabold" htmlFor="startDate">
          시작일
        </label>
        <DatePicker
          id="startDate"
          defaultValue={startDate}
          onValueChange={(value) => onDateChange(value, 'startDate')}
          enableClear
          enableYearNavigation
          className="mt-2"
          placeholder="시작일 선택"
        />
        {!!errors.startDate && (
          <p className="text-red-500 text-sm">{errors.startDate.message}</p>
        )}
      </div>
      <div className="">
        <label className="text-[16px] font-extrabold" htmlFor="endDate">
          종료일
        </label>
        <DatePicker
          defaultValue={endDate}
          onValueChange={(value) => onDateChange(value, 'endDate')}
          enableClear
          enableYearNavigation
          className="mt-2"
          disabled={endDateDisabled}
          placeholder="종료일 선택"
        />
      </div>
      <div className="mb-6">
        <input
          className="border border-gray-300 mr-2 my-3 rounded-md"
          {...register('isWorkingNow', { onChange: onIsWorkingNowChange })}
          type="checkbox"
        />
        <label className="text-sm text-gray-500" htmlFor="isWorkingNow">
          현재 근무 중이에요.
        </label>
      </div>
      <div className="">
        <label className="text-[16px] font-extrabold" htmlFor="skills">
          사용 기술
        </label>
        <div className="mt-2 overflow-x-scroll">
          <div className="w-[3000px] flex flex-wrap">
            {skillsSelectItems?.map((skill) => (
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
        </div>
      </div>
      <div className="mt-6">
        <label className="text-[16px] font-extrabold" htmlFor="description">
          업무 내용
        </label>
        <Textarea
          id="description"
          placeholder="업무내용을 알려주세요."
          className="h-64 mt-2"
          {...register('description')}
          value={watch('description')}
          defaultValue={undefined}
        />
      </div>
      <div className="mt-4">
        <Button type="submit" className="m-1">
          저장
        </Button>
        <Button
          onClick={onCancel}
          variant="secondary"
          className="m-1"
          type="button"
        >
          취소
        </Button>
      </div>
    </form>
  );
};

export default ExperienceForm;
