import { Meta, StoryObj } from "@storybook/react-vite";
import { FormProvider, useForm } from "react-hook-form";
import { PromDateField } from "./prom.form.date";

const FormWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

const meta: Meta<typeof PromDateField> = {
  title: "Shared/Form/PromDateField",
  component: PromDateField,
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
    description: {
      control: "text",
      description: "Подсказка под полем",
    },
    required: {
      control: "boolean",
      description: "Обязательное поле",
    },
  },
};

export default meta;
type Story = StoryObj<typeof PromDateField>;

// Базовый пример
export const Default: Story = {
  args: {
    name: "birthDate",
    label: "Дата рождения",
  },
};

// С подсказкой
export const WithDescription: Story = {
  args: {
    name: "birthDate",
    label: "Дата рождения",
    description: "Выберите день, месяц и год вашего рождения",
  },
};

// Необязательное поле
export const Optional: Story = {
  args: {
    name: "eventDate",
    label: "Дата события",
    required: false,
    description: "Можно оставить пустым",
  },
};
