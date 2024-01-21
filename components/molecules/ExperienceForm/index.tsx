'use client';

import { ExperienceFormData } from '@/lib/definitions';
import { Textarea, Button } from '@tremor/react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface ExperienceFormProps {
  action: () => void;
  onCancel?: () => void;
  positionSelectItems: { name: string }[];
  skillsSelectItems: { name: string }[];
  startDateDefaultValue?: Date;
  endDateDefaultValue?: Date;
}

const ExperienceForm = ({
  action,
  onCancel,
  positionSelectItems,
  skillsSelectItems,
  startDateDefaultValue,
  endDateDefaultValue
}: ExperienceFormProps) => {
  const { register, getValues, watch } = useFormContext<ExperienceFormData>();
  const [endDateDisabled, setEndDateDisabled] = useState(() =>
    getValues('isWorkingNow')
  );

  const onIsWorkingNowChange = () => {
    const isWorkingNow = getValues('isWorkingNow');
    setEndDateDisabled(isWorkingNow);
  };

  return (
    <form action={action}>
      <div>
        <label htmlFor="companyName">회사명</label>
        <input
          className="border border-gray-300"
          {...register('companyName', { required: true })}
        />
      </div>
      <div>
        <label htmlFor="position">직책</label>
        <select {...register('position', { required: true })}>
          {positionSelectItems.map((item) => (
            <option key={item.name} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="startDate">시작일</label>
        <input
          className="border border-gray-300"
          {...register('startDate', { required: true })}
          type="date"
          defaultValue={startDateDefaultValue?.toISOString().substring(0, 10)}
        />
      </div>
      <div>
        <label htmlFor="endDate">종료일</label>
        <input
          className="border border-gray-300"
          {...register('endDate')}
          type="date"
          disabled={endDateDisabled}
          defaultValue={endDateDefaultValue?.toISOString().substring(0, 10)}
        />
      </div>
      <div>
        <label htmlFor="isWorkingNow">현재 근무 여부</label>
        <input
          className="border border-gray-300"
          {...register('isWorkingNow', { onChange: onIsWorkingNowChange })}
          type="checkbox"
        />
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
      <div>
        <label htmlFor="description">업무 내용</label>
        <Textarea
          id="description"
          placeholder="Start typing here..."
          className="h-64"
          {...register('description')}
          value={watch('description')}
        />
      </div>
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
    </form>
  );
};

export default ExperienceForm;
