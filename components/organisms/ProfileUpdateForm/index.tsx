'use client';

import { RiAddCircleFill } from '@remixicon/react';
import {
  Button,
  DatePicker,
  DatePickerValue,
  MultiSelect,
  Select,
  SelectItem,
  TextInput,
} from '@tremor/react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';

import DefaultProfileImage from '@/assets/images/default-profile-image.jpg';
import { NotificationContext } from '@/contexts/NotificationContext';
import { updateProfile } from '@/lib/actions';
import {
  ContractPreference,
  ContractPreferenceOptions,
  GraduateStatusOptions,
  Profile,
  ProfileUpdateFormData,
} from '@/lib/definitions';

interface ProfileUpdateFormProps {
  profile: Profile;
}

// 원인 모를 오류로 인해 스키마 validation 이 안먹음. 주석 처리하고 밑에 register 에서 직접 validation 처리
// const profileUpdateFormSchema: yup.ObjectSchema<ProfileUpdateFormData> = yup
//   .object()
//   .shape({
//     name: yup
//       .string()
//       .required('이름을 입력해주세요.')
//       .max(50, '이름은 50자 이하여야 합니다.'),
//     phoneNumber: yup
//       .string()
//       .required('전화번호를 입력해주세요.')
//       .max(11, '전화번호는 11자 이하여야 합니다.'),
//     email: yup
//       .string()
//       .required('이메일을 입력해주세요.')
//       .max(50, '이메일은 50자 이하여야 합니다.'),
//     dateOfBirth: yup.date(),
//     address: yup.string().max(100, '100자 이내로 입력해주세요.'),
//     school: yup.string().max(50, '50자 이내로 입력해주세요.'),
//     major: yup.string().max(50, '50자 이내로 입력해주세요.'),
//     graduateStatus: yup.string(),
//     githubLink: yup.string(),
//     webLink: yup.string(),
//   });

