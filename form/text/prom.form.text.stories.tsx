import { Meta, StoryObj } from "@storybook/react-vite";
import { FormProvider, useForm } from "react-hook-form";
import { PromFieldInput, PromFieldTextArea } from "./prom.form.text";

const FormWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

const meta: Meta<typeof PromFieldInput> = {
  title: "Shared/Form/PromFieldInput",
  component: PromFieldInput,
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
    type: {
      control: "select",
      options: ["text", "email", "tel", "password"],
      description: "Тип поля",
    },
    className: {
      control: "text",
      description: "Дополнительные CSS классы",
    },
    info: {
      control: "object",
      description: "Подсказка (компонент CommonInfo)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof PromFieldInput>;

// Базовый пример
export const Default: Story = {
  args: {
    name: "username",
    label: "Имя пользователя",
    placeholder: "Введите имя пользователя",
    type: "text",
  },
};

// С подсказкой
export const WithInfo: Story = {
  args: {
    name: "okpd",
    label: "Код ОКПД",
    placeholder: "Введите код ОКПД",
    info: {
      title: "Что такое ОКПД?",
      description:
        "Общероссийский классификатор продукции по видам экономической деятельности",
    },
  },
};

// Поле для телефона
export const PhoneInput: Story = {
  args: {
    name: "phone",
    label: "Номер телефона",
    placeholder: "+7 999 999 99 99",
    type: "tel",
    info: {
      title: "Формат номера",
      description:
        "Введите номер в международном формате. Автоматически добавится +7",
    },
  },
};

// Поле для email
export const EmailInput: Story = {
  args: {
    name: "email",
    label: "Email",
    placeholder: "example@mail.ru",
    type: "email",
  },
};

// Пароль
export const PasswordInput: Story = {
  args: {
    name: "password",
    label: "Пароль",
    placeholder: "Введите пароль",
    type: "password",
    info: {
      title: "Требования к паролю",
      description:
        "Пароль должен содержать минимум 8 символов, включая заглавные и строчные буквы, цифры и спецсимволы.",
    },
  },
};

// С кастомным классом
export const CustomStyle: Story = {
  args: {
    name: "custom",
    label: "Кастомное поле",
    placeholder: "С кастомным стилем",
    className: "border-2 border-blue-500 rounded-lg p-3 w-full bg-blue-50",
  },
};

// Все поля вместе (для демонстрации)
export const AllFields: Story = {
  render: () => {
    const methods = useForm();
    return (
      <FormProvider {...methods}>
        <div className="flex flex-col gap-4 w-[400px]">
          <PromFieldInput
            name="username"
            label="Имя пользователя"
            placeholder="Введите имя"
          />
          <PromFieldInput
            name="email"
            label="Email"
            placeholder="example@mail.ru"
            type="email"
          />
          <PromFieldInput
            name="phone"
            label="Телефон"
            placeholder="+7 999 999 99 99"
            type="tel"
          />
          <PromFieldInput
            name="password"
            label="Пароль"
            placeholder="Введите пароль"
            type="password"
            info={{
              title: "Требования к паролю",
              description: "Минимум 8 символов, буквы и цифры",
            }}
          />
        </div>
      </FormProvider>
    );
  },
};

// С ошибкой (для демонстрации)
export const WithError: Story = {
  render: () => {
    const methods = useForm({
      defaultValues: {
        errorField: "",
      },
    });

    // Имитация ошибки
    const error = { message: "Это поле обязательно для заполнения" };

    return (
      <FormProvider {...methods}>
        <div className="w-[400px] p-4">
          <div className="flex flex-col gap-1">
            <label className="font-medium">Поле с ошибкой</label>
            <div className="relative w-full flex gap-3">
              <input
                className="border-2 border-red-500 rounded-lg p-2 w-full"
                placeholder="Пример поля с ошибкой"
              />
            </div>
            <span className="text-red-500 text-sm">{error.message}</span>
          </div>
        </div>
      </FormProvider>
    );
  },
};

// Текстовая область (для демонстрации)
export const TextArea: Story = {
  render: () => {
    const methods = useForm();
    return (
      <FormProvider {...methods}>
        <div className="w-[400px]">
          <PromFieldTextArea
            name="comment"
            label="Комментарий"
            placeholder="Введите текст..."
            rows={4}
          />
        </div>
      </FormProvider>
    );
  },
};

// Компактный вариант
export const Compact: Story = {
  args: {
    name: "compact",
    label: "Компактное поле",
    placeholder: "Маленькое поле",
    className: "border rounded p-1 w-full text-sm",
  },
};
