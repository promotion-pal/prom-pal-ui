import { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { PromDateField } from "./date/prom.form.date";
import { PromFieldMultiSelect, PromFieldSelect, PromSelectOption } from "./select/prom.form.select";
import { PromFieldInput, PromFieldTextArea } from "./text/prom.form.text";

interface DemoFormValues {
  fullName: string;
  bio: string;
  country: string;
  skills: (string | number)[];
  birthDate: string;
}

const countryOptions: PromSelectOption[] = [
  { value: "ru", label: "Россия" },
  { value: "by", label: "Беларусь" },
  { value: "kz", label: "Казахстан" },
  { value: "am", label: "Армения" },
];

const skillOptions: PromSelectOption[] = [
  { value: "react", label: "React" },
  { value: "typescript", label: "TypeScript" },
  { value: "node", label: "Node.js" },
  { value: "graphql", label: "GraphQL" },
];

const DemoForm = () => {
  const methods = useForm<DemoFormValues>({
    defaultValues: {
      fullName: "",
      bio: "",
      country: "",
      skills: [],
      birthDate: "",
    },
  });
  const [submitted, setSubmitted] = useState<DemoFormValues | null>(null);

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col gap-4 w-[420px]"
        onSubmit={methods.handleSubmit(setSubmitted)}
      >
        <PromFieldInput name="fullName" label="ФИО" placeholder="Иванов Иван" />

        <PromFieldTextArea
          name="bio"
          label="О себе"
          placeholder="Коротко о себе"
        />

        <PromFieldSelect
          name="country"
          label="Страна"
          options={countryOptions}
        />

        <PromFieldMultiSelect
          name="skills"
          label="Навыки"
          options={skillOptions}
        />

        <PromDateField name="birthDate" label="Дата рождения" />

        <button
          type="submit"
          className="border rounded-lg p-2 bg-black text-white font-medium"
        >
          Отправить
        </button>

        {submitted && (
          <pre className="text-xs bg-gray-50 border rounded-lg p-3 overflow-auto">
            {JSON.stringify(submitted, null, 2)}
          </pre>
        )}
      </form>
    </FormProvider>
  );
};

const meta: Meta<typeof DemoForm> = {
  title: "Shared/Form/Demo",
  component: DemoForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DemoForm>;

// Собранная форма из всех полей (для демонстрации)
export const AssembledForm: Story = {};
