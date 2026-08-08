import { Meta, StoryObj } from "@storybook/react-vite";
import { CircleHelpIcon } from "lucide-react";
import { CommonInfo } from "./info";

const meta: Meta<typeof CommonInfo> = {
  title: "UI/CommonInfo",
  component: CommonInfo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof CommonInfo>;

export const Default: Story = {
  args: {
    title: "Что такое ОКПД?",
    description:
      "Общероссийский классификатор продукции по видам экономической деятельности",
  },
};

export const WithCustomIcon: Story = {
  args: {
    title: "Важная информация",
    description: "Это очень важная подсказка",
    action: <CircleHelpIcon className="w-5 h-5 text-blue-500" />,
  },
};