const ProfileUpdateForm = ({ profile }: ProfileUpdateFormProps) => {
  const { data: session, update } = useSession();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProfileUpdateFormData>({
    defaultValues: { ...profile },
  });
  const { dateOfBirth, graduateStatus, contractPreference } = watch();
  const { setContent, setIsOpen } = useContext(NotificationContext);

  const onDateChange = (date: DatePickerValue) => {
    if (date) {
      const newDateofBirth = new Date(date);
      setValue('dateOfBirth', newDateofBirth);
    } else {
      setValue('dateOfBirth', undefined);
    }
  };

  const onGraduateStatusChange = (value: string) => {
    setValue('graduateStatus', value);
  };

  const onContractPreferenceChange = (value: string[]) => {
    setValue('contractPreference', value as ContractPreference[]);
  };

  const action: () => void = handleSubmit(async (data) => {
    try {
      const response = await updateProfile(data);
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

  const onInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    if (file.size > 1024 * 1024 * 4) {
      setContent?.({
        title: 'Error',
        description: '4MB 이하의 이미지만 업로드 가능합니다.',
      });
      setIsOpen?.(true);
      return;
    }
    if (!file.type.includes('image')) {
      setContent?.({
        title: 'Error',
        description: '이미지 파일만 업로드 가능합니다.',
      });
      setIsOpen?.(true);
      return;
    }
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/file?upload-type=profile-image', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const { profileImageUrl } = await response.json();
        update({ profileImageUrl });
        setContent?.({
          title: 'Success',
          description: '프로필 이미지를 변경했습니다.',
        });
        setIsOpen?.(true);
      } else {
        setContent?.({
          title: 'Error',
          description: '프로필 이미지 업로드에 실패했습니다.',
        });
        setIsOpen?.(true);
        return;
      }
    } catch (error) {
      setContent?.({
        title: 'Error',
        description: '프로필 이미지 업로드에 실패했습니다.',
      });
      setIsOpen?.(true);
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
        <div className="relative flex flex-col items-center justify-center m-8">
          <div className="relative inline-block">
            <Image
              src={session?.user.profileImageUrl || DefaultProfileImage}
              alt="프로필 이미지"
              width={100}
              height={100}
              priority
              className="rounded-full w-[120px] h-[120px] object-cover"
            />
            <label
              className="absolute bottom-0 right-0 cursor-pointer"
              htmlFor="profileImageInput"
            >
              <RiAddCircleFill className="w-8 h-8 text-gray-500" />
            </label>
          </div>
        </div>
      </div>
      <div className="relative min-h-[100px]">
        <label className="text-[16px] font-extrabold" htmlFor="name">
          이름
        </label>
        <TextInput
          className="mt-2 border border-gray-300"
          {...register('name', { required: '이름을 입력해주세요.' })}
          maxLength={50}
          error={!!errors.name}
          errorMessage={errors.name?.message}
          placeholder="이름을 입력해주세요."
        />
      </div>
      <div className="relative min-h-[100px]">
        <label className="text-[16px] font-extrabold" htmlFor="phoneNumber">
          전화번호
        </label>
        <TextInput
          className="mt-2 border border-gray-300"
          {...register('phoneNumber', { required: '전화번호를 입력해주세요.' })}
          maxLength={11}
          error={!!errors.phoneNumber}
          errorMessage={errors.phoneNumber?.message}
          placeholder="전화번호를 입력해주세요."
        />
      </div>
      <div className="relative min-h-[100px]">
        <label className="text-[16px] font-extrabold" htmlFor="email">
          이메일
        </label>
        <TextInput
          className="mt-2 border border-gray-300"
          {...register('email', { required: '이메일을 입력해주세요.' })}
          maxLength={50}
          error={!!errors.email}
          errorMessage={errors.email?.message}
          placeholder="이메일을 입력해주세요."
        />
      </div>
      <div className="relative min-h-[100px]">
        <label className="text-[16px] font-extrabold" htmlFor="dateOfBirth">
          생년월일
        </label>
        <DatePicker
          defaultValue={dateOfBirth}
          onValueChange={onDateChange}
          enableClear
          enableYearNavigation
          className="mt-2"
          placeholder="생년월일 선택"
        />
      </div>
      <div className="relative min-h-[100px]">
        <label className="text-[16px] font-extrabold" htmlFor="address">
          거주 지역
        </label>
        <TextInput
          className="mt-2 border border-gray-300"
          {...register('address')}
          maxLength={100}
          error={!!errors.address}
          errorMessage={errors.address?.message}
          placeholder="ex) 서울특별시 서대문구"
        />
      </div>
      <div className="relative min-h-[100px]">
        <label className="text-[16px] font-extrabold" htmlFor="school">
          최종 학력
        </label>
        <TextInput
          className="mt-2 border border-gray-300"
          {...register('school')}
          maxLength={50}
          error={!!errors.school}
          errorMessage={errors.school?.message}
          placeholder="최종 학력을 입력해주세요."
        />
      </div>
      <div className="relative min-h-[100px]">
        <label className="text-[16px] font-extrabold" htmlFor="major">
          전공
        </label>
        <TextInput
          className="mt-2 border border-gray-300"
          {...register('major')}
          maxLength={50}
          error={!!errors.major}
          errorMessage={errors.major?.message}
          placeholder="전공을 입력해주세요."
        />
      </div>
      <div className="relative min-h-[100px]">
        <label className="text-[16px] font-extrabold" htmlFor="graduateStatus">
          재학/졸업여부
        </label>
        <Select
          defaultValue={graduateStatus}
          onValueChange={onGraduateStatusChange}
          value={graduateStatus}
          enableClear
          className="mt-2"
          placeholder="재학/졸업여부 선택"
        >
          {GraduateStatusOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div className="relative min-h-[100px]">
        <label className="text-[16px] font-extrabold" htmlFor="graduateStatus">
          선호 계약 형태
        </label>
        <MultiSelect
          defaultValue={contractPreference || []}
          onValueChange={onContractPreferenceChange}
          value={contractPreference || []}
          className="mt-2"
          placeholder="선호 계약 형태 선택"
        >
          {ContractPreferenceOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </MultiSelect>
      </div>
      <div className="relative min-h-[100px]">
        <label className="text-[16px] font-extrabold" htmlFor="githubLink">
          깃헙 링크
        </label>
        <TextInput
          className="mt-2 border border-gray-300"
          {...register('githubLink')}
          error={!!errors.githubLink}
          placeholder="ex) https://github.com/***"
        />
      </div>
      <div className="relative min-h-[100px]">
        <label className="text-[16px] font-extrabold" htmlFor="webLink">
          웹 링크
        </label>
        <TextInput
          className="mt-2 border border-gray-300"
          {...register('webLink')}
          error={!!errors.webLink}
          placeholder="ex) https://www.***.com"
        />
      </div>
      <Button className="w-full mt-10" type="submit">
        저장하기
      </Button>
    </form>
  );
};

export default ProfileUpdateForm;
