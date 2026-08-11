import { Meta, StoryObj } from "@storybook/react-vite";
import { FormProvider, useForm } from "react-hook-form";
import { PromFieldMultiSelect, PromFieldSelect, PromSelectOption } from "./prom.form.select";

const FormWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

const countryOptions: PromSelectOption[] = [
  { value: "ru", label: "Россия" },
  { value: "by", label: "Беларусь" },
  { value: "kz", label: "Казахстан" },
  { value: "am", label: "Армения" },
];

const meta: Meta<typeof PromFieldSelect> = {
  title: "Shared/Form/PromFieldSelect",
  component: PromFieldSelect,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <FormWrapper>
        <div className="w-[400px] p-4">
          <Story />
        </div>
      </FormWrapper>
    ),
  ],
  argTypes: {
    name: {
      control: "text",
      description: "Имя поля (должно совпадать с формой)",
    },
    label: {
      control: "text",
      description: "Заголовок поля",
    },
    placeholder: {
      control: "text",
      description: "Плейсхолдер",
    },
    options: {
      control: "object",
      description: "Список опций { value, label }",
    },
  },
};

export default meta;
type Story = StoryObj<typeof PromFieldSelect>;

// Базовый пример
export const Default: Story = {
  args: {
    name: "country",
    label: "Страна",
    placeholder: "Выберите страну",
    options: countryOptions,
  },
};

// Без подписи
export const WithoutLabel: Story = {
  args: {
    name: "country",
    placeholder: "Выберите страну",
    options: countryOptions,
  },
};

// Мультиселект (для демонстрации)
export const MultiSelect: Story = {
  render: () => {
    const skillOptions: PromSelectOption[] = [
      { value: "react", label: "React" },
      { value: "typescript", label: "TypeScript" },
      { value: "node", label: "Node.js" },
      { value: "graphql", label: "GraphQL" },
    ];

    const methods = useForm({ defaultValues: { skills: [] } });
    return (
      <FormProvider {...methods}>
        <div className="w-[400px]">
          <PromFieldMultiSelect
            name="skills"
            label="Навыки"
            options={skillOptions}
          />
        </div>
      </FormProvider>
    );
  },
};
